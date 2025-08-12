import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/HTML_INDEX.html',
  '/FRONTPAGE/index.html',
  '/html/spinforest/heroes-visualizer.html',
  '/html/spinforest/COMBAT_VISUAL_GALLERY.html',
  '/html/spinforest/TILES/tiles-viewer.html'
];

for (const path of pages) {
  test(`open ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: `screenshots${path.replace(/\W+/g, '_')}.png`, fullPage: true });
    const status = await page.evaluate(() => document.readyState);
    expect(status).toBeDefined();
  });
}


