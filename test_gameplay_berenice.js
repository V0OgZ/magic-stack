// 🎮 GAMEPLAY TEST - BERENICE LEVEL 1
// Test automatisé du gameplay : cristaux, combat, porte

const { chromium } = require('playwright');

async function testBereniceGameplay() {
    console.log('🎮 DÉMARRAGE TEST GAMEPLAY BERENICE LEVEL 1');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    
    const context = await browser.newContext({
        viewport: { width: 1200, height: 800 }
    });
    
    const page = await context.newPage();
    
    try {
        // Navigate to Level 1
        console.log('📍 Navigation vers Level 1...');
        await page.goto('http://localhost:8888/FRONTPAGE/berenice.html?level=1');
        await page.waitForTimeout(3000);
        
        // Vérifier qu'on est bien sur Berenice
        const title = await page.title();
        console.log(`📄 Title: ${title}`);
        
        if (!title.includes('BruhNice')) {
            throw new Error('❌ Pas sur la bonne page Berenice');
        }
        
        console.log('✅ Page Berenice chargée');
        
        // Attendre que le jeu soit initialisé
        await page.waitForTimeout(2000);
        
        // Prendre screenshot initial
        await page.screenshot({ path: 'screenshots_berenice/gameplay_start.png' });
        console.log('📸 Screenshot initial pris');
        
        // Vérifier la présence de la grille de jeu
        const gameGrid = await page.$('#gameGrid');
        if (!gameGrid) {
            throw new Error('❌ Grille de jeu introuvable');
        }
        console.log('✅ Grille de jeu trouvée');
        
        // Vérifier la présence du personnage
        const avatar = await page.$('.player-avatar');
        if (!avatar) {
            throw new Error('❌ Avatar joueur introuvable');
        }
        console.log('✅ Avatar joueur trouvé');
        
        // Vérifier les stats initiales
        const statsText = await page.textContent('#stats');
        console.log(`📊 Stats: ${statsText}`);
        
        // Test de déplacement - cliquer sur une case adjacente
        console.log('🚶 Test de déplacement...');
        await page.click('#gameGrid', { position: { x: 400, y: 300 } });
        await page.waitForTimeout(1000);
        
        // Screenshot après déplacement
        await page.screenshot({ path: 'screenshots_berenice/gameplay_move.png' });
        console.log('📸 Screenshot après déplacement');
        
        // Chercher des cristaux (éléments avec emoji 💎)
        console.log('💎 Recherche de cristaux...');
        
        // Simuler plusieurs clics pour explorer la map
        const positions = [
            { x: 300, y: 200 },
            { x: 500, y: 200 },
            { x: 300, y: 400 },
            { x: 500, y: 400 },
            { x: 400, y: 350 }
        ];
        
        for (let i = 0; i < positions.length; i++) {
            console.log(`🔍 Exploration position ${i + 1}...`);
            await page.click('#gameGrid', { position: positions[i] });
            await page.waitForTimeout(800);
            
            // Vérifier si on a ramassé un cristal
            const newStats = await page.textContent('#stats');
            if (newStats.includes('💎')) {
                console.log('✅ Cristal détecté dans les stats !');
                await page.screenshot({ path: `screenshots_berenice/gameplay_crystal_${i}.png` });
            }
        }
        
        // Vérifier le nombre de cristaux
        const finalStats = await page.textContent('#stats');
        console.log(`📊 Stats finales: ${finalStats}`);
        
        // Chercher la porte de sortie
        console.log('🚪 Recherche de la porte de sortie...');
        
        // Cliquer vers le bas à droite où devrait être la porte
        await page.click('#gameGrid', { position: { x: 550, y: 450 } });
        await page.waitForTimeout(1000);
        
        // Screenshot final
        await page.screenshot({ path: 'screenshots_berenice/gameplay_final.png' });
        
        // Vérifier si on a gagné ou changé de niveau
        const finalUrl = page.url();
        if (finalUrl !== 'http://localhost:8888/FRONTPAGE/berenice.html?level=1') {
            console.log('🎉 NIVEAU TERMINÉ ! Redirection détectée');
            console.log(`🔗 Nouvelle URL: ${finalUrl}`);
        } else {
            console.log('🎮 Toujours en jeu - continuez à explorer');
        }
        
        console.log('\n🎯 TEST GAMEPLAY TERMINÉ !');
        console.log('📁 Screenshots sauvés dans screenshots_berenice/');
        
    } catch (error) {
        console.log(`❌ ERREUR GAMEPLAY: ${error.message}`);
        await page.screenshot({ path: 'screenshots_berenice/gameplay_error.png' });
    }
    
    await browser.close();
}

// Run the gameplay test
testBereniceGameplay().catch(console.error);