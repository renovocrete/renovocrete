/**
 * Renders the square PWA / favicon set from the brand logo.
 *
 * Chromium is already a dev dependency for the end-to-end tests, so it is used
 * as the rasteriser instead of pulling in a separate image-processing library.
 */
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = process.argv[2] ?? 'src';
const logoPath = join(srcDir, 'assets/img/renovo-crete-logo.png');
const outDir = join(srcDir, 'assets/icons');
mkdirSync(outDir, { recursive: true });

const logo = `data:image/png;base64,${readFileSync(logoPath).toString('base64')}`;
const browser = await chromium.launch();

// Maskable icons need the artwork inside the safe zone (80% of the canvas),
// so the logo is padded rather than cropped.
async function render(size, { background, padding }) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<html><body style="margin:0;width:${size}px;height:${size}px;background:${background};
       display:flex;align-items:center;justify-content:center">
       <img src="${logo}" style="width:${100 - padding * 2}%;height:auto;object-fit:contain">
     </body></html>`,
  );
  const buffer = await page.screenshot({ omitBackground: background === 'transparent' });
  await page.close();
  return buffer;
}

const brand = '#0c1421';
const targets = [
  ['favicon-32.png', 32, { background: brand, padding: 6 }],
  ['favicon-192.png', 192, { background: brand, padding: 8 }],
  ['icon-192.png', 192, { background: brand, padding: 8 }],
  ['icon-512.png', 512, { background: brand, padding: 8 }],
  ['icon-maskable-512.png', 512, { background: brand, padding: 20 }],
  ['apple-touch-icon.png', 180, { background: brand, padding: 10 }],
];

for (const [name, size, options] of targets) {
  writeFileSync(join(outDir, name), await render(size, options));
  console.log('wrote', join(outDir, name), size);
}

// Stand-in used wherever a system or product photograph has not been supplied,
// so the catalogue renders a branded tile instead of a broken image.
const placeholder = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await placeholder.setContent(
  `<html><body style="margin:0;width:1200px;height:800px;
     background:linear-gradient(135deg,#07101b,#1c347b);
     display:flex;flex-direction:column;align-items:center;justify-content:center;
     font-family:Inter,system-ui,Arial,sans-serif">
     <img src="${logo}" style="width:46%;opacity:.9">
     <p style="margin:26px 0 0;color:#9fd6f5;font-size:22px;font-weight:800;
       letter-spacing:.18em;text-transform:uppercase">System photography pending</p>
   </body></html>`,
);
// JPEG, because a full-bleed gradient encodes to roughly a tenth of the PNG
// size and this file is inlined into the single-file offline build.
writeFileSync(
  join(srcDir, 'assets/img/system-placeholder.jpg'),
  await placeholder.screenshot({ type: 'jpeg', quality: 82 }),
);
console.log('wrote', join(srcDir, 'assets/img/system-placeholder.jpg'));
await placeholder.close();

await browser.close();
