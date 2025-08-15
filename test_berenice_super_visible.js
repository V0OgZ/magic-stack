const { chromium } = require('playwright');

// Fonction pour afficher un message flottant sur la page
async function showMessage(page, text) {
    await page.evaluate((msg) => {
        const div = document.createElement('div');
        div.textContent = msg;
        div.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #0ff, #f0f);
            color: black;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            z-index: 10000;
            animation: pulse 1s infinite;
            box-shadow: 0 0 20px rgba(0,255,255,0.5);
        `;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }, text);
}

// Fonction pour surligner un élément
async function highlight(page, selector) {
    await page.evaluate((sel) => {
        const elem = document.querySelector(sel);
        if (elem) {
            elem.style.boxShadow = '0 0 20px 5px #0ff';
            elem.style.transform = 'scale(1.1)';
            setTimeout(() => {
                elem.style.boxShadow = '';
                elem.style.transform = '';
            }, 1000);
        }
    }, selector);
}

(async () => {
    console.log('');
    console.log('🎮 ====== DÉMO AUTOMATIQUE BÉRÉNICE ======');
    console.log('🎮        AVEC EFFETS VISUELS !');
    console.log('🎮 =========================================');
    console.log('');
    
    // Lancer le navigateur VISIBLE avec config cool
    const browser = await chromium.launch({
        headless: false,  // VISIBLE !
        slowMo: 300,      // Ralenti pour bien voir
        args: ['--window-size=1400,900']
    });
    
    const context = await browser.newContext({
        viewport: { width: 1400, height: 900 }
    });
    
    const page = await context.newPage();
    
    // Charger le jeu
    console.log('📂 Chargement du jeu Bérénice...');
    await page.goto(`file://${__dirname}/BERENICE_BRUHNNICE_GAME.html`);
    await page.waitForTimeout(1500);
    
    // Ajouter du CSS pour les animations
    await page.addStyleTag({
        content: `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .demo-cursor {
                width: 30px;
                height: 30px;
                border: 3px solid #0ff;
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                animation: pulse 1s infinite;
            }
        `
    });
    
    // === NIVEAU 0: TERMINAL HACKER ===
    console.log('');
    console.log('🖥️  === NIVEAU 0: TERMINAL HACKER ===');
    console.log('    Bérénice commence son infiltration...');
    
    await showMessage(page, "🖥️ NIVEAU 0: Terminal Hacker");
    await page.waitForTimeout(1000);
    
    // Cliquer sur le terminal
    await highlight(page, '#terminal-cmd');
    await page.click('#terminal-cmd');
    
    // Commande ls
    console.log('    > Commande: ls');
    await page.type('#terminal-cmd', 'ls', { delay: 150 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(1500);
    
    // Commande whoami
    console.log('    > Commande: whoami');
    await page.type('#terminal-cmd', 'whoami', { delay: 150 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(1500);
    
    // Commande cat readme.txt
    console.log('    > Commande: cat readme.txt');
    await page.type('#terminal-cmd', 'cat readme.txt', { delay: 100 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(2500);
    
    // Hack final
    console.log('    💀 LANCEMENT DU HACK!');
    await showMessage(page, "⚡ HACK EN COURS...");
    await page.type('#terminal-cmd', './hack.sh', { delay: 150 });
    await page.press('#terminal-cmd', 'Enter');
    await page.waitForTimeout(3000);
    
    // === NIVEAU 1: PRAIRIE MAGIQUE ===
    console.log('');
    console.log('🌳  === NIVEAU 1: PRAIRIE MAGIQUE ===');
    console.log('    Avatar: ber0.png (qu\'elle DÉTESTE!)');
    
    await showMessage(page, "🌳 NIVEAU 1: Prairie - Avatar Cartoon");
    await page.waitForSelector('#gameGrid', { visible: true });
    await page.waitForTimeout(2000);
    
    // Montrer l'avatar
    await highlight(page, '#playerAvatar');
    await page.waitForTimeout(1000);
    
    console.log('    💎 Collection des 3 cristaux...');
    
    // Cristal 1
    console.log('      → Cristal 1/3');
    await showMessage(page, "💎 Cristal 1/3");
    await page.click('[data-x="2"][data-y="2"]');
    await page.waitForTimeout(1500);
    
    // Cristal 2
    console.log('      → Cristal 2/3');
    await showMessage(page, "💎 Cristal 2/3");
    await page.click('[data-x="7"][data-y="3"]');
    await page.waitForTimeout(1500);
    
    // Cristal 3
    console.log('      → Cristal 3/3');
    await showMessage(page, "💎 Cristal 3/3");
    await page.click('[data-x="5"][data-y="8"]');
    await page.waitForTimeout(1500);
    
    // Sortie
    console.log('    🚪 Direction la sortie...');
    await showMessage(page, "🚪 Vers le niveau 2!");
    await page.click('[data-x="8"][data-y="8"]');
    await page.waitForTimeout(3000);
    
    // === NIVEAU 2: SERVEUR QUANTIQUE ===
    console.log('');
    console.log('🖥️  === NIVEAU 2: SERVEUR QUANTIQUE ===');
    console.log('    Avatar: ber1.png (Mode Hacker!)');
    
    await showMessage(page, "🖥️ NIVEAU 2: Serveur - Avatar Hacker");
    await page.waitForTimeout(2000);
    
    // Montrer le nouvel avatar
    await highlight(page, '#playerAvatar');
    await page.waitForTimeout(1000);
    
    console.log('    🔧 Hack des 3 serveurs...');
    
    // Serveur 1
    console.log('      → Serveur 1/3');
    await showMessage(page, "🖥️ Hack serveur 1/3");
    await page.click('[data-x="1"][data-y="1"]');
    await page.waitForTimeout(1500);
    
    // Serveur 2
    console.log('      → Serveur 2/3');
    await showMessage(page, "🖥️ Hack serveur 2/3");
    await page.click('[data-x="8"][data-y="8"]');
    await page.waitForTimeout(1500);
    
    // Serveur 3
    console.log('      → Serveur 3/3');
    await showMessage(page, "🖥️ Hack serveur 3/3");
    await page.click('[data-x="4"][data-y="5"]');
    await page.waitForTimeout(2000);
    
    // === NIVEAU 3: COMBAT FINAL ===
    console.log('');
    console.log('⚡  === NIVEAU 3: COMBAT vs GROEKEN ===');
    console.log('    Avatar: ber2.png (Mode Cyberpunk!)');
    
    await showMessage(page, "⚡ NIVEAU 3: Boss - Avatar Cyberpunk");
    await page.waitForTimeout(2000);
    
    // Montrer l'avatar final
    await highlight(page, '#playerAvatar');
    await page.waitForTimeout(1000);
    
    console.log('    🎴 Utilisation des cartes magiques...');
    
    // Utiliser les cartes
    const cards = await page.$$('.card');
    if (cards.length > 0) {
        for (let i = 0; i < Math.min(3, cards.length); i++) {
            console.log(`      → Carte ${i+1}: Attaque!`);
            await showMessage(page, `🎴 Carte magique ${i+1}!`);
            await cards[i].click();
            await page.waitForTimeout(2000);
        }
    }
    
    // Message final
    await showMessage(page, "🎉 VICTOIRE! GG EZ!");
    
    console.log('');
    console.log('✨ ====== DÉMO TERMINÉE! ======');
    console.log('');
    console.log('📊 RÉSUMÉ:');
    console.log('   ✅ Niveau 0: Terminal hacké');
    console.log('   ✅ Niveau 1: Prairie avec ber0.png');
    console.log('   ✅ Niveau 2: Serveur avec ber1.png');
    console.log('   ✅ Niveau 3: Combat avec ber2.png');
    console.log('');
    console.log('🎮 Les 3 avatars ont bien évolué!');
    console.log('');
    
    // Garder ouvert pour admirer
    await page.waitForTimeout(5000);
    
    // Message de fin
    await page.evaluate(() => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h1>🎮 DÉMO TERMINÉE!</h1>
            <p>Bérénice a traversé tous les niveaux!</p>
            <p>ber0 → ber1 → ber2</p>
            <p style="color: #0ff;">GG EZ NOOB!</p>
        `;
        div.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #000, #111);
            border: 2px solid #0ff;
            color: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            font-family: monospace;
            box-shadow: 0 0 50px rgba(0,255,255,0.5);
        `;
        document.body.appendChild(div);
    });
    
    await page.waitForTimeout(3000);
    
    // Fermer
    await browser.close();
    console.log('🎮 Navigateur fermé. À bientôt!');
})();
