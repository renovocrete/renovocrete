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
const visited = new Set();
let index = 0;

// The sidebar is a collapsible tree: expanding a group reveals new buttons, so
// re-query after every click until no unvisited button remains.
for (let pass = 0; pass < 80; pass++) {
  const buttons = await page.$$('.nav button');
  let clicked = false;
  for (const button of buttons) {
    if (!(await button.isVisible())) continue;
    const label = (await button.textContent()).trim().replace(/\s+/g, ' ');
    if (visited.has(label)) continue;
    visited.add(label);
    clicked = true;
    const before = problems.length;
    await button.click();
    await page.waitForTimeout(600);
    const title = await page.textContent('#pageTitle').catch(() => '');
    const contentLen = await page.$eval('#content', (e) => e.innerText.trim().length).catch(() => 0);
    const safe = String(index++).padStart(2, '0') + '-' + label.replace(/[^a-z0-9]+/gi, '_').slice(0, 40);
    await page.screenshot({ path: `${outDir}/view-${safe}.png` });
    report.views.push({ label, title, contentLen, newProblems: problems.slice(before) });
    break;
  }
  if (!clicked) break;
}

report.problems = problems;
writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ loadMs, navCount: report.views.length, problemCount: problems.length }, null, 2));
await browser.close();
