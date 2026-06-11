import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test('happy path: register y login', async ({ page }) => {
    const email = `qa+${Date.now()}@test.com`;
    const password = 'QaTest123!';

    await page.goto(`${baseUrl}/register`);

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    await page.click('button[type="submit"]');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/login/);

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
});