const { defineConfig } = require('@playwright/test');

// Environment configuration
const env = process.env.ENV || 'dev';
const baseURL = {
  dev: 'https://dev.example.com',
  staging: 'https://staging.example.com',
  prod: 'https://prod.example.com'
}[env];

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },
  ],
}); 