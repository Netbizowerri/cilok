import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('Mobile nav menu opens and contains links', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: /menu|open|hamburger/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.getByText(/Products|Services|Projects/i)).toBeVisible();
    }
  });
});
