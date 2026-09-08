#!/usr/bin/env node
/**
 * Imports a single-file RENOVO CRETE portal export (the HTML produced by the
 * prototyping workflow) into `public/espace-pro/` as a deployable, cache-friendly
 * bundle:
 *
 *   index.html            markup only, links the generated stylesheet/scripts
 *   portal.css            every <style> block, concatenated in source order
 *   js/NN-<layer>.js      one file per <script> block, loaded in source order
 *   assets/img-<hash>.*   images that were inlined as base64 data URIs
 *   sw.js                 service worker (precache list + cache version)
 *
 * Hand-maintained files next to the generated ones are never touched:
 *   portal.config.js, portal.launch.js, manifest.webmanifest, assets/*.png (icons, diagrams)
 *
 * Usage:  node scripts/import-portal.mjs <path/to/export.html> [--out public/espace-pro]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const sourceArg = args.find((a) => !a.startsWith("--"));
const outArg = args.includes("--out") ? args[args.indexOf("--out") + 1] : "public/espace-pro";
if (!sourceArg) {
  console.error("Usage: node scripts/import-portal.mjs <export.html> [--out public/espace-pro]");
  process.exit(2);
}
const sourcePath = path.resolve(sourceArg);
const outDir = path.resolve(repoRoot, outArg);
const jsDir = path.join(outDir, "js");
const assetsDir = path.join(outDir, "assets");

const PORTAL_TITLE = "RENOVO CRETE — Professional Portal";
const HAND_MAINTAINED = ["portal.config.js", "portal.launch.js", "manifest.webmanifest"];

const html = fs.readFileSync(sourcePath, "utf8");
const sourceHash = crypto.createHash("sha256").update(html).digest("hex").slice(0, 12);
const log = (...m) => console.log("[import-portal]", ...m);
log(`source ${path.basename(sourcePath)} (${(html.length / 1024 / 1024).toFixed(2)} MB, sha256 ${sourceHash})`);

for (const f of HAND_MAINTAINED) {
  if (!fs.existsSync(path.join(outDir, f))) {
    console.error(`[import-portal] missing hand-maintained file ${path.join(outArg, f)}; restore it from git before importing.`);
    process.exit(1);
  }
}

// Clean generated files in place (removing the directories would break a running Vite dev server's public-dir watcher).
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(jsDir, { recursive: true });
for (const f of fs.readdirSync(jsDir)) if (/^\d{2}-.*\.js$/.test(f)) fs.unlinkSync(path.join(jsDir, f));
for (const f of fs.readdirSync(assetsDir)) if (/^img-[0-9a-f]{10}\./.test(f)) fs.unlinkSync(path.join(assetsDir, f));

let patched = html;

/* ------------------------------------------------------------------ */
/* 1. Scripts → js/NN-<id>.js (order preserved, one file per block)      */
/* ------------------------------------------------------------------ */
const layers = [];
patched = patched.replace(/<script(\s[^>]*)?>([\s\S]*?)<\/script>\s*/g, (_m, attrs = "", js) => {
  if (/\ssrc=/.test(attrs)) return _m; // keep external scripts untouched
  const idMatch = /id="([^"]+)"/.exec(attrs);
  const rawId = idMatch ? idMatch[1] : layers.length === 0 ? "core" : "inline";
  const slug = rawId.replace(/^renovo-/, "").replace(/-script$/, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  layers.push({ file: `${String(layers.length).padStart(2, "0")}-${slug}.js`, js: js.replace(/^\n+/, "").replace(/\s+$/, "") + "\n" });
  return "";
});

/* ------------------------------------------------------------------ */
/* 2. Styles → portal.css (after scripts: print templates inside JS      */
/*    strings contain <style> markup that must stay in the JavaScript)   */
/* ------------------------------------------------------------------ */
const styleBlocks = [];
patched = patched.replace(/<style([^>]*)>([\s\S]*?)<\/style>\s*/g, (_m, attrs, css) => {
  styleBlocks.push({ attrs: attrs.trim(), css: css.trim() });
  return "";
});
const cssOut = styleBlocks
  .map((b, i) => `/* ===== style block ${String(i + 1).padStart(2, "0")}${b.attrs ? ` (${b.attrs})` : ""} ===== */\n${b.css}\n`)
  .join("\n");
fs.writeFileSync(path.join(outDir, "portal.css"), cssOut);
log(`portal.css: ${styleBlocks.length} style blocks, ${(cssOut.length / 1024).toFixed(0)} KB`);

/*
 * Cross-layer visibility fix. Later layers were written against symbols of earlier
 * layers as if they were global (e.g. `rc25S()`, `window.rc25OpenMdComposer`), but
 * several layers wrap their code in an IIFE, so those symbols never existed at
 * runtime: the calls either threw inside try/catch or were skipped by `typeof`
 * guards, silently disabling the feature. For each IIFE layer, expose the
 * version-prefixed functions/constants that a later layer references.
 */
