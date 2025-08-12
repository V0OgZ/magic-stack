import { test, expect } from '@playwright/test';

const spaPages = [
  'http://localhost:5175/game',
  'http://localhost:5175/unified',
  'http://localhost:5175/start-tcg'
];

for (const url of spaPages) {
  test(`open SPA ${url}`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: `screenshots_${url.replace(/\W+/g, '_')}.png`, fullPage: true });
    const hasBody = await page.locator('body').count();
    expect(hasBody).toBeGreaterThan(0);
  });
}


