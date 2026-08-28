import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4321/us5/',
    reuseExistingServer: true,
  },
  use: { baseURL: 'http://127.0.0.1:4321/us5/' },
});
