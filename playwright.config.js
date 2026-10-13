// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : 4,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter:process.env.CI ? 'blob' : 'html',
    
  use: {
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    headless: isCI,
    viewport: isCI ? { width: 1280, height: 720 } : null,
    launchOptions: isCI ? {} : { args: ['--start-maximized'] },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName:'firefox' },
    },

    {
      name: 'webkit',
      use: { browserName:'webkit'}
    }

  ]
});
