const rawBase = import.meta.env.PUBLIC_SITE_BASE || '/us5';

export const siteConfig = {
  name: 'US5 Incorporation',
  email: 'usfiveincorporation@gmail.com',
  origin: 'https://usfiveincorporation.github.io',
  base: rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`,
  description:
    'US5 Incorporation creates engaging mobile experiences and dependable digital solutions.',
} as const;

export type SiteConfig = typeof siteConfig;
