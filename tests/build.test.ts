import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const root = process.cwd();
const page = (route: string) => readFileSync(join(root, 'dist', route, 'index.html'), 'utf8');
const mainContent = (html: string) => html.match(/<main[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
const sectionByClass = (html: string, className: string) =>
  mainContent(html).match(
    new RegExp(
      `<section\\b(?=[^>]*\\bclass="[^"]*\\b${className}\\b[^"]*")[^>]*>[\\s\\S]*?<\\/section>`,
    ),
  )?.[0] ?? '';
const pageSystemRegion = (html: string, system: string) =>
  mainContent(html).match(
    new RegExp(`<section\\b(?=[^>]*\\bdata-page-system="${system}")[^>]*>[\\s\\S]*?<\\/section>`),
  )?.[0] ?? '';
const orderedListItems = (html: string, className: string) => {
  const list = html.match(
    new RegExp(`<ol\\b(?=[^>]*\\bclass="[^"]*\\b${className}\\b[^"]*")[^>]*>([\\s\\S]*?)<\\/ol>`),
  )?.[1];
  return list?.match(/<li\b[^>]*>[\s\S]*?<\/li>/g) ?? [];
};
const productLinks = (html: string) =>
  html.match(/<nav class="product-links"[^>]*>(.*?)<\/nav>/s)?.[1] ?? '';
const visibleCopy = (html: string) =>
  html
    .replace(/<(script|style)\b[^>]*>.*?<\/\1>/gis, '')
    .replace(/<[^>]+>/g, '\n')
    .split('\n')
    .map((segment) => segment.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
const productIcon = (html: string) =>
  html
    .match(/<img\b[^>]*>/gi)
    ?.find((tag) => tag.includes('src="/us5/images/neon-bubble-galaxy.png"')) ?? '';
const expectedProcessSteps = [
  [
    'Define',
    'Align the product, audience, constraints, and measure of success before complexity grows.',
  ],
  ['Build', 'Develop in focused increments with usability and performance considered throughout.'],
  ['Refine', 'Test the complete experience, resolve friction, and prepare a responsible release.'],
] as const;

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

  it('renders the Home editorial product and process structure', () => {
    const home = mainContent(page(''));
    expect(home).toContain('data-figure="01"');
    expect(home).toMatch(/<ol class="process-rail"[^>]*>/);
    expect(home).toMatch(
      /<article class="product-feature"[\s\S]*href="\/us5\/products\/neon-bubble-galaxy\/"/,
    );
    expect(home).not.toMatch(/class="[^"]*\bcard\b[^"]*"/);
  });

  it('renders distinct card-free marketing route systems', () => {
    const routes = [
      ['about', 'manifesto'],
      ['services', 'capability-ledger'],
      ['digital-solutions', 'system-bands'],
    ] as const;

    for (const [route, system] of routes) {
      const content = mainContent(page(route));
      expect(content, route).toContain(`data-page-system="${system}"`);
      expect(content, route).not.toMatch(/class="[^"]*\bcard\b[^"]*"/);
    }
  });

  it('keeps the complete About manifesto and process hierarchy in semantic order', () => {
    const html = page('about');
    const manifesto = pageSystemRegion(html, 'manifesto');
    const principles = orderedListItems(manifesto, 'manifesto-principles');
    const expectedPrinciples = [
      [
        'Product thinking meets careful execution',
        'Good software begins with a clear reason to exist. We work from the intended experience and business outcome, then connect design and engineering decisions to that purpose.',
      ],
      [
        'A complete delivery approach',
        'Our process moves through definition, interaction design, development, testing, and release preparation. Each stage is an opportunity to remove uncertainty and improve the whole product—not simply complete a checklist.',
      ],
      [
        'Responsible by design',
        'Performance, usability, privacy, and maintainability are product concerns. We consider them throughout delivery so the result is easier to use, support, and evolve.',
      ],
    ] as const;

    expect(manifesto).toContain('<ol class="manifesto-principles">');
    expect(principles).toHaveLength(3);
    expectedPrinciples.forEach(([heading, body], index) => {
      expect(principles[index]).toContain(`<h2>${heading}</h2>`);
      expect(principles[index]).toContain(`<p>${body}</p>`);
    });

    const process = sectionByClass(html, 'manifesto-process');
    expect(process).toMatch(/<h2[^>]*>How we work<\/h2>[\s\S]*<ol class="process-rail">/);
    const processSteps = orderedListItems(process, 'process-rail');
    expect(processSteps).toHaveLength(3);
    expectedProcessSteps.forEach(([heading, body], index) => {
      expect(processSteps[index]).toContain(`<h3>${heading}</h3>`);
      expect(processSteps[index]).toContain(`<p>${body}</p>`);
    });
  });

  it('keeps all service capabilities and the approved delivery panel in semantic order', () => {
    const html = page('services');
    const ledger = pageSystemRegion(html, 'capability-ledger');
    const capabilities = orderedListItems(ledger, 'capability-ledger');
    const expectedCapabilities = [
      [
        'Mobile game development',
        'Shape a game concept into a responsive mobile experience designed around clear interaction, satisfying play, and reliable performance.',
      ],
      [
        'Android &amp; cross-platform apps',
        'Bring a product to the devices your audience uses with a maintainable application experience and a practical release path.',
      ],
      [
        'UI/UX design',
        'Turn complex workflows into interfaces that feel clear, consistent, and easy to learn.',
      ],
      [
        'Custom digital solutions',
        'Replace disconnected tools and manual steps with focused software built around the way your business operates.',
      ],
      [
        'Product modernization',
        'Improve an existing product’s usability, maintainability, and readiness for what comes next.',
      ],
      [
        'Quality &amp; performance',
        'Find friction before users do through deliberate testing, performance review, and release-focused quality work.',
      ],
      [
        'Maintenance &amp; support',
        'Keep products dependable after launch with measured improvements, issue resolution, and ongoing technical care.',
      ],
    ] as const;

    expect(ledger).toMatch(/<h2[^>]*>Capabilities<\/h2>[\s\S]*<ol class="capability-ledger">/);
    expect(capabilities).toHaveLength(7);
    expectedCapabilities.forEach(([heading, body], index) => {
      expect(capabilities[index]).toContain(`<h3>${heading}</h3>`);
      expect(capabilities[index]).toContain(`<p>${body}</p>`);
    });

    const delivery = sectionByClass(html, 'technical-section-band--dark');
    expect(delivery).toContain('<span class="eyebrow">How we work</span>');
    expect(delivery).toContain('<h2 id="technical-section-01">Clarity at every stage.</h2>');
    expect(delivery).toContain(
      '<p>We connect product intent, interface design, engineering, testing, and delivery so each decision supports the experience as a whole.</p>',
    );
    const processSteps = orderedListItems(delivery, 'process-rail');
    expect(processSteps).toHaveLength(3);
    expectedProcessSteps.forEach(([heading, body], index) => {
      expect(processSteps[index]).toContain(`<h3>${heading}</h3>`);
      expect(processSteps[index]).toContain(`<p>${body}</p>`);
    });
  });

  it('keeps all digital system bands static and in semantic order', () => {
    const bands = pageSystemRegion(page('digital-solutions'), 'system-bands');
    const items = orderedListItems(bands, 'system-bands');
    const expectedItems = [
      [
        'Custom mobile applications',
        'Give customers or teams a focused mobile experience shaped around a real workflow.',
      ],
      [
        'Business workflow solutions',
        'Reduce repetitive handoffs and bring important work into a clearer, more consistent flow.',
      ],
      [
        'API integrations',
        'Help products and services exchange information reliably across established boundaries.',
      ],
      [
        'Cloud-connected systems',
        'Connect applications to well-structured services that can support secure, dependable product experiences.',
      ],
      [
        'Product consulting &amp; modernization',
        'Clarify the next practical move for an existing product, from experience improvements to technical renewal.',
      ],
    ] as const;

    expect(bands).toContain('<ol class="system-bands">');
    expect(items).toHaveLength(5);
    expectedItems.forEach(([heading, body], index) => {
      expect(items[index]).toContain(`<h2>${heading}</h2>`);
      expect(items[index]).toContain(`<p>${body}</p>`);
    });
    expect(bands).not.toMatch(/<(?:a|button)\b/i);
  });

  it('uses the approved Pattern 1A identity', () => {
    const html = page('');
    const favicon = readFileSync(join(root, 'dist', 'favicon.svg'), 'utf8');
    const approvedPath = 'M64 26 H34 V60 A26 26 0 0 0 86 60 V42';
    const heroTraces =
      html.match(/<path\b(?=[^>]*\bclass="[^"]*\bhero-mark-trace\b[^"]*")[^>]*>/g) ?? [];
    expect(heroTraces).toHaveLength(1);
    const [heroTrace = ''] = heroTraces;
    expect(heroTrace).toContain(`d="${approvedPath}"`);
    expect(heroTrace).toContain('stroke="#F4F5F7"');
    expect(heroTrace).toContain('stroke-width="14"');
    expect(heroTrace).toContain('stroke-linecap="round"');
    expect(heroTrace).toContain('stroke-linejoin="round"');
    expect(favicon).toContain(approvedPath);
    expect(favicon).toContain('fill="#0A0E1A"');
    expect(favicon).toContain('stroke="#F4F5F7"');
    expect(favicon).not.toContain('linearGradient');
    expect(html).not.toContain('brand-field');
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
      const icon = productIcon(main);
      expect(icon).toContain('src="/us5/images/neon-bubble-galaxy.png"');
      expect(icon).toMatch(/\bwidth="512"/);
      expect(icon).toMatch(/\bheight="512"/);
      expect(productLinks(html)).toContain('href="/us5/privacy/"');
      expect(productLinks(html)).toContain('href="/us5/support/"');
      expect(productLinks(html)).toContain('href="/us5/data-deletion/"');
      expect(main).not.toMatch(/\b(?:coming soon|in development)\b/i);
    }
    expect(productLinks(listing)).toContain('href="/us5/products/neon-bubble-galaxy/"');
  });

  it('omits unverified store metadata and marketing claims', () => {
    const prohibitedCopy = [
      ['View on Google Play copy', /(?:^|\n)View on Google Play(?:\n|$)/i],
      ['store listing copy', /(?:^|\n)(?:Google Play|Play Store|App Store)(?:\n|$)/i],
      [
        'package or application ID',
        /(?:^|\n)(?:package(?: name)?|application ID)(?:[ \t]*:[^\n]+)?(?:\n|$)|(?:\b[a-z][a-z0-9_-]*\.){2,}[a-z][a-z0-9_-]*\b/i,
      ],
      [
        'rating, review, or download metric',
        /(?:^|\n)(?:ratings?|review count|download count|downloads?)(?:[ \t]*:[^\n]+)?(?:\n|$)|\b(?:\d(?:\.\d)?[ \t]*(?:\/|out of)[ \t]*5|\d[\d,.]*\+?[ \t]+(?:ratings?|reviews?|downloads?))\b/i,
      ],
      [
        'feature or gameplay claim',
        /(?:^|\n)(?:features?|highlights?|gameplay)(?:\n|$)|\b(?:features?|gameplay)[ \t]*(?::|—|-)[ \t]*\S|\b(?:features?|gameplay)[ \t]+(?:include|includes|offers|lets|allows|delivers|provides)\b/i,
      ],
      [
        'screenshot',
        /(?:^|\n)(?:screenshots?|gallery)(?:\n|$)|\bscreenshots?[ \t]*(?::|—|-)[ \t]*\S/i,
      ],
      [
        'release date',
        /(?:^|\n)(?:release date|released)(?:[ \t]*:[^\n]+)?(?:\n|$)|\breleased?[ \t]+(?:on|in)[ \t]+\S/i,
      ],
      [
        'price',
        /(?:^|\n)price(?:[ \t]*:[^\n]+)?(?:\n|$)|\b(?:USD|INR|EUR|GBP)[ \t]*\d|(?:\$|€|£)[ \t]*\d/i,
      ],
      [
        'audience',
        /(?:^|\n)(?:target audience|audience|age rating)(?:[ \t]*:[^\n]+)?(?:\n|$)|\b(?:ages?[ \t]+\d+\+|rated[ \t]+(?:\d+\+|everyone|teen|mature))\b/i,
      ],
    ] as const;

    for (const route of ['products', 'products/neon-bubble-galaxy']) {
      const html = page(route);
      const main = mainContent(html);
      const copy = visibleCopy(main);
      expect(productLinks(html), route + ' contains an external product link').not.toMatch(
        /href="https?:\/\//i,
      );
      expect(main, route + ' contains a Play or App Store URL').not.toMatch(
        /https?:\/\/(?:play\.google\.com\/store\/apps|apps\.apple\.com\/[^"]*\/app\/)[^"<\s]*/i,
      );
      expect(main, route + ' contains a Play or App Store badge').not.toMatch(
        /(?:alt|aria-label|title)="[^"]*(?:Google Play|Play Store|App Store)[^"]*"/i,
      );
      expect(main, route + ' contains a screenshot image').not.toMatch(
        /(?:src|alt|aria-label)="[^"]*\bscreenshot\b[^"]*"/i,
      );
      for (const [label, pattern] of prohibitedCopy) {
        expect(copy, route + ' contains prohibited ' + label).not.toMatch(pattern);
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

  it('publishes stable legal navigation without weakening product disclosures', () => {
    const privacy = mainContent(page('privacy'));
    const contents =
      privacy.match(/<nav\b(?=[^>]*aria-label="On this page")[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? '';

    for (const id of ['scope', 'game-data', 'sharing-retention', 'choices', 'contact']) {
      expect(contents).toContain(`href="#${id}"`);
      expect(privacy).toMatch(new RegExp(`<h2\\b[^>]*\\bid="${id}"[^>]*>`));
    }
    expect(privacy).toContain('Google Mobile Ads SDK (AdMob)');
    expect(privacy).toContain('Firebase Crashlytics');

    expect(mainContent(page('support'))).toContain('Neon Bubble Galaxy');
    expect(mainContent(page('data-deletion'))).toContain('Neon Bubble Galaxy');
  });
});
