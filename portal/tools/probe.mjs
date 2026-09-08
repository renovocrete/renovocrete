// Ad-hoc exploration harness: loads the portal, signs in, walks every sidebar
// entry and records console/page errors plus screenshots for each view.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

const url = process.argv[2];
const outDir = process.argv[3];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const page = await ctx.newPage();

const problems = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${m.type()}] ${m.text()}`);
});
page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => problems.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));
page.on('response', (r) => {
  if (r.status() >= 400) problems.push(`[http ${r.status()}] ${r.url()}`);
});

const t0 = Date.now();
await page.goto(url, { waitUntil: 'load' });
const loadMs = Date.now() - t0;
await page.waitForTimeout(1500);
await page.screenshot({ path: `${outDir}/00-login.png` });

await page.fill('#loginEmail', 'admin@renovocrete.local');
await page.fill('#loginPassword', 'Renovo2026!');
await page.click('#loginButton');
await page.waitForTimeout(1500);
await page.screenshot({ path: `${outDir}/01-after-login.png` });

const report = { loadMs, views: [] };

// Sidebar entries are keyed on data-view, not on the label: later patch layers
// rename groups a few hundred milliseconds after hydration.
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
  await page.screenshot({ path: `${outDir}/view-${String(index++).padStart(2, '0')}-${view}.png` });
  report.views.push({ view, title, contentLen, newProblems: problems.slice(before) });
}

report.problems = problems;
writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ loadMs, views: report.views.length, problemCount: problems.length }, null, 2));
await browser.close();
