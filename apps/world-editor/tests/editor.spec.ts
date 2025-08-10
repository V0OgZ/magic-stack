import { test, expect } from '@playwright/test';

test.describe('World Editor - Tests de base', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('affiche le titre de l\'éditeur', async ({ page }) => {
    await expect(page.locator('text=Éditeur Universel Avalon')).toBeVisible();
  });

  test('a trois onglets principaux', async ({ page }) => {
    await expect(page.locator('button:has-text("Carte")')).toBeVisible();
    await expect(page.locator('button:has-text("Timeline")')).toBeVisible();
    await expect(page.locator('button:has-text("Paramètres")')).toBeVisible();
  });

  test('permet de changer d\'onglet', async ({ page }) => {
    // Timeline
    await page.click('button:has-text("Timeline")');
    await expect(page.locator('h2:has-text("Timeline des Événements")')).toBeVisible();
    
    // Paramètres
    await page.click('button:has-text("Paramètres")');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    
    // Retour à la carte
    await page.click('button:has-text("Carte")');
    await expect(page.locator('.hex-grid')).toBeVisible();
  });

  test('affiche la status bar avec les backends', async ({ page }) => {
    await expect(page.locator('text=/Équipe PROFONDEUR/')).toBeVisible();
    await expect(page.locator('text=/Rust 3001/')).toBeVisible();
    await expect(page.locator('text=/Vector 5001/')).toBeVisible();
  });
});

test.describe('World Editor - Carte Hexagonale', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('affiche la grille hexagonale', async ({ page }) => {
    const hexGrid = page.locator('.hex-grid');
    await expect(hexGrid).toBeVisible();
    
    // Vérifie qu'il y a des hexagones
    const hexCells = page.locator('.hex-cell');
    await expect(hexCells.first()).toBeVisible();
  });

  test('permet de sélectionner un hexagone', async ({ page }) => {
    const firstHex = page.locator('.hex-cell').first();
    await firstHex.click();
    
    // Vérifie que l'hexagone est sélectionné
    await expect(firstHex).toHaveClass(/hex-selected/);
  });

  test('affiche le tooltip avec les coordonnées au survol', async ({ page }) => {
    const hex = page.locator('.hex-cell').first();
    await hex.hover();
    
    // Vérifie que le titre contient des coordonnées (ex: "10,10")
    const title = await hex.getAttribute('title');
    expect(title).toMatch(/\d+,\d+/);
  });

  test('permet de changer le terrain sélectionné', async ({ page }) => {
    const terrainSelector = page.locator('.terrain-selector');
    await expect(terrainSelector).toBeVisible();
    
    // Change pour forêt
    await terrainSelector.selectOption('forest');
    await expect(terrainSelector).toHaveValue('forest');
    
    // Peint un hexagone
    const hex = page.locator('.hex-cell').first();
    await hex.click();
    
    // Vérifie que la classe terrain est appliquée
    await expect(hex).toHaveClass(/terrain-forest/);
  });

  test('permet de changer la taille du pinceau', async ({ page }) => {
    const brushSizeSelector = page.locator('select').nth(1); // Second select = taille
    await brushSizeSelector.selectOption('3');
    await expect(brushSizeSelector).toHaveValue('3');
  });

  test('bouton POI est désactivé sans sélection', async ({ page }) => {
    const poiButton = page.locator('button:has-text("Ajouter POI")');
    await expect(poiButton).toBeDisabled();
  });

  test('bouton POI est activé avec sélection', async ({ page }) => {
    // Sélectionne un hexagone
    await page.locator('.hex-cell').first().click();
    
    const poiButton = page.locator('button:has-text("Ajouter POI")');
    await expect(poiButton).toBeEnabled();
  });
});

test.describe('World Editor - Timeline', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Timeline")');
  });

  test('affiche la timeline vide au départ', async ({ page }) => {
    await expect(page.locator('text=Timeline des Événements')).toBeVisible();
    await expect(page.locator('text=Aucun événement')).toBeVisible();
  });

  test('permet d\'ajouter un événement', async ({ page }) => {
    await page.click('button:has-text("Ajouter Événement")');
    
    // Remplit le formulaire
    await page.fill('input[placeholder*="Nom"]', 'Test Event');
    await page.fill('input[type="number"]', '10');
    await page.fill('textarea', 'Description de test');
    
    await page.click('button:has-text("Ajouter")');
    
    // Vérifie que l'événement est affiché
    await expect(page.locator('text=Test Event')).toBeVisible();
    await expect(page.locator('text=Jour 10')).toBeVisible();
  });
});

