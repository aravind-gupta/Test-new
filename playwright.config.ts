import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  testDir: './tests',
 
  timeout: 60 * 1000,
 
  expect: {
    timeout: 10000,
  },
 
 
  fullyParallel: false,
  workers: 3,
 
  retries: 0, //
 
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
 
  use: {
    baseURL: 'https://parabank.parasoft.com/parabank/',
 
    headless: false,
 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
 
    actionTimeout: 20000,
    navigationTimeout: 60000,
 
    viewport: { width: 1280, height: 720 },
 
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
 
    //  IMPORTANT: slow down execution (reduces bot detection)
    launchOptions: {
      slowMo: 50,
    },
  },
 
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
 