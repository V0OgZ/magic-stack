/**
 * Tests E2E - Page d'accueil Magic Stack Unified
 */

import { test, expect } from '@playwright/test';

test.describe('Page d\'accueil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('affiche le titre principal', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Magic Stack Unified');
  });

  test('affiche les 3 cartes de modes', async ({ page }) => {
    const cards = page.locator('[style*="display: flex"][style*="flex-direction: column"][style*="padding: 24"]');
    await expect(cards).toHaveCount(3);
    
    // Vérifier les titres
    await expect(page.locator('text=Heroes of Time')).toBeVisible();
    await expect(page.locator('text=World Editor')).toBeVisible();
    await expect(page.locator('text=Chasse Temporelle')).toBeVisible();
  });

  test('affiche les indicateurs de backend', async ({ page }) => {
    const indicators = page.locator('text=/Rust|Java|Vector/');
    await expect(indicators).toHaveCount(3);
    
    // Vérifier les ports
    await expect(page.locator('text=:3001')).toBeVisible();
    await expect(page.locator('text=:8080')).toBeVisible();
    await expect(page.locator('text=:5001')).toBeVisible();
  });

  test('navigation vers le mode Game', async ({ page }) => {
    await page.click('text=Heroes of Time');
    await expect(page).toHaveURL('/game');
    await expect(page.locator('h1')).toContainText('Heroes of Time');
  });

  test('navigation vers le mode Editor', async ({ page }) => {
    await page.click('text=World Editor');
    await expect(page).toHaveURL('/editor');
    await expect(page.locator('h1')).toContainText('World Editor');
  });

  test('navigation vers le mode Chasse', async ({ page }) => {
    await page.click('text=Chasse Temporelle');
    await expect(page).toHaveURL('/chasse');
    await expect(page.locator('h1')).toContainText('Chasse Temporelle');
  });

  test('hover effects sur les cartes', async ({ page }) => {
    const gameCard = page.locator('text=Heroes of Time').locator('..');
    
    // Vérifier l'état initial
    const initialStyle = await gameCard.getAttribute('style');
    expect(initialStyle).toContain('rgba(255, 255, 255, 0.05)');
    
    // Hover
    await gameCard.hover();
    
    // Vérifier le changement de style (animation)
    await page.waitForTimeout(100);
    const hoverStyle = await gameCard.getAttribute('style');
    expect(hoverStyle).toContain('translateY(-4px)');
  });

  test('responsive sur mobile', async ({ page, viewport }) => {
    // Simuler viewport mobile
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Les cartes doivent s'empiler verticalement
    const cards = page.locator('[style*="display: flex"][style*="flex-direction: column"][style*="padding: 24"]');
    await expect(cards).toHaveCount(3);
    
    // Vérifier que le texte reste lisible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Un seul code, tous les modes')).toBeVisible();
  });
});
