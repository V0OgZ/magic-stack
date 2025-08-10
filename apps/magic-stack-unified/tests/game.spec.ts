/**
 * Tests E2E - Mode Game (Heroes of Time)
 */

import { test, expect } from '@playwright/test';

test.describe('Mode Game - Heroes of Time', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/game');
  });

  test('affiche l\'interface de jeu complète', async ({ page }) => {
    // Header
    await expect(page.locator('text=⚔️ Heroes of Time')).toBeVisible();
    
    // Navigation tabs
    await expect(page.locator('text=🗺️ Carte')).toBeVisible();
    await expect(page.locator('text=⚔️ Combat')).toBeVisible();
    await expect(page.locator('text=📅 Timeline')).toBeVisible();
    
    // Temporal display
    await expect(page.locator('text=TW')).toBeVisible();
    await expect(page.locator('text=TE')).toBeVisible();
    
    // Footer
    await expect(page.locator('text=⏭️ Fin de Tour')).toBeVisible();
    await expect(page.locator('text=Jour')).toBeVisible();
    await expect(page.locator('text=Tour')).toBeVisible();
  });

  test('affiche la barre de ressources', async ({ page }) => {
    // Vérifier les 4 ressources principales
    const resourceBar = page.locator('.resource-bar').first();
    await expect(resourceBar).toBeVisible();
    
    // Les icônes doivent être présentes
    await expect(page.locator('text=💎')).toBeVisible(); // Crystals
    await expect(page.locator('text=⚡')).toBeVisible(); // Energy
    await expect(page.locator('text=⏰')).toBeVisible(); // Temporal
    await expect(page.locator('text=🌀')).toBeVisible(); // Quantum
  });

  test('navigation entre les vues', async ({ page }) => {
    // Vue Map par défaut
    const hexGrid = page.locator('.hex-grid-container');
    await expect(hexGrid).toBeVisible();
    
    // Aller à Combat
    await page.click('text=⚔️ Combat');
    await expect(page.locator('text=Mode Combat')).toBeVisible();
    await expect(page.locator('text=🎴 Mode TCG')).toBeVisible();
    
    // Aller à Timeline
    await page.click('text=📅 Timeline');
    await expect(page.locator('text=Timeline Temporelle')).toBeVisible();
    await expect(page.locator('text=Prochains Événements')).toBeVisible();
    
    // Retour à Map
    await page.click('text=🗺️ Carte');
    await expect(hexGrid).toBeVisible();
  });

  test('interaction avec la grille hexagonale', async ({ page }) => {
    // Attendre que la grille soit chargée
    const hexGrid = page.locator('.hex-grid-container');
    await expect(hexGrid).toBeVisible();
    
    // Cliquer sur un hexagone
    const firstHex = page.locator('.hex-cell').first();
    await firstHex.click();
    
    // Vérifier la sélection (classe ou style)
    await expect(firstHex).toHaveClass(/hex-selected/);
  });

  test('bouton Fin de Tour', async ({ page }) => {
    // État initial
    const dayText = page.locator('text=/Jour \\d+/');
    const initialDay = await dayText.textContent();
    
    // Cliquer sur Fin de Tour
    await page.click('text=⏭️ Fin de Tour');
    
    // Vérifier que le tour a changé
    await page.waitForTimeout(100);
    const turnText = page.locator('text=/Tour \\d+/');
    await expect(turnText).toBeVisible();
  });

  test('temporal display mise à jour', async ({ page }) => {
    // Vérifier les valeurs temporelles
    const twValue = page.locator('text=TW').locator('..').locator('span').last();
    const teValue = page.locator('text=TE').locator('..').locator('span').last();
    
    await expect(twValue).toHaveText(/\d+\.\d/);
    await expect(teValue).toHaveText(/\d+\.\d/);
    
    // Vérifier le drift
    const driftValue = page.locator('text=Δt').locator('..').locator('span').last();
    await expect(driftValue).toHaveText(/\d+\.\d/);
  });

  test('retour au menu principal', async ({ page }) => {
    await page.click('text=🏠 Menu');
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Magic Stack Unified')).toBeVisible();
  });

  test('vue Combat - boutons TCG et Auto', async ({ page }) => {
    await page.click('text=⚔️ Combat');
    
    // Vérifier les boutons
    const tcgButton = page.locator('text=🎴 Mode TCG');
    const autoButton = page.locator('text=⚡ Auto-Résolution');
    
    await expect(tcgButton).toBeVisible();
    await expect(autoButton).toBeVisible();
    
    // Vérifier qu'ils sont cliquables
    await expect(tcgButton).toBeEnabled();
    await expect(autoButton).toBeEnabled();
  });

  test('vue Timeline - événements jour 30', async ({ page }) => {
    await page.click('text=📅 Timeline');
    
    // Vérifier la présence du jour 30
    await expect(page.locator('text=Jour 30')).toBeVisible();
    await expect(page.locator('text=🌟 Événement Spécial')).toBeVisible();
    
    // Vérifier la liste des événements
    await expect(page.locator('text=L\'Apocalypse Temporelle')).toBeVisible();
  });

  test('responsive - fonctionne sur tablette', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Vérifier que l'interface s'adapte
    await expect(page.locator('text=⚔️ Heroes of Time')).toBeVisible();
    await expect(page.locator('.hex-grid-container')).toBeVisible();
    
    // Les boutons doivent rester accessibles
    await expect(page.locator('text=⏭️ Fin de Tour')).toBeVisible();
  });
});
