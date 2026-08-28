import type { APIRoute } from 'astro';
import { withBase } from '../lib/urls';
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'US5 Incorporation',
      short_name: 'US5',
      start_url: withBase('/'),
      display: 'standalone',
      background_color: '#F4F5F7',
      theme_color: '#0A0E1A',
      icons: [{ src: withBase('/favicon.svg'), sizes: 'any', type: 'image/svg+xml' }],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
