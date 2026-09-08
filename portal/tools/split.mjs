/**
 * One-shot extraction of the legacy single-file portal into a maintainable
 * source tree. Kept in the repository so the split can be re-derived (and
 * audited) from the original ChatGPT export at any time.
 *
 *   node tools/split.mjs legacy/RENOVO_CRETE_V29_LAUNCH_READY.html src
 *
 * The transformation is intentionally behaviour-preserving:
 *   - <style> blocks become stylesheets, in the same document order
 *   - inline <script> blocks become classic external scripts, same order,
 *     so parse-time execution semantics are unchanged
 *   - base64 image payloads become real files referenced by document-relative
 *     paths, which every consumer (img.src, CSS url(), canvas) treats the same
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const [, , inputPath, outDir] = process.argv;
if (!inputPath || !outDir) {
  console.error('usage: node tools/split.mjs <legacy.html> <outDir>');
  process.exit(1);
}

const MIN_EXTERNALISED_BLOB = 2048;
const EXT_BY_MIME = {
  png: 'png',
  jpeg: 'jpg',
  jpg: 'jpg',
  gif: 'gif',
  webp: 'webp',
  'svg+xml': 'svg',
};

const source = readFileSync(inputPath, 'utf8');

/* ------------------------------------------------------------------ *
 * 1. Split the document into markup / <style> / <script> segments.
 *    A linear scan is required rather than a global regex: script bodies
 *    contain `<script>` fragments inside template literals for print
 *    windows, and those must not be treated as real tags.
 * ------------------------------------------------------------------ */
function segment(html) {
  const openTag = /<(script|style)\b([^>]*)>/gi;
  const segments = [];
  let cursor = 0;
  for (;;) {
    openTag.lastIndex = cursor;
    const match = openTag.exec(html);
    if (!match) break;
    const tag = match[1].toLowerCase();
    const closeToken = `</${tag}>`;
    const closeAt = html.toLowerCase().indexOf(closeToken, match.index + match[0].length);
    if (closeAt === -1) throw new Error(`unterminated <${tag}> at offset ${match.index}`);
    if (match.index > cursor) segments.push({ kind: 'markup', text: html.slice(cursor, match.index) });
    segments.push({
      kind: tag,
      attrs: match[2].trim(),
      body: html.slice(match.index + match[0].length, closeAt),
    });
    cursor = closeAt + closeToken.length;
  }
  segments.push({ kind: 'markup', text: html.slice(cursor) });
  return segments;
}

const segments = segment(source);

/* ------------------------------------------------------------------ *
 * 2. Extract base64 image payloads to real files.
 * ------------------------------------------------------------------ */
const blobPattern = /data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;
const assetsByHash = new Map();
const usedNames = new Set();

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

/** Recover a human-readable name from the `id`/`name` field preceding a blob. */
function nameFromContext(text, blobStart) {
  const window = text.slice(Math.max(0, blobStart - 400), blobStart);
  const matches = [...window.matchAll(/["']?(?:id|name)["']?\s*:\s*["']([^"']{1,60})["']/g)];
  const last = matches[matches.length - 1];
  return last ? slugify(last[1]) : '';
}

function externaliseBlobs(text, hrefPrefix) {
  return text.replace(blobPattern, (whole, mime, payload, offset) => {
    if (whole.length < MIN_EXTERNALISED_BLOB) return whole;
    const hash = createHash('sha1').update(payload).digest('hex');
    let asset = assetsByHash.get(hash);
    if (!asset) {
      const ext = EXT_BY_MIME[mime.toLowerCase()] ?? 'bin';
      const base = nameFromContext(text, offset) || `image-${hash.slice(0, 8)}`;
      let name = `${base}.${ext}`;
      let n = 2;
      while (usedNames.has(name)) name = `${base}-${n++}.${ext}`;
      usedNames.add(name);
      asset = { name, ext, buffer: Buffer.from(payload, 'base64') };
      assetsByHash.set(hash, asset);
    }
    return `${hrefPrefix}${asset.name}`;
  });
}

/* ------------------------------------------------------------------ *
 * 3. Emit the source tree.
 * ------------------------------------------------------------------ */
rmSync(join(outDir, 'styles'), { recursive: true, force: true });
rmSync(join(outDir, 'scripts'), { recursive: true, force: true });
rmSync(join(outDir, 'assets/img'), { recursive: true, force: true });
for (const dir of ['styles', 'scripts', 'assets/img']) mkdirSync(join(outDir, dir), { recursive: true });

function fileNameFor(kind, attrs, index) {
  const id = /id\s*=\s*"([^"]+)"/.exec(attrs)?.[1] ?? '';
  const base = slugify(id.replace(/^renovo-/, '')) || `block-${String(index).padStart(2, '0')}`;
  return `${String(index).padStart(2, '0')}-${base}`;
}

const htmlParts = [];
const manifest = { styles: [], scripts: [] };
let index = 0;

for (const seg of segments) {
  if (seg.kind === 'markup') {
    htmlParts.push(externaliseBlobs(seg.text, 'assets/img/'));
    continue;
  }
  const isStyle = seg.kind === 'style';
  const dir = isStyle ? 'styles' : 'scripts';
  // CSS url() resolves against the stylesheet, JS strings against the document.
  const prefix = isStyle ? '../assets/img/' : 'assets/img/';
  const name = `${fileNameFor(seg.kind, seg.attrs, index++)}.${isStyle ? 'css' : 'js'}`;
  const body = externaliseBlobs(seg.body, prefix).replace(/^\n+|\s+$/g, '') + '\n';
  writeFileSync(join(outDir, dir, name), body);
  manifest[isStyle ? 'styles' : 'scripts'].push(`${dir}/${name}`);
  htmlParts.push(
    isStyle
      ? `<link rel="stylesheet" href="${dir}/${name}">`
      : `<script src="${dir}/${name}"></script>`,
  );
}

for (const asset of assetsByHash.values()) {
  const target = join(outDir, 'assets/img', asset.name);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, asset.buffer);
}

writeFileSync(join(outDir, 'index.html'), htmlParts.join(''));
writeFileSync(join(outDir, 'build-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const assetBytes = [...assetsByHash.values()].reduce((sum, a) => sum + a.buffer.length, 0);
console.log(
  JSON.stringify(
    {
      styles: manifest.styles.length,
      scripts: manifest.scripts.length,
      assets: assetsByHash.size,
      assetBytes,
      htmlBytes: Buffer.byteLength(htmlParts.join('')),
      legacyBytes: Buffer.byteLength(source),
    },
    null,
    2,
  ),
);
