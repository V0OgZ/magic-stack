const { test, expect } = require('@playwright/test');

const urls = [
  'https://heroesoftime.online/',
  'https://heroesoftime.online/FRONTPAGE/index.html',
  'https://heroesoftime.online/FRONTPAGE/index_en.html',
  'https://heroesoftime.online/FRONTPAGE/index_ru.html',
  'https://heroesoftime.online/HTML_INDEX.html',
  'https://heroesoftime.online/API_EXPLORER_COMPLETE.html',
  'https://heroesoftime.online/VECTOR_DB_EXPLORER_UI.html',
  'https://heroesoftime.online/CHASSE_TEMPORELLE_MEGA_MAP.html',
  'https://heroesoftime.online/assets/MAP_ICON_PLACER.html',
  'https://heroesoftime.online/assets/MAP_ICON_PLACER_ADVANCED.html',
  'https://heroesoftime.online/world-editor/'
];

for (const url of urls) {
  test(, async ({ page }) => {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('STATUS', url, resp && resp.status());
    console.log('CTYPE', url, resp && resp.headers()['content-type']);
    const body = await page.content();
    console.log('LENGTH', url, body && body.length);
    await expect(resp && resp.ok()).toBeTruthy();
    await expect(body && body.length).toBeGreaterThan(200);
  });
}
