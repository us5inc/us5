import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const root = process.cwd();
const page = (route: string) => readFileSync(join(root, 'dist', route, 'index.html'), 'utf8');
const mainContent = (html: string) => html.match(/<main[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
const productLinks = (html: string) =>
  html.match(/<nav class="product-links"[^>]*>(.*?)<\/nav>/s)?.[1] ?? '';

describe('generated corporate site', () => {
  beforeAll(() => execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'pipe' }), 30_000);

  it.each([
    'about',
    'services',
    'digital-solutions',
    'contact',
    'support',
    'privacy',
    'terms',
    'data-deletion',
  ])('generates the %s route with canonical metadata', (route) => {
    const html = page(route);
    expect(html).toContain('<title>US5 Inc.</title>');
    expect(html).toContain(`<link rel="canonical" href="https://us5inc.github.io/us5/${route}/">`);
    expect(html).toContain('<meta name="description"');
  });

  it('generates an accessible, factual home page', () => {
    const html = page('');
    expect(html).toContain('<title>US5 Inc.</title>');
    expect(html).toContain('<meta property="og:title" content="US5 Inc.">');
    expect(html).not.toContain('<title>Mobile games and digital solutions');
    expect(html).toContain('Games that entertain.');
    expect(html).toContain('Skip to content');
    expect(html).toContain('aria-label="Primary navigation"');
    expect(html).not.toMatch(/testimonial|downloads|five-star|award-winning/i);
  });

  it('uses the approved Pattern 1A identity', () => {
    const html = page('');
    const favicon = readFileSync(join(root, 'dist', 'favicon.svg'), 'utf8');
    const approvedPath = 'M64 26 H34 V60 A26 26 0 0 0 86 60 V42';
    expect(html).toContain(approvedPath);
    expect(favicon).toContain(approvedPath);
    expect(favicon).toContain('fill="#0A0E1A"');
    expect(favicon).toContain('stroke="#F4F5F7"');
    expect(favicon).not.toContain('linearGradient');
    expect(html).not.toContain('M10 11v13');
  });

  it('ships a monochrome interface outside the product artwork', () => {
    const css = readdirSync(join(root, 'dist', '_astro'))
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFileSync(join(root, 'dist', '_astro', file), 'utf8'))
      .join('\n');
    const social = readFileSync(join(root, 'dist', 'social-card.svg'), 'utf8');
    const home = page('');
    const interfaceAssets = `${css}\n${social}\n${home}`;
    expect(interfaceAssets).not.toMatch(/#5b34e8|#22d3ee/i);
    expect(interfaceAssets).not.toContain('linearGradient');
    expect(social).toContain('#0A0E1A');
    expect(social).toContain('#F4F5F7');
    expect(social).toContain('#FFFFFF');
  });

  it('publishes the exact verified Neon Bubble Galaxy contract', () => {
    const listing = page('products');
    const product = page('products/neon-bubble-galaxy');
    for (const html of [listing, product]) {
      const main = mainContent(html);
      expect(main).toMatch(/<h[12][^>]*>\s*(?:<a[^>]*>)?Neon Bubble Galaxy(?:<\/a>)?\s*<\/h[12]>/);
      expect(main).toMatch(/<span[^>]*>Published mobile game<\/span>/);
      expect(main).toMatch(/<p[^>]*>\s*A mobile game published by US5 Incorporation\.\s*<\/p>/);
      expect(main).toMatch(/<dt[^>]*>Developer<\/dt><dd[^>]*>US5 Incorporation<\/dd>/);
      expect(main).toMatch(/<dt[^>]*>Category<\/dt><dd[^>]*>Mobile game<\/dd>/);
      expect(main).toContain('src="/us5/images/neon-bubble-galaxy.png"');
      expect(productLinks(html)).toContain('href="/us5/privacy/"');
      expect(productLinks(html)).toContain('href="/us5/support/"');
      expect(productLinks(html)).toContain('href="/us5/data-deletion/"');
      expect(main).not.toMatch(/\b(?:coming soon|in development)\b/i);
    }
    expect(productLinks(listing)).toContain('href="/us5/products/neon-bubble-galaxy/"');
  });

  it('omits unverified store metadata and marketing claims', () => {
    const prohibited = [
      [
        'Play or App Store URL',
        /href="https?:\/\/(?:play\.google\.com\/store\/apps|apps\.apple\.com\/[^"]*\/app\/)[^"]*"/i,
      ],
      [
        'Play or App Store badge',
        /(?:alt|aria-label|title)="[^"]*(?:Google Play|Play Store|App Store)[^"]*"/i,
      ],
      [
        'package or application ID',
        /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*(?:package(?:\s+name)?|application\s+ID)\s*</i,
      ],
      [
        'rating, review, or download metric',
        /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*(?:ratings?|review count|download count|downloads?)\s*<|\b(?:\d(?:\.\d)?\s*(?:\/|out of)\s*5|\d[\d,.]*\+?\s+(?:ratings?|reviews?|downloads?))\b/i,
      ],
      [
        'feature or gameplay claim',
        /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*(?:features?|highlights?|gameplay)\s*<|\b(?:features?|gameplay)\s*(?::|—|-)\s*\S|\b(?:features?|gameplay)\s+(?:include|includes|offers|lets|allows|delivers)\b/i,
      ],
      [
        'screenshot',
        /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*(?:screenshots?|gallery)\s*<|(?:alt|aria-label)="[^"]*\bscreenshot\b[^"]*"/i,
      ],
      ['release date', /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*(?:release date|released)\s*</i],
      [
        'price',
        /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*price\s*<|\b(?:USD|INR|EUR|GBP)\s*\d|(?:\$|€|£)\s*\d/i,
      ],
      [
        'audience',
        /<(?:h[1-6]|dt|th|strong|b)\b[^>]*>\s*(?:target audience|audience|age rating)\s*<|\b(?:ages?\s+\d+\+|rated\s+(?:\d+\+|everyone|teen|mature))\b/i,
      ],
    ] as const;

    for (const route of ['products', 'products/neon-bubble-galaxy']) {
      const html = page(route);
      const main = mainContent(html);
      expect(productLinks(html), route + ' contains an external product link').not.toMatch(
        /href="https?:\/\//i,
      );
      for (const [label, pattern] of prohibited) {
        expect(main, route + ' contains prohibited ' + label).not.toMatch(pattern);
      }
    }
  });

  it('removes obsolete publication copy and provides exact deletion boundaries', () => {
    const support = mainContent(page('support'));
    const deletion = mainContent(page('data-deletion'));
    expect(support).not.toContain('future US5 product');
    expect(support).not.toContain('No US5 mobile product');
    expect(deletion).not.toContain('Future mobile products');
    expect(deletion).not.toContain('No mobile product is currently published on this website.');
    expect(deletion).toContain('does not provide a US5 account or saved profile');
    expect(deletion).toContain('Email correspondence held by US5');
    expect(deletion).toContain('AdMob');
    expect(deletion).toContain('Firebase Crashlytics');
    expect(deletion).toContain('Google-controlled processing');
    expect(deletion).toContain(
      'cannot promise deletion from third-party systems it does not control',
    );
    expect(deletion).toContain('href="/us5/privacy/"');
  });

  it('publishes the authorized AdMob seller record', () => {
    const record = readFileSync(join(root, 'dist', 'app-ads.txt'), 'utf8').trim();
    expect(record).toBe('google.com, pub-9578601039790653, DIRECT, f08c47fec0942fa0');
  });

  it('publishes an app-specific privacy disclosure for Neon Bubble Galaxy', () => {
    const html = page('privacy');
    expect(html).toContain('Neon Bubble Galaxy');
    expect(html).toContain('/us5/images/neon-bubble-galaxy.png');
    expect(html).toContain('Google Mobile Ads SDK (AdMob)');
    expect(html).toContain('Firebase Crashlytics');
    expect(html).toContain('IP address');
    expect(html).toContain('installation identifiers');
    expect(html).toContain('does not sell personal data');
  });
});
