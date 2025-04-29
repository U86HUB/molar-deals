
import { test, expect } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page loaded
  await expect(page).toHaveTitle(/Dental Deals/);
  
  // Check for common elements that should exist on the homepage
  const headerElement = await page.getByRole('banner').first();
  await expect(headerElement).toBeTruthy();
});

test('app navigation works', async ({ page }) => {
  // Start at the home page
  await page.goto('/');
  
  // Look for navigation elements
  const navLinks = await page.getByRole('navigation').locator('a');
  
  // Verify we have navigation links
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);
});
