
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');
    
    // Verify we're on the homepage
    await expect(page).toHaveURL('/');
    
    // Click the "How it works" link in the navigation
    await page.getByRole('link', { name: /how it works/i }).click();
    
    // Verify we're on the "How it works" page
    await expect(page).toHaveURL(/.*\/how-it-works/);
    
    // Navigate to brands page
    await page.getByRole('link', { name: /brands/i }).click();
    
    // Verify we're on the brands page
    await expect(page).toHaveURL(/.*\/brands/);
  });
  
  test('footer links work correctly', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');
    
    // Click the "Privacy" link in the footer
    await page.getByRole('link', { name: /privacy/i }).click();
    
    // Verify we're on the privacy page
    await expect(page).toHaveURL(/.*\/privacy/);
    
    // Click the "Terms" link in the footer
    await page.getByRole('link', { name: /terms/i }).click();
    
    // Verify we're on the terms page
    await expect(page).toHaveURL(/.*\/terms/);
  });
});
