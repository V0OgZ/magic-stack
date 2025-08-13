import { test, expect } from @playwright/test;

const urls = [
  https://heroesoftime.online/FRONTPAGE/index_en.html,
  https://heroesoftime.online/HTML_INDEX.html,
  https://heroesoftime.online/MEGA_EDITOR.html
];

for (const url of urls) {
  test(`page loads: ${url}`, async ({ page }) => {
    const resp = await page.goto(url, { waitUntil: domcontentloaded, timeout: 25000 });
    console.log(STATUS, url, resp?.status());
    console.log(CTYPE, url, resp?.headers()[content-type] || );
    const body = await page.content();
    console.log(LENGTH, url, body.length);
    await expect(body.length).toBeGreaterThan(200);
  });
}
