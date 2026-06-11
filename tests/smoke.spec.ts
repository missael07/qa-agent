import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

test('happy path: register y login', async ({ page }) => {
    const email = `qa+${Date.now()}@test.com`;
    const password = 'QaTest123!';

    await page.goto(`${baseUrl}/register`);

    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.fill('#confirmPassword', password);

    console.log('Email:', await page.locator('#email').inputValue());
    console.log('Password:', await page.locator('#password').inputValue());
    console.log('Confirm:', await page.locator('#confirmPassword').inputValue());

    await page.screenshot({
        path: 'before-submit.png',
        fullPage: true,
    });

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    console.log('URL after submit:', await page.url());

    await expect(page).toHaveURL(/login/);

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
});