const isIife = (js) => /^\s*\(function\s*\(\)\s*\{/.test(js) && /\}\)\(\);?\s*$/.test(js);
const symbolRe = /^(?:async\s+)?function\s+((?:rc|RC)\d+\w*)\s*\(|^const\s+((?:rc|RC)\d+\w*)\s*=/gm;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let exposedTotal = 0;
layers.forEach((layer, i) => {
  if (!isIife(layer.js)) return;
  const later = layers.slice(i + 1).map((l) => l.js).join("\n");
  const alreadyExported = new Set([...layer.js.matchAll(/window\.(\w+)\s*=/g)].map((m) => m[1]));
  const expose = [];
  for (const m of layer.js.matchAll(symbolRe)) {
    const name = m[1] || m[2];
    if (alreadyExported.has(name) || expose.includes(name)) continue;
    if (new RegExp(`(?<![\\w$.])${escapeRe(name)}(?![\\w$])`).test(later)) expose.push(name);
  }
  if (!expose.length) return;
  const exportsJs = `\n/* import-portal: symbols of this layer referenced by later layers */\n${expose.map((n) => `try{window.${n}=${n}}catch(e){}`).join("")}\n`;
  layer.js = layer.js.replace(/\}\)\(\);?\s*$/, (end) => exportsJs + end);
  exposedTotal += expose.length;
  log(`${layer.file}: exposed ${expose.join(", ")}`);
});

const scriptFiles = layers.map((l) => l.file);
for (const l of layers) fs.writeFileSync(path.join(jsDir, l.file), l.js);
log(`js/: ${scriptFiles.length} script layers, ${exposedTotal} cross-layer symbols exposed`);

/* ------------------------------------------------------------------ */
/* 3. Inline base64 images in markup → assets/                          */
/* ------------------------------------------------------------------ */
const extFor = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "image/svg+xml": "svg" };
const extracted = new Map();
patched = patched.replace(/data:(image\/[a-z+]+);base64,([A-Za-z0-9+/=]{64,})/g, (_m, mime, b64) => {
  const buf = Buffer.from(b64, "base64");
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10);
  const file = `img-${hash}.${extFor[mime] || "bin"}`;
  if (!extracted.has(file)) {
    fs.writeFileSync(path.join(assetsDir, file), buf);
    extracted.set(file, buf.length);
  }
  return `assets/${file}`;
});
log(`assets/: ${extracted.size} images extracted from markup`);

/* ------------------------------------------------------------------ */
/* 4. Head / body rewrites                                              */
/* ------------------------------------------------------------------ */
const mustReplace = (input, re, replacement, what) => {
  if (!re.test(input)) throw new Error(`[import-portal] expected to find ${what} in the export`);
  return input.replace(re, replacement);
};
patched = patched.replace(/<!--[\s\S]*?-->\s*/g, ""); // version markers left between the extracted layers
patched = mustReplace(patched, /<link rel="manifest" href="data:[^"]*">\s*/, "", "the inline data: manifest");
patched = mustReplace(patched, /<title>[^<]*<\/title>/, `<title>${PORTAL_TITLE}</title>`, "the <title>");

const headExtras = [
  `<!-- Generated by scripts/import-portal.mjs from ${path.basename(sourcePath)} (sha256 ${sourceHash}). Do not edit by hand: re-run the importer. -->`,
  `<meta name="robots" content="noindex, nofollow">`,
  `<meta name="description" content="RENOVO CRETE professional portal: system calculations, product orders, tracking and visualization for professionals and administrators.">`,
  `<link rel="manifest" href="manifest.webmanifest">`,
  `<link rel="icon" type="image/png" sizes="192x192" href="assets/icon-192.png">`,
  `<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">`,
  `<link rel="stylesheet" href="portal.css">`,
  `<script src="portal.config.js"></script>`,
].join("\n");
patched = mustReplace(patched, /<\/head>/, `${headExtras}\n</head>`, "</head>");

const bodyScripts = [...scriptFiles.map((f) => `<script src="js/${f}"></script>`), `<script src="portal.launch.js"></script>`].join("\n");
patched = mustReplace(patched, /<\/body>/, `${bodyScripts}\n</body>`, "</body>");

patched = patched.replace(/\n{3,}/g, "\n\n");
fs.writeFileSync(path.join(outDir, "index.html"), patched);
log(`index.html: ${(patched.length / 1024).toFixed(0)} KB`);

/* ------------------------------------------------------------------ */
/* 5. Service worker with precache list + content-derived cache version */
/* ------------------------------------------------------------------ */
const precache = [
  "./index.html",
  "./portal.css",
  "./portal.config.js",
  "./portal.launch.js",
  "./manifest.webmanifest",
  ...scriptFiles.map((f) => `./js/${f}`),
  ...[...extracted.keys()].map((f) => `./assets/${f}`),
  ...fs.readdirSync(assetsDir).filter((f) => !/^img-/.test(f)).map((f) => `./assets/${f}`),
].sort();
const versionHash = crypto
  .createHash("sha1")
  .update(precache.map((f) => f + ":" + fs.readFileSync(path.join(outDir, f)).length).join("|") + sourceHash)
  .digest("hex")
  .slice(0, 10);

const sw = `/* Generated by scripts/import-portal.mjs — cache version ${versionHash}. */
const CACHE = "renovo-portal-${versionHash}";
const PRECACHE = ${JSON.stringify(precache, null, 2)};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => undefined)))).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("renovo-portal-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Network first (always fresh when online), cache fallback so the portal keeps
// opening offline. Only same-origin GET requests inside the portal scope are handled.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => undefined);
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined)))
      .then((res) => res || Response.error())
  );
});
`;
fs.writeFileSync(path.join(outDir, "sw.js"), sw);
log(`sw.js: ${precache.length} precached files, cache renovo-portal-${versionHash}`);

const total = fs
  .readdirSync(outDir, { recursive: true })
  .map((f) => path.join(outDir, f))
  .filter((f) => fs.statSync(f).isFile())
  .reduce((n, f) => n + fs.statSync(f).size, 0);
log(`done — ${(total / 1024 / 1024).toFixed(2)} MB in ${outArg}`);
