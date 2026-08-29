import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const root = process.cwd();
const page = (route: string) => readFileSync(join(root, 'dist', route, 'index.html'), 'utf8');

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

  it('publishes Neon Bubble Galaxy without inventing store facts', () => {
    const listing = page('products');
    const product = page('products/neon-bubble-galaxy');
    for (const html of [listing, product]) {
      expect(html).toContain('Neon Bubble Galaxy');
      expect(html).toContain('Published mobile game');
      expect(html).not.toMatch(/coming soon|in development|downloads|rating/i);
    }
    expect(product).not.toContain('View on Google Play');
    expect(product).toContain('/us5/privacy/');
    expect(product).toContain('/us5/support/');
  });

  it('does not contradict the published product status', () => {
    expect(page('support')).not.toMatch(/no .* product|future US5 product/i);
    expect(page('data-deletion')).not.toMatch(/no .* product|future mobile products/i);
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
