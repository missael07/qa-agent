import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'https://gentle-marigold-f653a5.netlify.app/';

test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/register`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(6000);
});

test('register vacío muestra error', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.getByTestId('error-message'))
        .toContainText('All fields are required.');

    await expect(page).toHaveURL(/register/);
});

test('register con email inválido muestra error', async ({ page }) => {
    await page.fill('#email', 'correo-invalido');
    await page.fill('#password', 'QaTest123!');
    await page.fill('#confirmPassword', 'QaTest123!');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await expect(page.getByTestId('error-message'))
        .toContainText('Email is invalid.');

    await expect(page).toHaveURL(/register/);
});

test('register con password corta muestra error', async ({ page }) => {
    await page.fill('#email', 'qa@test.com');
    await page.fill('#password', '123');
    await page.fill('#confirmPassword', '123');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page.getByTestId('error-message'))
        .toContainText('Password must be at least 8 characters.');

    await expect(page).toHaveURL(/register/);
});

test('register con passwords diferentes muestra error', async ({ page }) => {
    await page.fill('#email', 'qa@test.com');
    await page.fill('#password', 'QaTest123!');
    await page.fill('#confirmPassword', 'Otra123!');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page.getByTestId('error-message'))
        .toContainText('Passwords do not match.');

    await expect(page).toHaveURL(/register/);
});