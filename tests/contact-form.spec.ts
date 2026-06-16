import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('Contact form renders and accepts input', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.getByLabel(/name|full name/i);
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Test User');
    await expect(nameInput).toHaveValue('Test User');
  });

  test('Navigation to contact via navbar link', async ({ page }) => {
    await page.goto('/');
    const contactLink = page.getByRole('link', { name: /contact/i }).first();
    await contactLink.click();
    await expect(page).toHaveURL('/contact');
  });
});