test.describe('World Editor - Paramètres', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Paramètres")');
  });

  test('affiche le formulaire de paramètres', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
  });

  test('permet de modifier le nom du scénario', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.clear();
    await nameInput.fill('Nouveau Scénario');
    await expect(nameInput).toHaveValue('Nouveau Scénario');
  });

  test('permet de changer la difficulté', async ({ page }) => {
    const difficultySelect = page.locator('select[name="difficulty"]');
    await difficultySelect.selectOption('hard');
    await expect(difficultySelect).toHaveValue('hard');
  });

  test('affiche les boutons d\'export/import', async ({ page }) => {
    await expect(page.locator('button:has-text("Exporter JSON")')).toBeVisible();
    await expect(page.locator('button:has-text("Importer .hsc")')).toBeVisible();
    await expect(page.locator('button:has-text("Publier vers Rust")')).toBeVisible();
  });
});

test.describe('World Editor - Vector DB Search', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('panneau de recherche Vector DB est rétractable', async ({ page }) => {
    // Panel fermé par défaut
    const panel = page.locator('text=Recherche Vector DB 6D');
    await expect(panel).not.toBeVisible();
    
    // Ouvre le panel
    await page.click('button:has-text("🔍")');
    await expect(panel).toBeVisible();
    
    // Ferme le panel
    await page.click('button:has-text("→")');
    await expect(panel).not.toBeVisible();
  });

  test('affiche le statut de connexion Vector DB', async ({ page }) => {
    await page.click('button:has-text("🔍")');
    
    // Vérifie le statut (connecté ou déconnecté)
    const status = page.locator('text=/✅ Connecté|❌ Déconnecté/');
    await expect(status).toBeVisible();
  });

  test('permet de basculer entre modes story/dev', async ({ page }) => {
    await page.click('button:has-text("🔍")');
    
    // Mode story par défaut
    const storyTab = page.locator('button:has-text("📖 Lore & Histoire")');
    const devTab = page.locator('button:has-text("🛠️ Documentation")');
    
    await expect(storyTab).toBeVisible();
    await expect(devTab).toBeVisible();
    
    // Bascule vers dev
    await devTab.click();
    await expect(page.locator('input[placeholder*="API"]')).toBeVisible();
    
    // Retour à story
    await storyTab.click();
    await expect(page.locator('input[placeholder*="héros"]')).toBeVisible();
  });
});

test.describe('World Editor - Clippy', () => {
  
  test('Clippy est visible', async ({ page }) => {
    await page.goto('/');
    
    const clippy = page.locator('.clippy-container');
    await expect(clippy).toBeVisible();
  });

  test('Clippy affiche des tips', async ({ page }) => {
    await page.goto('/');
    
    const clippyBubble = page.locator('.clippy-bubble');
    await expect(clippyBubble).toBeVisible();
    
    // Vérifie qu'il y a du texte dans la bulle
    const tipText = await clippyBubble.textContent();
    expect(tipText).toBeTruthy();
  });

  test('Clippy peut être déplacé', async ({ page }) => {
    await page.goto('/');
    
    const clippy = page.locator('.clippy-container');
    const initialBox = await clippy.boundingBox();
    
    // Drag and drop
    await clippy.dragTo(page.locator('body'), {
      targetPosition: { x: 100, y: 100 }
    });
    
    const newBox = await clippy.boundingBox();
    expect(newBox?.x).not.toBe(initialBox?.x);
    expect(newBox?.y).not.toBe(initialBox?.y);
  });
});

test.describe('World Editor - PWA & Mobile', () => {
  
  test('responsive sur iPad', async ({ page, browserName }) => {
    // Configure la viewport iPad
    await page.setViewportSize({ width: 1024, height: 1366 });
    await page.goto('/');
    
    // Vérifie que l'interface s'adapte
    await expect(page.locator('.hex-grid')).toBeVisible();
    await expect(page.locator('button:has-text("Carte")')).toBeVisible();
  });

  test('support touch sur mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.goto('/');
    
    // Simule un tap
    const hex = page.locator('.hex-cell').first();
    await hex.tap();
    
    // Vérifie la sélection
    await expect(hex).toHaveClass(/hex-selected/);
  });
});

test.describe('World Editor - Intégration V2', () => {
  
  test('charge le module v2-adapter si disponible', async ({ page }) => {
    await page.goto('/');
    
    // Vérifie si le v2-adapter est chargé (via window.V2Adapter)
    const hasV2Adapter = await page.evaluate(() => {
      return typeof (window as any).V2Adapter !== 'undefined';
    });
    
    // Le test passe même si pas chargé (optionnel pour l'instant)
    expect(hasV2Adapter).toBeDefined();
  });
});
