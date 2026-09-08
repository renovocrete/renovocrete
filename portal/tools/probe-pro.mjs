// Walks the professional (non-admin) workspace and exercises the visualizer,
// which is the main consumer of the externalised palette images.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

const url = process.argv[2];
const outDir = process.argv[3];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const page = await context.newPage();
const problems = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${m.type()}] ${m.text()}`);
});
page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`));
page.on('response', (r) => {
  if (r.status() >= 400) problems.push(`[http ${r.status()}] ${r.url()}`);
});

await page.goto(url, { waitUntil: 'load' });
await page.fill('#loginEmail', 'demo@renovocrete.local');
await page.fill('#loginPassword', 'Client2026!');
await page.click('#loginButton');
await page.waitForTimeout(1500);

// The floor visualizer is an opt-in per-client capability; enable it so the
// palette imagery is actually exercised.
await page.evaluate(() => {
  const client = store.accounts.find((a) => a.email === 'demo@renovocrete.local');
  if (client) client.visualizerEnabled = true;
  saveStore();
});
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(1500);

const report = { views: [] };

const expandGroups = () =>
  page.evaluate(() => {
    document.querySelectorAll('.nav button:not([data-view])').forEach((b) => b.click());
  });

await expandGroups();
await page.waitForTimeout(400);
const views = await page.$$eval('.nav button[data-view]', (bs) => bs.map((b) => b.dataset.view));

let index = 0;
for (const view of views) {
  const before = problems.length;
  await expandGroups();
  await page.waitForTimeout(150);
  const clicked = await page.evaluate((v) => {
    const b = document.querySelector(`.nav button[data-view="${CSS.escape(v)}"]`);
    if (!b) return false;
    b.click();
    return true;
  }, view);
  if (!clicked) {
    report.views.push({ view, missing: true });
    continue;
  }
  await page.waitForTimeout(650);
  const title = await page.textContent('#pageTitle').catch(() => '');
  const contentLen = await page.$eval('#content', (e) => e.innerText.trim().length).catch(() => 0);
  await page.screenshot({ path: `${outDir}/pro-${String(index++).padStart(2, '0')}-${view}.png` });
  report.views.push({ view, title, contentLen, newProblems: problems.slice(before) });
}

// Visualizer deep check: load the demo photo, pick a palette sample and confirm
// the canvas actually paints (non-blank pixels) after the swatch is applied.
const hasVisualizer = await page.evaluate(() => {
  const b = document.querySelector('.nav button[data-view="visualizer"]');
  if (!b) return false;
  b.click();
  return true;
});
if (hasVisualizer) {
  await page.waitForTimeout(1200);
  const swatches = await page.$$('[data-visual-sample]');
  report.visualizer = { swatches: swatches.length };
  const brokenSwatches = await page.$$eval('[data-visual-sample] img', (imgs) =>
    imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
  ).catch(() => []);
  report.visualizer.brokenSwatchImages = brokenSwatches;
  const demo = await page.evaluate(() => {
    const b = document.querySelector('#loadDemoFloor');
    if (!b) return false;
    b.click();
    return true;
  });
  if (demo) {
    await page.waitForTimeout(2500);
    report.visualizer.swatchClicked = await page.evaluate(() => {
      const b = document.querySelectorAll('[data-visual-sample]')[3];
      if (!b) return false;
      b.click();
      return true;
    });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${outDir}/visualizer.png` });
    report.visualizer.canvasInk = await page
      .$eval('#floorCanvas', (c) => {
        const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4000) if (d[i] > 0) n++;
        return { width: c.width, height: c.height, sampledOpaquePixels: n };
      })
      .catch((e) => String(e));
  }
}

// Every <img> that ever rendered must have decoded: catches broken asset paths
// introduced by externalising the base64 payloads.
report.brokenImages = await page.evaluate(() =>
  [...document.querySelectorAll('img')]
    .filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src'))
    .map((i) => i.getAttribute('src')),
);

report.problems = problems;
writeFileSync(`${outDir}/report-pro.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ views: report.views.length, visualizer: report.visualizer, problemCount: problems.length }, null, 2));
await browser.close();
