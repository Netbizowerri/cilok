import { test, expect } from '@playwright/test';

test.describe('Service Flow', () => {
  test('Service detail page loads from service card', async ({ page }) => {
    await page.goto('/services');
    const firstServiceLink = page.getByRole('link', { name: /View Service|Learn More/i }).first();
    await firstServiceLink.click();
    await expect(page).toHaveURL(/\/services\/.+/);
    await expect(page.getByText(/Process|Steps|Ideal For/i)).toBeVisible();
  });

  test('Booking page loads with service form', async ({ page }) => {
    await page.goto('/services/book');
    await expect(page.getByText(/Book|Schedule|Service/i)).toBeVisible();
  });
});
