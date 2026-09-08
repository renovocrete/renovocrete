/**
 * Production build for the RENOVO CRETE Professional Portal.
 *
 *   node tools/build.mjs            -> dist/         (hashed, cacheable assets)
 *   node tools/build.mjs --single   -> dist-single/  (one offline HTML file)
 *
 * Scripts stay separate classic scripts in the same document order: the legacy
 * layers declare globals at script scope and monkey-patch each other, so
 * bundling them into one module would change their semantics.
 */
import { build as esbuild } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { basename, dirname, join } from 'node:path';

const single = process.argv.includes('--single');
const srcDir = 'src';
const outDir = single ? 'dist-single' : 'dist';

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const html = readFileSync(join(srcDir, 'index.html'), 'utf8');

async function minify(file) {
  const loader = file.endsWith('.css') ? 'css' : 'js';
  const result = await esbuild({
    entryPoints: [join(srcDir, file)],
    bundle: false,
    minify: true,
    charset: 'utf8',
    legalComments: 'none',
    target: loader === 'css' ? ['chrome100', 'safari15', 'firefox100'] : 'es2020',
    write: false,
    outdir: 'out',
  });
  return result.outputFiles[0].text;
}

const hash = (text) => createHash('sha256').update(text).digest('hex').slice(0, 8);

const assetPattern = /(<link rel="stylesheet" href="([^"]+\.css)">)|(<script src="([^"]+\.js)"><\/script>)/g;
const emitted = [];
let output = '';
let cursor = 0;

for (const match of html.matchAll(assetPattern)) {
  const file = match[2] ?? match[4];
  const isCss = Boolean(match[2]);
  const minified = await minify(file);
  output += html.slice(cursor, match.index);
  cursor = match.index + match[0].length;

  if (single) {
    output += isCss ? `<style>${minified}</style>` : `<script>${minified.replace(/<\/script>/gi, '<\\/script>')}</script>`;
    continue;
  }

  // config.js is meant to be edited on the server after deployment, so it must
  // not be fingerprinted or long-cached.
  const ext = isCss ? '.css' : '.js';
  const path =
    file === 'config.js'
      ? 'config.js'
      : join(dirname(file), `${basename(file, ext)}.${hash(minified)}${ext}`);
  mkdirSync(join(outDir, dirname(path)), { recursive: true });
  writeFileSync(join(outDir, path), minified);
  emitted.push(path);
  output += isCss ? `<link rel="stylesheet" href="${path}">` : `<script src="${path}"></script>`;
}
output += html.slice(cursor);

/* ------------------------------------------------------------------ */

const imageRefs = [...output.matchAll(/assets\/(?:img|icons)\/[A-Za-z0-9._-]+/g)].map((m) => m[0]);

if (single) {
  // Re-embed every referenced image so the result is a single portable file.
  const mimes = { png: 'image/png', jpg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml' };
  for (const ref of new Set(imageRefs)) {
    const file = join(srcDir, ref);
    if (!existsSync(file)) continue;
    const ext = ref.split('.').pop().toLowerCase();
    const uri = `data:${mimes[ext] ?? 'application/octet-stream'};base64,${readFileSync(file).toString('base64')}`;
    output = output.split(ref).join(uri);
  }
  // A single-file build cannot register a service worker or load a manifest.
  output = output
    .replace(/<link rel="manifest"[^>]*>/g, '')
    .replace(/<link rel="(?:apple-touch-)?icon"[^>]*>/g, '');
  writeFileSync(join(outDir, 'index.html'), output);
  const bytes = Buffer.byteLength(output);
  console.log(JSON.stringify({ mode: 'single', file: join(outDir, 'index.html'), bytes, gzipBytes: gzipSync(output).length }, null, 2));
} else {
  cpSync(join(srcDir, 'assets'), join(outDir, 'assets'), { recursive: true });
  cpSync(join(srcDir, 'manifest.webmanifest'), join(outDir, 'manifest.webmanifest'));

  writeFileSync(join(outDir, 'index.html'), output);
  emitted.unshift('index.html');

  // Precache the shell (HTML, CSS, JS, manifest, icons). The ~240 colour
  // swatches are left to runtime caching so the install stays small.
  const precache = [
    ...emitted,
    'manifest.webmanifest',
    ...[...new Set(imageRefs)].filter((r) => r.startsWith('assets/icons/')),
  ];
  const version = hash(precache.map((p) => `${p}:${statSync(join(outDir, p)).size}`).join('|'));
  const sw = readFileSync(join(srcDir, 'sw.js'), 'utf8')
    .replace("const CACHE_VERSION = 'dev';", `const CACHE_VERSION = ${JSON.stringify(version)};`)
    .replace('const PRECACHE = [];', `const PRECACHE = ${JSON.stringify(precache)};`);
  writeFileSync(join(outDir, 'sw.js'), sw);

  const report = { mode: 'multi', files: emitted.length, precached: precache.length, swVersion: version, shell: {} };
  let shellBytes = 0;
  let shellGzip = 0;
  for (const path of precache) {
    const buffer = readFileSync(join(outDir, path));
    shellBytes += buffer.length;
    shellGzip += gzipSync(buffer).length;
  }
  report.shell = { bytes: shellBytes, gzipBytes: shellGzip };
  report.legacyBytes = statSync('legacy/RENOVO_CRETE_V29_LAUNCH_READY.html').size;
  console.log(JSON.stringify(report, null, 2));
}
