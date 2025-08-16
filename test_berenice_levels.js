// 📸 PLAYWRIGHT TEST - BERENICE MULTI-LEVEL SCREENSHOTS
// Vincent's automated testing script

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testBereniceLevels() {
    console.log('🎮 DÉMARRAGE TESTS BERENICE MULTI-LEVEL');
    
    // Create screenshots directory
    const screenshotsDir = './screenshots_berenice';
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
    
    const browser = await chromium.launch({ 
        headless: false,  // Vincent veut voir ce qui se passe
        slowMo: 1000     // Ralentir pour debug
    });
    
    const context = await browser.newContext({
        viewport: { width: 1200, height: 800 }
    });
    
    const levels = [
        { level: 1, name: 'Hakir_Game', expected: 'Hakir game (renamed from Berenice)' },
        { level: 2, name: 'Alice_Prime_PWA', expected: 'Alice Prime PWA avec Clippy' },
        { level: 3, name: 'Alice_vs_Vincent', expected: 'Alice vs Vincent Multiplayer' },
        { level: 4, name: 'Alice_Prime_Advanced', expected: 'Alice Prime Advanced PWA' }
    ];
    
    for (const levelInfo of levels) {
        console.log(`\n🔍 TESTING LEVEL ${levelInfo.level}: ${levelInfo.name}`);
        console.log(`   Expected: ${levelInfo.expected}`);
        
        const page = await context.newPage();
        
        try {
            // Navigate to level
            const url = `http://localhost:8888/FRONTPAGE/berenice.html?level=${levelInfo.level}`;
            console.log(`   📍 URL: ${url}`);
            
            await page.goto(url, { waitUntil: 'networkidle' });
            
            // Wait for potential redirects
            await page.waitForTimeout(3000);
            
            // Get final URL after redirects
            const finalUrl = page.url();
            console.log(`   🔗 Final URL: ${finalUrl}`);
            
            // Take screenshot
            const screenshotPath = path.join(screenshotsDir, `level_${levelInfo.level}_${levelInfo.name}.png`);
            await page.screenshot({ 
                path: screenshotPath,
                fullPage: true 
            });
            
            console.log(`   📸 Screenshot: ${screenshotPath}`);
            
            // Basic validation
            const title = await page.title();
            console.log(`   📄 Title: ${title}`);
            
            // Check for specific elements based on level
            let validation = '❓ Unknown';
            
            if (levelInfo.level === 1) {
                // Level 1: Should stay on Hakir (berenice.html)
                if (finalUrl.includes('berenice.html')) {
                    validation = '✅ Correct - Stayed on Hakir game';
                } else {
                    validation = '❌ Error - Should stay on Hakir game';
                }
            } else {
                // Levels 2-4: Should redirect
                if (!finalUrl.includes('berenice.html')) {
                    validation = '✅ Correct - Redirected as expected';
                } else {
                    validation = '❌ Error - Should have redirected';
                }
            }
            
            console.log(`   ${validation}`);
            
        } catch (error) {
            console.log(`   ❌ ERROR: ${error.message}`);
            
            // Take error screenshot
            const errorScreenshotPath = path.join(screenshotsDir, `level_${levelInfo.level}_ERROR.png`);
            try {
                await page.screenshot({ path: errorScreenshotPath });
                console.log(`   📸 Error Screenshot: ${errorScreenshotPath}`);
            } catch (e) {
                console.log(`   Failed to take error screenshot: ${e.message}`);
            }
        }
        
        await page.close();
    }
    
    await browser.close();
    
    console.log('\n🎯 TESTS TERMINÉS !');
    console.log(`📁 Screenshots sauvés dans: ${screenshotsDir}`);
    console.log('\n🔍 VINCENT - Vérifie les screenshots pour validation visuelle !');
}

// Run the tests
testBereniceLevels().catch(console.error);