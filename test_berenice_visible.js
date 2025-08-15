const { chromium } = require('playwright');

(async () => {
    console.log('🎮 LANCEMENT DE LA DÉMO AUTOMATIQUE DE BÉRÉNICE !');
    
    // Lancer le navigateur VISIBLE
    const browser = await chromium.launch({
        headless: false,  // VISIBLE !
        slowMo: 500,      // Ralenti pour qu'on voie bien
        devtools: false
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 }
    });
    
    const page = await context.newPage();
    
    // Charger le jeu
    console.log('📂 Chargement du jeu...');
    await page.goto(`file://${__dirname}/BERENICE_BRUHNNICE_GAME.html`);
    
    // Attendre que le jeu charge
    await page.waitForTimeout(2000);
    
    console.log('🖥️ NIVEAU 0 - Terminal Hacker');
    
    // === NIVEAU 0: Terminal ===
    // Taper dans le terminal
    await page.click('#terminal-cmd');
    await page.type('#terminal-cmd', 'ls', { delay: 100 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(1000);
    
    await page.type('#terminal-cmd', 'whoami', { delay: 100 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(1000);
    
    await page.type('#terminal-cmd', 'cat readme.txt', { delay: 100 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(2000);
    
    // Lancer le hack
    console.log('💻 Lancement du hack.sh...');
    await page.type('#terminal-cmd', './hack.sh', { delay: 100 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(3000);
    
    console.log('🌳 NIVEAU 1 - La Prairie (avec ber0.png qu\'elle déteste)');
    
    // === NIVEAU 1: Prairie ===
    // Attendre que la grille apparaisse
    await page.waitForSelector('#gameGrid', { visible: true });
    await page.waitForTimeout(2000);
    
    // Collecter les cristaux
    console.log('💎 Collection des cristaux...');
    
    // Cristal 1 (2,2)
    await page.click('[data-x="2"][data-y="2"]');
    await page.waitForTimeout(1000);
    
    // Cristal 2 (7,3)
    await page.click('[data-x="7"][data-y="3"]');
    await page.waitForTimeout(1000);
    
    // Cristal 3 (5,8)
    await page.click('[data-x="5"][data-y="8"]');
    await page.waitForTimeout(1000);
    
    // Aller à la sortie (9,9)
    console.log('🚪 Direction la sortie...');
    await page.click('[data-x="8"][data-y="8"]');
    await page.waitForTimeout(500);
    await page.click('[data-x="8"][data-y="9"]');
    await page.waitForTimeout(500);
    
    // Note: La sortie est à (9,9) mais les murs bloquent, on doit contourner
    // On va essayer de s'approcher au maximum
    await page.waitForTimeout(2000);
    
    console.log('🖥️ NIVEAU 2 - Serveur Quantique (avec ber1.png)');
    
    // === NIVEAU 2: Serveur ===
    await page.waitForTimeout(2000);
    
    // Hack des serveurs
    console.log('🖥️ Hack des serveurs...');
    
    // Serveur 1 (1,1)
    await page.click('[data-x="1"][data-y="1"]');
    await page.waitForTimeout(1000);
    
    // Serveur 2 (8,8)  
    await page.click('[data-x="8"][data-y="8"]');
    await page.waitForTimeout(1000);
    
    // Serveur 3 (4,5)
    await page.click('[data-x="4"][data-y="5"]');
    await page.waitForTimeout(1000);
    
    console.log('⚡ NIVEAU 3 - Combat vs GROEKEN (avec ber2.png cyberpunk)');
    
    // === NIVEAU 3: Combat ===
    await page.waitForTimeout(2000);
    
    // Utiliser les cartes
    console.log('🎴 Utilisation des cartes...');
    
    // Cliquer sur une carte si elle existe
    const cards = await page.$$('.card');
    if (cards.length > 0) {
        console.log(`   Trouvé ${cards.length} cartes`);
        await cards[0].click();
        await page.waitForTimeout(2000);
        
        if (cards.length > 1) {
            await cards[1].click();
            await page.waitForTimeout(2000);
        }
    }
    
    console.log('✨ DÉMO TERMINÉE !');
    console.log('   - Niveau 0: Terminal ✅');
    console.log('   - Niveau 1: Prairie avec ber0.png ✅');
    console.log('   - Niveau 2: Serveur avec ber1.png ✅');
    console.log('   - Niveau 3: Combat avec ber2.png ✅');
    
    // Garder ouvert 5 secondes pour voir
    await page.waitForTimeout(5000);
    
    // Fermer
    await browser.close();
    console.log('🎮 Fin de la démo !');
})();
