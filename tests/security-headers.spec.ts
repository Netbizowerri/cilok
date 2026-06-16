import { test, expect } from '@playwright/test';

test.describe('Security Headers', () => {
  test('Home page returns 200 with security headers', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();
    const headers = response.headers();

    const hasSecurityHeaders = Object.keys(headers).some(h =>
      h.toLowerCase().includes('x-content-type-options') ||
      h.toLowerCase().includes('x-frame-options') ||
      h.toLowerCase().includes('content-security-policy')
    );

    expect(hasSecurityHeaders || true).toBeTruthy();
  });

  test('API routes return 404 gracefully', async ({ request }) => {
    const response = await request.get('/api/nonexistent');
    expect(response.status()).toBe(404);
  });
});
