import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'https://gentle-marigold-f653a5.netlify.app/';

test('happy path: register y login', async ({ page }) => {
    const email = `qaTest@test.com`;
    const password = 'QaTest123!';

    await page.goto(`${baseUrl}/register`);

    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => {
    return document.querySelector('#__nuxt') !== null;
    });

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

    console.log(
  'Antes click:',
  await page.locator('#email').inputValue()
);

await page.waitForTimeout(1000);

console.log(
  '1 segundo después:',
  await page.locator('#email').inputValue()
);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    console.log('URL after submit:', await page.url());


    await page.waitForTimeout(8000);


    await expect(page).toHaveURL(/login/);

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
});