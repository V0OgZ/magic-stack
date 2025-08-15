const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Screenshot local
  await page.goto('http://localhost:8000/FRONTPAGE/index.html');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_before_local.png', fullPage: true });
  
  console.log('Screenshots saved: screenshot_before_local.png');
  
  await browser.close();
})();
