import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html'], ['list']],
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
});