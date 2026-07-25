import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: 'browser.e2e.mjs',
  timeout: 30_000,
  use: {
    headless: true,
  },
});
