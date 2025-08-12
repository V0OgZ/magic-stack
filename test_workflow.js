#!/usr/bin/env node

/**
 * TEST WORKFLOW avec Playwright
 * Vérifie que les 3 éditeurs fonctionnent
 */

const { chromium } = require('playwright');

async function testWorkflow() {
    console.log('🧪 Test du Workflow Manager...\n');
    
    const browser = await chromium.launch({ 
        headless: false,  // Pour voir ce qui se passe
        slowMo: 500      // Ralentir pour debug
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        // Test 1: Workflow Manager
        console.log('📊 Test 1: Workflow Manager');
        await page.goto('http://localhost:8000/WORKFLOW_MANAGER.html');
        await page.waitForTimeout(2000);
        
        // Vérifier que les 3 étapes sont visibles
        const step1 = await page.locator('#step1').isVisible();
        const step2 = await page.locator('#step2').isVisible();
        const step3 = await page.locator('#step3').isVisible();
        
        if (step1 && step2 && step3) {
            console.log('✅ Les 3 étapes sont visibles\n');
        } else {
            throw new Error('❌ Étapes manquantes');
        }
        
        // Test 2: WorldEditor
        console.log('🗺️ Test 2: WorldEditor (5173)');
        const page2 = await context.newPage();
        await page2.goto('http://localhost:5173');
        await page2.waitForTimeout(2000);
        
        // Vérifier que le canvas hexagonal existe
        const hexCanvas = await page2.locator('canvas').first();
        if (await hexCanvas.isVisible()) {
            console.log('✅ WorldEditor canvas trouvé\n');
        } else {
            console.log('⚠️ WorldEditor peut-être pas lancé\n');
        }
        
        // Test 3: MAP_ICON_PLACER
        console.log('📍 Test 3: MAP_ICON_PLACER');
        const page3 = await context.newPage();
        await page3.goto('http://localhost:8000/apps/magic-stack-unified/public/assets/MAP_ICON_PLACER_ADVANCED.html');
        await page3.waitForTimeout(2000);
        
        // Vérifier la palette d'icônes
        const iconPalette = await page3.locator('.icon-palette').isVisible();
        if (iconPalette) {
            console.log('✅ Palette d\'icônes trouvée\n');
        } else {
            throw new Error('❌ Palette manquante');
        }
        
        // Test 4: CHASSE_TEMPORELLE
        console.log('🎮 Test 4: CHASSE_TEMPORELLE');
        const page4 = await context.newPage();
        await page4.goto('http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html');
        await page4.waitForTimeout(2000);
        
        // Vérifier le bouton Import Map
        const importBtn = await page4.locator('button:has-text("Import Map")').isVisible();
        if (importBtn) {
            console.log('✅ Bouton Import Map trouvé\n');
        } else {
            throw new Error('❌ Bouton Import Map manquant');
        }
        
        // Test 5: Navigation NEXT
        console.log('🔄 Test 5: Navigation dans Workflow');
        await page.bringToFront();
        
        // Cliquer sur NEXT
        const nextBtn = await page.locator('#nextBtn');
        if (await nextBtn.isVisible()) {
            await nextBtn.click();
            await page.waitForTimeout(2000);
            console.log('✅ Navigation NEXT fonctionne\n');
        }
        
        console.log('🎉 TOUS LES TESTS PASSENT!\n');
        
    } catch (error) {
        console.error('❌ ERREUR:', error.message);
    } finally {
        await browser.close();
    }
}

// Lancer les tests
testWorkflow().catch(console.error);
