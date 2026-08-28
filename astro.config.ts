import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const rawBase = process.env.PUBLIC_SITE_BASE ?? '/us5';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site: 'https://us5inc.github.io',
  base,
  output: 'static',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
