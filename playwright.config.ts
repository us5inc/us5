import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'node scripts/playwright-preview.mjs',
    url: 'http://127.0.0.1:4321/us5/',
    reuseExistingServer: false,
  },
  use: { baseURL: 'http://127.0.0.1:4321/us5/' },
});
