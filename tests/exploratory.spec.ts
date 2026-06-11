import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'https://gentle-marigold-f653a5.netlify.app/';

test('exploratory: páginas principales no tienen errores visibles', async ({ page }) => {

    
    const consoleErrors: string[] = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    const pages = [
        '/',
        '/register',
        '/login',
        '/dashboard',
    ];

    for (const route of pages) {
        await page.goto(`${baseUrl}${route}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        await expect(page.locator('body')).not.toContainText('404');
        await expect(page.locator('body')).not.toContainText('500');
        await expect(page.locator('body')).not.toContainText('Exception');
    }

    expect(consoleErrors).toEqual([]);
});