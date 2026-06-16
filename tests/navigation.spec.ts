import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('Home page loads with correct title and key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Cilok Paint/);
    await expect(page.getByRole('heading', { name: /Cilok/i })).toBeVisible();
  });

  test('Products page loads and shows product grid', async ({ page }) => {
    await page.goto('/products');
    await expect(page.getByText(/Silk Paint|Matt Paint|Emulsion/)).toBeVisible();
  });

  test('Services page loads and shows service cards', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByText(/Paint Application|Wall Screeding/)).toBeVisible();
  });

  test('Projects page loads with portfolio grid', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: /Our Portfolio/i })).toBeVisible();
  });

  test('About page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText(/Since 2006|Anambra/i)).toBeVisible();
  });

  test('Contact page loads with form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByText(/Contact|Distributors/i)).toBeVisible();
  });

  test('404 page for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();
  });
});
