/**
 * Static check for the failure mode this codebase is most prone to.
 *
 * Each patch layer is wrapped in its own IIFE, so a helper declared in layer N
 * is invisible to layer N+1 unless it was explicitly assigned to `window`.
 * Calling it anyway throws a ReferenceError — and `foo?.()` does not help,
 * because optional call only guards a declared-but-nullish binding.
 *
 * Exit code 1 when an unresolvable cross-layer reference is found.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'src/scripts';
const files = readdirSync(dir).filter((f) => f.endsWith('.js')).sort();

const stripComments = (code) =>
  code.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:\\])\/\/[^\n]*/g, '$1');

const NAME = '[A-Za-z_$][A-Za-z0-9_$]*';
const globals = new Set();
const declaredInIife = new Map(); // name -> file that hides it

for (const file of files) {
  const code = stripComments(readFileSync(join(dir, file), 'utf8'));
  const isIife = /^\s*\(\s*function\s*\(\s*\)\s*\{/.test(code) || /^\s*\(\s*\(\s*\)\s*=>\s*\{/.test(code);

  for (const m of code.matchAll(new RegExp(`window\\.(${NAME})\\s*=`, 'g'))) globals.add(m[1]);
  for (const m of code.matchAll(/Object\.assign\(\s*window\s*,\s*\{([^}]*)\}/g)) {
    for (const entry of m[1].split(',')) {
      const name = entry.split(':')[0].trim();
      if (name) globals.add(name);
    }
  }

  // Top-level declarations: at column 0 for the flat scripts, or one level of
  // indentation inside an IIFE body.
  const declaration = new RegExp(`^[ \\t]{0,1}(?:function|const|let|var|class)\\s+(${NAME})`, 'gm');
  for (const m of code.matchAll(declaration)) {
    if (isIife) {
      if (!declaredInIife.has(m[1])) declaredInIife.set(m[1], file);
    } else {
      globals.add(m[1]);
    }
  }
}

// Only project helpers are checked; DOM and language built-ins are out of scope.
const isProjectName = (name) => /^(rc|RC)[0-9_]/.test(name);
const problems = [];
const guardedProblems = [];

for (const file of files) {
  const code = stripComments(readFileSync(join(dir, file), 'utf8'));
  const ownDeclarations = new Set(
    [...code.matchAll(new RegExp(`(?:function|const|let|var|class)\\s+(${NAME})`, 'g'))].map((m) => m[1]),
  );
  const lines = code.split('\n');

  lines.forEach((line, i) => {
    // Any bare reference, not just calls: constants such as RC25_NAV_GROUPS
    // throw exactly the same ReferenceError when read across layers.
    for (const m of line.matchAll(new RegExp(`(^|[^.\\w$'"\`])(${NAME})`, 'g'))) {
      const name = m[2];
      if (!isProjectName(name)) continue;
      if (ownDeclarations.has(name) || globals.has(name)) continue;
      if (!declaredInIife.has(name)) continue;
      // `typeof x === 'function'` does not throw, but the feature behind the
      // guard is silently skipped, which is still a defect worth reporting.
      const guarded = new RegExp(`typeof\\s+${name}\\s*[=!]==?\\s*['"]function['"]`).test(line);
      (guarded ? guardedProblems : problems).push({
        file,
        line: i + 1,
        name,
        declaredIn: declaredInIife.get(name),
        snippet: line.trim().slice(0, 120),
      });
    }
  });
}

const allowlist = JSON.parse(readFileSync(new URL('./cross-layer-allowlist.json', import.meta.url), 'utf8')).allow;
const isAllowed = (p) => allowlist.some((a) => a.file === p.file && a.name === p.name);

const allowed = [...problems, ...guardedProblems].filter(isAllowed).length;
const remaining = problems.filter((p) => !isAllowed(p));
const remainingGuarded = guardedProblems.filter((p) => !isAllowed(p));

const describe = (list) => {
  const seen = new Set();
  for (const p of list) {
    const key = `${p.file}:${p.line}:${p.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.error(`  ${p.file}:${p.line}  ${p.name}()  — only declared inside ${p.declaredIn}`);
    console.error(`      ${p.snippet}`);
  }
  return seen.size;
};

if (remainingGuarded.length) {
  console.error('cross-layer check: feature silently skipped by a typeof guard\n');
  describe(remainingGuarded);
  console.error('');
}

if (remaining.length) {
  console.error('cross-layer check: unresolvable reference(s) — these throw at runtime\n');
  describe(remaining);
  process.exit(1);
}

if (remainingGuarded.length) process.exit(1);

console.log(
  `cross-layer check: ${files.length} scripts, no unresolvable references` +
    (allowed ? ` (${allowed} allowlisted)` : ''),
);
