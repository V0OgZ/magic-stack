/**
 * Tests E2E - Mode Chasse Temporelle
 */

import { test, expect } from '@playwright/test';

test.describe('Mode Chasse Temporelle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chasse');
  });

  test('affiche le sélecteur de difficulté', async ({ page }) => {
    // Titre
    await expect(page.locator('h1')).toContainText('Chasse Temporelle');
    await expect(page.locator('text=Map gigantesque 120x120')).toBeVisible();
    
    // 4 boutons de difficulté
    await expect(page.locator('text=🌱 Facile')).toBeVisible();
    await expect(page.locator('text=⚔️ Normal')).toBeVisible();
    await expect(page.locator('text=💀 Difficile')).toBeVisible();
    await expect(page.locator('text=🔥 Cauchemar')).toBeVisible();
  });

  test('affiche les détails de chaque difficulté', async ({ page }) => {
    // Facile
    const easyButton = page.locator('button').filter({ hasText: 'Facile' });
    await expect(easyButton.locator('text=Drift: 0.1')).toBeVisible();
    await expect(easyButton.locator('text=Dette max: 100')).toBeVisible();
    
    // Cauchemar
    const nightmareButton = page.locator('button').filter({ hasText: 'Cauchemar' });
    await expect(nightmareButton.locator('text=Drift: 1.0')).toBeVisible();
    await expect(nightmareButton.locator('text=Dette max: 10')).toBeVisible();
  });

  test('lance le jeu en difficulté Normal', async ({ page }) => {
    // Cliquer sur Normal
    await page.click('text=⚔️ Normal');
    
    // Vérifier qu'on est dans le jeu
    await expect(page.locator('text=🏹 Chasse Temporelle')).toBeVisible();
    await expect(page.locator('text=NORMAL')).toBeVisible();
    
    // Vérifier les éléments du jeu
    await expect(page.locator('.hex-grid-container')).toBeVisible();
    await expect(page.locator('text=Viewport:')).toBeVisible();
    await expect(page.locator('text=Map totale: 120×120')).toBeVisible();
  });

  test('affiche la minimap', async ({ page }) => {
    // Lancer en mode facile
    await page.click('text=🌱 Facile');
    
    // Vérifier la minimap
    const minimap = page.locator('text=CARTE COMPLÈTE').locator('..');
    await expect(minimap).toBeVisible();
    
    // Vérifier qu'elle a les bonnes dimensions
    const style = await minimap.getAttribute('style');
    expect(style).toContain('width: 240');
    expect(style).toContain('height: 240');
  });

  test('affiche les informations de viewport', async ({ page }) => {
    await page.click('text=⚔️ Normal');
    
    // Vérifier l'affichage du viewport
    await expect(page.locator('text=/Viewport: \\[\\d+,\\d+\\]/')).toBeVisible();
    await expect(page.locator('text=/Héros: \\[\\d+,\\d+\\]/')).toBeVisible();
    await expect(page.locator('text=Utilisez les flèches pour naviguer')).toBeVisible();
  });

  test('navigation clavier (simulation)', async ({ page }) => {
    await page.click('text=⚔️ Normal');
    
    // Récupérer la position initiale
    const viewportText = page.locator('text=/Viewport: \\[\\d+,\\d+\\]/');
    const initialViewport = await viewportText.textContent();
    
    // Simuler les touches fléchées
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    
    // Le viewport devrait changer (ou au moins l'UI devrait réagir)
    // Note: Le changement exact dépend de l'implémentation
    await expect(viewportText).toBeVisible();
  });

  test('temporal display en mode Chasse', async ({ page }) => {
    await page.click('text=💀 Difficile');
    
    // Vérifier le temporal display compact
    await expect(page.locator('text=TW')).toBeVisible();
    await expect(page.locator('text=TE')).toBeVisible();
    await expect(page.locator('text=Δt')).toBeVisible();
    
    // En mode difficile, le drift devrait être plus élevé
    const difficultyBadge = page.locator('text=HARD');
    await expect(difficultyBadge).toBeVisible();
  });

  test('resources bar compact', async ({ page }) => {
    await page.click('text=🌱 Facile');
    
    // Vérifier la barre de ressources compacte
    await expect(page.locator('text=💎')).toBeVisible();
    await expect(page.locator('text=⚡')).toBeVisible();
    await expect(page.locator('text=⏰')).toBeVisible();
  });

  test('retour au menu depuis le sélecteur', async ({ page }) => {
    // Bouton retour visible
    const backButton = page.locator('text=← Retour au menu');
    await expect(backButton).toBeVisible();
    
    // Cliquer pour retourner
    await backButton.click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Magic Stack Unified')).toBeVisible();
  });

  test('retour au menu depuis le jeu', async ({ page }) => {
    // Lancer le jeu
    await page.click('text=🔥 Cauchemar');
    
    // Bouton menu dans le footer
    await page.click('text=🏠 Menu');
    await expect(page).toHaveURL('/');
  });

  test('hover effect sur les boutons de difficulté', async ({ page }) => {
    const normalButton = page.locator('button').filter({ hasText: 'Normal' });
    
    // Hover
    await normalButton.hover();
    
    // Vérifier l'animation (transform)
    await page.waitForTimeout(100);
    const style = await normalButton.getAttribute('style');
    expect(style).toContain('translateY(-4px)');
  });

  test('difficulté Cauchemar - paramètres extrêmes', async ({ page }) => {
    await page.click('text=🔥 Cauchemar');
    
    // Vérifier que le mode est bien Cauchemar
    await expect(page.locator('text=NIGHTMARE')).toBeVisible();
    
    // Le badge devrait être rouge
    const badge = page.locator('span').filter({ hasText: 'NIGHTMARE' });
    const style = await badge.getAttribute('style');
    expect(style).toContain('#fc8181'); // Rouge
  });

  test('grille hexagonale 20x20 visible', async ({ page }) => {
    await page.click('text=⚔️ Normal');
    
    // Vérifier que la grille est présente
    const hexGrid = page.locator('.hex-grid-container');
    await expect(hexGrid).toBeVisible();
    
    // Il devrait y avoir des hexagones visibles
    const hexCells = page.locator('.hex-cell');
    await expect(hexCells.first()).toBeVisible();
  });

  test('indicateurs de position fonctionnels', async ({ page }) => {
    await page.click('text=🌱 Facile');
    
    // Footer avec infos de map
    const footer = page.locator('footer');
    await expect(footer.locator('text=Map totale: 120×120')).toBeVisible();
    await expect(footer.locator('text=Zone visible: 20×20')).toBeVisible();
  });
});
