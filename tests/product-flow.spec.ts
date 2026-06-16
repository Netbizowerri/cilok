import { test, expect } from '@playwright/test';

test.describe('Product Flow', () => {
  test('Product detail page loads from product card click', async ({ page }) => {
    await page.goto('/products');
    const firstProductLink = page.getByRole('link', { name: /Formulation Specs|Technical Specs/i }).first();
    await firstProductLink.click();
    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.getByText(/Features|Application Steps/i)).toBeVisible();
  });

  test('Order page loads with form', async ({ page }) => {
    await page.goto('/products/order');
    await expect(page.getByText(/Order|Shipping|Delivery/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Order/i })).toBeVisible();
  });
});
