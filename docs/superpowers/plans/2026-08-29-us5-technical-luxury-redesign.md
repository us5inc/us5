# US5 Monochrome Technical-Luxury Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the complete US5 Astro website into a Prime Intellect-inspired monochrome technical-luxury experience while presenting Neon Bubble Galaxy as a published product and preserving all factual, legal, accessibility, routing, and deployment contracts.

**Architecture:** Keep Astro's static, component-first architecture and base-aware URL utilities. Replace the generic card system with shared editorial primitives, keep verified product marketing data separate from the strict future Google Play schema, and use JavaScript only for navigation, contact validation, and a progressive one-time diagram enhancement.

**Tech Stack:** Astro 7, strict TypeScript, local Space Grotesk/IBM Plex Sans/IBM Plex Mono fonts, CSS, Vitest, Playwright, axe-core, GitHub Pages Actions.

**Spec:** `docs/superpowers/specs/2026-08-29-us5-technical-luxury-redesign.md`

## Global Constraints

- Interface colors are only Midnight `#0A0E1A`, Paper `#F4F5F7`, and White `#FFFFFF`; neutral hierarchy may use Midnight or White opacity.
- Signal Violet `#5B34E8`, Circuit Cyan `#22D3EE`, colored gradients, glows, and colored interaction states must not ship.
- Neon Bubble Galaxy's supplied local icon is the only full-color visual exception.
- Preserve the exact Pattern 1A path `M64 26 H34 V60 A26 26 0 0 0 86 60 V42`, 14-unit stroke, round caps, and round joins.
- Treat Neon Bubble Galaxy as a published mobile game, but do not invent a Play Store URL, package name, rating, downloads, features, screenshots, release date, price, audience, or gameplay claim.
- Preserve all existing public routes and base-aware `/us5/` behavior; add `/products/neon-bubble-galaxy/`.
- Keep every Chrome tab title exactly `US5 Inc.`.
- Preserve AdMob, Firebase Crashlytics, email, app-ads, legal, canonical, manifest, sitemap, and GitHub Pages behavior.
- Keep the strict `Product` schema and generated full-product templates unchanged.
- Add no runtime UI framework, animation package, external font, analytics, cookie, or remote image dependency.
- Support keyboard use, `prefers-reduced-motion`, WCAG AA states, and 320-pixel viewports.

## File Structure

### New files

- `src/config/featured-product.ts` — verified marketing-safe facts and internal paths for Neon Bubble Galaxy.
- `src/components/TechnicalSection.astro` — figure label, section title, optional intro, and slot wrapper.
- `src/components/CapabilityLedger.astro` — indexed static capability rows.
- `src/components/ProcessRail.astro` — semantic Define/Build/Refine sequence.
- `src/components/ProductFeature.astro` — reusable published-product presentation.
- `src/pages/products/neon-bubble-galaxy/index.astro` — dedicated internal product route using only verified facts.
- `scripts/capture-visuals.mjs` — deterministic desktop/mobile screenshot capture for manual review.

### Principal modified files

- `src/styles/global.css` — complete monochrome visual system, responsive grid, shared compositions, states, and reduced motion.
- `src/layouts/LegalLayout.astro` — optional in-page contents rail.
- `src/components/Header.astro`, `Footer.astro`, `HeroMark.astro`, `PageHero.astro`, `Cta.astro`, `EnquiryForm.astro` — redesigned shared shell and accessible interactions.
- `src/pages/index.astro`, `about.astro`, `services.astro`, `digital-solutions.astro`, `products/index.astro`, `contact.astro`, `support.astro`, `privacy.astro`, `terms.astro`, `data-deletion.astro`, `404.astro` — route compositions and product-status consistency.
- `public/social-card.svg`, `README.md` — monochrome identity and maintenance documentation.
- `tests/build.test.ts`, `tests/e2e/site.spec.ts`, `scripts/verify-build.mjs` — regression, accessibility, route, and visual contracts.

---

### Task 1: Lock the Monochrome Brand Contract

**Files:**

- Modify: `tests/build.test.ts`
- Modify: `src/styles/global.css`
- Modify: `src/components/HeroMark.astro`
- Modify: `public/social-card.svg`
- Modify: `README.md`

**Interfaces:**

- Consumes: existing Astro build output under `dist/`.
- Produces: global CSS tokens `--midnight`, `--paper`, `--white`, `--ink-soft`, `--ink-faint`, `--line-dark`, `--line-light`, `--surface-dark`, and `--surface-light`; monochrome hero and social assets for later tasks.

- [ ] **Step 1: Write the failing build-artifact test**

Add `readdirSync` to the Node imports and add this test to `tests/build.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and verify the approved colors fail**

Run:

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/vitest run tests/build.test.ts'
```

Expected: FAIL because the current CSS, hero mark, and social card contain `#5B34E8`, `#22D3EE`, and a linear gradient.

- [ ] **Step 3: Replace the global tokens and colored states**

Start `src/styles/global.css` with the exact interface palette and derived neutral tokens:

```css
:root {
  --midnight: #0a0e1a;
  --paper: #f4f5f7;
  --white: #ffffff;
  --ink: var(--midnight);
  --ink-soft: rgb(10 14 26 / 72%);
  --ink-faint: rgb(10 14 26 / 48%);
  --line-dark: rgb(10 14 26 / 16%);
  --line-light: rgb(255 255 255 / 18%);
  --surface-dark: var(--midnight);
  --surface-light: var(--paper);
  --max: 1360px;
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
  color-scheme: light;
}
```

Replace every violet/cyan declaration with Midnight, Paper, White, or an opacity token. Remove `.gradient` color clipping, colored box shadows, and colored borders. Keep the existing semantic baseline, font loading, skip link, and reduced-motion override.

- [ ] **Step 4: Make the hero and social artwork monochrome**

In `HeroMark.astro`, delete the gradient definition and set the approved path to `stroke="#F4F5F7"`. In `public/social-card.svg`, keep the Midnight field and Paper/White text, replace the monogram stroke with Paper, and remove the gradient definition completely.

- [ ] **Step 5: Update the brand documentation**

Change README's website application palette to Midnight, Paper, and White only. State that the full-color Neon Bubble Galaxy icon is the sole product-art exception and that the master Pattern 1A brand source still records the broader corporate palette outside this web application.

- [ ] **Step 6: Run the focused test and checks**

Run:

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/vitest run tests/build.test.ts'
npx --yes -p node@22.22.0 -c 'npm run format:check && npm run lint && npm run typecheck'
```

Expected: monochrome test PASS; formatting, lint, and typecheck exit 0.

- [ ] **Step 7: Commit**

```bash
git add tests/build.test.ts src/styles/global.css src/components/HeroMark.astro public/social-card.svg README.md
git commit -m "style: establish monochrome technical foundation"
```

### Task 2: Rebuild the Header and Footer Shell

**Files:**

- Modify: `tests/e2e/site.spec.ts`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Logo.astro`
- Modify: `src/styles/global.css`

**Interfaces:**

- Consumes: `withBase(path: string): string` and the Task 1 monochrome tokens.
- Produces: primary navigation with Products, `aria-current="page"`, Escape focus restoration, and a structured monochrome footer.

- [ ] **Step 1: Write failing keyboard and current-route tests**

Extend the mobile navigation test:

```ts
await page.getByRole('button', { name: 'Toggle navigation' }).click();
const productsLink = page.getByRole('link', { name: 'Products' });
await productsLink.focus();
await page.keyboard.press('Escape');
await expect(page.getByRole('button', { name: 'Toggle navigation' })).toBeFocused();
await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute(
  'aria-expanded',
  'false',
);
```

Add a desktop current-route assertion:

```ts
test('navigation exposes the current route', async ({ page }) => {
  await page.goto('./services/');
  await expect(page.getByRole('link', { name: 'Services' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
});
```

- [ ] **Step 2: Run Playwright and confirm failures**

Run:

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/playwright test tests/e2e/site.spec.ts'
```

Expected: FAIL because Products is absent, there is no `aria-current`, and Escape does not restore focus.

- [ ] **Step 3: Implement route-aware navigation**

Add Products to the link tuple and determine the active link from `Astro.url.pathname`:

```astro
---
const links = [
  ['Products', '/products/'],
  ['Services', '/services/'],
  ['Digital Solutions', '/digital-solutions/'],
  ['About', '/about/'],
  ['Contact', '/contact/'],
] as const;
const current = Astro.url.pathname;
const active = (path: string) => current === withBase(path) || current.startsWith(withBase(path));
---
```

Render `aria-current={active(path) ? 'page' : undefined}`. Remove the duplicate compact Contact button so the navigation remains typographically calm.

- [ ] **Step 4: Restore focus only for keyboard dismissal**

Split the close behavior so link activation closes without stealing focus, while Escape closes and calls `button?.focus()`:

```ts
const close = (restoreFocus = false) => {
  button?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
  if (restoreFocus) button?.focus();
};
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && button?.getAttribute('aria-expanded') === 'true') close(true);
});
```

- [ ] **Step 5: Apply the technical shell styling**

Use a 68-pixel header, one-pixel rules, a Paper/White desktop surface, an active underline, and a full-width Midnight mobile panel. Keep 44-pixel controls. Structure the footer with figure labels and use only Paper/White hover states on Midnight.

- [ ] **Step 6: Run focused tests and commit**

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/playwright test tests/e2e/site.spec.ts'
npx --yes -p node@22.22.0 -c 'npm run format:check && npm run lint && npm run typecheck'
git add tests/e2e/site.spec.ts src/components/Header.astro src/components/Footer.astro src/components/Logo.astro src/styles/global.css
git commit -m "feat: build route-aware technical site shell"
```

Expected: focused Playwright tests PASS and static checks exit 0.

### Task 3: Make Neon Bubble Galaxy a Consistent Published Product

**Files:**

- Create: `src/config/featured-product.ts`
- Create: `src/pages/products/neon-bubble-galaxy/index.astro`
- Modify: `src/pages/products/index.astro`
- Modify: `src/pages/support.astro`
- Modify: `src/pages/data-deletion.astro`
- Modify: `tests/build.test.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**

- Produces: `featuredProduct` as an immutable marketing-safe object with `name`, `slug`, `developer`, `category`, `status`, `summary`, `icon`, `productPath`, `privacyPath`, `supportPath`, and `deletionPath`.
- Preserves: `products: readonly Product[]` and all strict-schema templates.

- [ ] **Step 1: Replace the obsolete empty-catalog test with failing publication tests**

```ts
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
```

- [ ] **Step 2: Run the build test and confirm route/content failures**

Run the focused Vitest command from Task 1. Expected: FAIL because the dedicated route is missing and current copy says the product is not published.

- [ ] **Step 3: Add the verified featured-product configuration**

```ts
export const featuredProduct = {
  name: 'Neon Bubble Galaxy',
  slug: 'neon-bubble-galaxy',
  developer: 'US5 Incorporation',
  category: 'Mobile game',
  status: 'Published mobile game',
  summary: 'A mobile game published by US5 Incorporation.',
  icon: '/images/neon-bubble-galaxy.png',
  productPath: '/products/neon-bubble-galaxy/',
  privacyPath: '/privacy/',
  supportPath: '/support/',
  deletionPath: '/data-deletion/',
} as const;
```

Do not add this partial object to `products.ts` because the strict schema requires unsupplied store and legal facts.

- [ ] **Step 4: Build the listing and dedicated route**

Render the local icon with `withBase(featuredProduct.icon)`, explicit `512` dimensions, the exact status, summary, and internal Privacy/Support/Data Deletion links. Do not render a store badge or external listing link.

- [ ] **Step 5: Reconcile support and deletion copy**

Support must name Neon Bubble Galaxy and provide the verified email channel. Data Deletion must state that the game has no US5 account or saved profile, distinguish correspondence from Google-controlled AdMob/Crashlytics processing, and link to Privacy without promising deletion from third-party systems.

- [ ] **Step 6: Require the new route in build verification**

Add `'products/neon-bubble-galaxy/index.html'` to the `required` list in `scripts/verify-build.mjs`.

- [ ] **Step 7: Run focused checks and commit**

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/vitest run tests/build.test.ts'
npx --yes -p node@22.22.0 -c 'npm run build && npm run verify:build'
git add src/config/featured-product.ts src/pages/products/index.astro src/pages/products/neon-bubble-galaxy/index.astro src/pages/support.astro src/pages/data-deletion.astro tests/build.test.ts scripts/verify-build.mjs
git commit -m "feat: publish Neon Bubble Galaxy product experience"
```

Expected: product tests PASS, 12 pages build, and link verification exits 0.

### Task 4: Add Reusable Editorial Primitives

**Files:**

- Create: `src/components/TechnicalSection.astro`
- Create: `src/components/CapabilityLedger.astro`
- Create: `src/components/ProcessRail.astro`
- Create: `src/components/ProductFeature.astro`
- Modify: `src/components/PageHero.astro`
- Modify: `src/components/Cta.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/build.test.ts`

**Interfaces:**

- `TechnicalSection` props: `{ figure: string; label: string; title: string; intro?: string; tone?: 'light' | 'dark' }` plus default slot.
- `CapabilityLedger` props: `{ items: readonly (readonly [title: string, body: string])[] }`.
- `ProcessRail` has no props and renders the verified Define/Build/Refine content.
- `ProductFeature` has no props and consumes `featuredProduct`.
- `PageHero` extends its compatible props to `{ eyebrow: string; title: string; intro: string; figure?: string }`.

- [ ] **Step 1: Add failing semantic output assertions**

Add build assertions that Home contains `data-figure="01"`, an ordered process list, a product feature linked to `/us5/products/neon-bubble-galaxy/`, and no `.card` class. This test protects the user-visible structural change rather than private component internals.

- [ ] **Step 2: Run Vitest and confirm the structural test fails**

Expected: FAIL because the current Home still emits generic cards and has no published-product module.

- [ ] **Step 3: Implement the primitives with semantic HTML**

`TechnicalSection` renders a `<section>` with a `.technical-section` inner grid, `data-figure={figure}`, a visible `FIG. {figure}` label, heading, intro, and slot. `CapabilityLedger` renders an ordered list; each item uses a two-digit index, `<h3>`, and `<p>`. `ProcessRail` renders an ordered list with the existing factual Define, Build, and Refine descriptions. `ProductFeature` renders the verified icon, status, name, summary, and internal actions.

- [ ] **Step 4: Integrate the primitives and redesign shared headings/actions**

Replace Home's two sections below the existing hero with ProductFeature, TechnicalSection plus CapabilityLedger, TechnicalSection plus ProcessRail, and Cta. This makes the Task 4 regression pass while leaving the hero itself for Task 5.

PageHero becomes an asymmetric grid with an optional figure label and continuous rule. Existing callers may omit `figure`. CTA becomes a full-width Midnight contact strip with one high-contrast action and no shadow.

- [ ] **Step 5: Add shared structural CSS**

Define `.technical-section`, `.technical-meta`, `.capability-ledger`, `.capability-row`, `.process-rail`, `.product-feature`, `.page-hero-grid`, and `.contact-strip` using the twelve/eight/four-column layout. Noninteractive rows must not translate or cast hover shadows.

- [ ] **Step 6: Run static checks and commit**

```bash
npx --yes -p node@22.22.0 -c 'npm run format:check && npm run lint && npm run typecheck && npm test'
git add src/components/TechnicalSection.astro src/components/CapabilityLedger.astro src/components/ProcessRail.astro src/components/ProductFeature.astro src/components/PageHero.astro src/components/Cta.astro src/pages/index.astro src/styles/global.css tests/build.test.ts
git commit -m "feat: add technical editorial page primitives"
```

### Task 5: Recompose the Homepage

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/components/HeroMark.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/build.test.ts`
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**

- Consumes: Task 4 components and `services` configuration.
- Produces: near-full-height hero and integrated monochrome Pattern 1A technical diagram above the Task 4 editorial sections.

- [ ] **Step 1: Write the failing Home behavior test**

Assert in Vitest that Home contains the exact Pattern 1A path and no `linearGradient` or `brand-field`. In Playwright, assert the Home has exactly one level-one heading and the product heading remains visible at desktop and 320 pixels.

- [ ] **Step 2: Run focused Vitest and Playwright tests**

Expected: FAIL on the old `brand-field`, absent product, and card grid.

- [ ] **Step 3: Recompose Home in the approved order**

Render:

1. a `.home-hero` with eyebrow, existing claim-safe positioning, two internal actions, and `HeroMark` integrated into the grid;
2. `ProductFeature`;
3. `TechnicalSection` plus `CapabilityLedger` using the six existing service tuples;
4. a dark `TechnicalSection` plus `ProcessRail`;
5. `Cta`.

Keep the visible claim “Games that entertain. Digital solutions that perform.” unless a shorter line preserves both exact meanings. Do not add metrics, customers, or platform claims.

- [ ] **Step 4: Convert HeroMark into a technical diagram**

Use one inline SVG with the exact monogram path, construction grid, figure annotation, and a CSS `stroke-dasharray`/`stroke-dashoffset` reveal. The stroke must be Paper/White on Midnight. Hide decorative content from assistive technology.

- [ ] **Step 5: Add reduced-motion-safe hero styling**

Use `min-height: calc(100svh - 68px)` only where content still fits, clamp the display type, and keep all actions visible without scroll locking. In the reduced-motion query, set diagram animation to `none` and its final stroke offset to `0`.

- [ ] **Step 6: Run tests and commit**

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/vitest run tests/build.test.ts'
npx --yes -p node@22.22.0 -c './node_modules/.bin/playwright test tests/e2e/site.spec.ts'
git add src/pages/index.astro src/components/HeroMark.astro src/styles/global.css tests/build.test.ts tests/e2e/site.spec.ts
git commit -m "feat: recompose home as technical product narrative"
```

### Task 6: Recompose the Marketing Routes

**Files:**

- Modify: `src/pages/about.astro`
- Modify: `src/pages/services.astro`
- Modify: `src/pages/digital-solutions.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/build.test.ts`

**Interfaces:**

- Consumes: `PageHero`, `TechnicalSection`, `CapabilityLedger`, `ProcessRail`, `Cta`, `services`.
- Produces: distinct About, Services, and Digital Solutions compositions without generic card grids.

- [ ] **Step 1: Write failing route-composition tests**

For About, Services, and Digital Solutions, assert each generated page contains a `data-page-system` value (`manifesto`, `capability-ledger`, `system-bands`) and none contains `class="card"`. Assert all existing service and digital-solution headings remain present so visual reduction does not delete approved content.

- [ ] **Step 2: Run the focused build test**

Expected: FAIL because current pages emit generic cards and lack page-system identifiers.

- [ ] **Step 3: Implement About as a manifesto**

Keep PageHero, place the three existing factual principles in an editorial numbered list, render ProcessRail, and finish with Cta. Set `data-page-system="manifesto"` on the main route section.

- [ ] **Step 4: Implement Services as a capability ledger**

Keep all service tuples, render them through CapabilityLedger, add one Midnight delivery panel using only the approved end-to-end process wording, and finish with Cta. Set `data-page-system="capability-ledger"`.

- [ ] **Step 5: Implement Digital Solutions as system bands**

Render the five current items as alternating static bands with indexed metadata and a simple monochrome connection rule. Do not imply they are links. Set `data-page-system="system-bands"`.

- [ ] **Step 6: Run checks and commit**

```bash
npx --yes -p node@22.22.0 -c 'npm run format:check && npm run lint && npm run typecheck && npm test && npm run build && npm run verify:build'
git add src/pages/about.astro src/pages/services.astro src/pages/digital-solutions.astro src/styles/global.css tests/build.test.ts
git commit -m "feat: give marketing routes distinct editorial rhythms"
```

### Task 7: Redesign Contact and Fix Form Accessibility

**Files:**

- Modify: `src/pages/contact.astro`
- Modify: `src/components/EnquiryForm.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**

- Preserves: `buildMailto()` and `validateEnquiry()` behavior and all field names.
- Produces: programmatically described errors, `aria-invalid`, first-error focus, and two-column contact layout.

- [ ] **Step 1: Write failing field-error tests**

Extend the contact Playwright test:

```ts
const name = page.getByLabel('Name');
await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
await expect(name).toBeFocused();
await expect(name).toHaveAttribute('aria-invalid', 'true');
await expect(name).toHaveAttribute('aria-describedby', 'name-error');
await expect(page.locator('#name-error')).not.toBeEmpty();
```

Add a partial-validity case that fills Name, Email, Service, and Summary but leaves Consent unchecked. Submit and assert those completed controls have `aria-invalid="false"`, Consent has `aria-invalid="true"`, and focus moves to Consent. This exercises state clearing without invoking the valid `mailto:` navigation.

- [ ] **Step 2: Run the contact test and confirm failure**

Expected: FAIL because current errors have no IDs or ARIA connections and the first invalid field does not receive focus.

- [ ] **Step 3: Connect each control to its error**

Give each error `<small>` a stable ID such as `name-error`. Add `aria-describedby` to the corresponding input and let the submit handler set `aria-invalid` from `Boolean(errors[key])`.

```ts
const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
  'input:not([type="checkbox"]), select, textarea',
);
controls.forEach((control) =>
  control.setAttribute('aria-invalid', String(Boolean(errors[control.name]))),
);
const firstInvalid = [...controls].find((control) => Boolean(errors[control.name]));
firstInvalid?.focus();
```

Handle the consent checkbox with the same stable described-error relationship.

- [ ] **Step 4: Build the two-column briefing layout**

Place direct email, form behavior, and privacy reassurance in a `.contact-brief` aside; place EnquiryForm in a bordered `.contact-form-panel`. Use text, rules, and weight—not color alone—to show invalid fields.

- [ ] **Step 5: Run unit, Playwright, axe, and static checks**

```bash
npx --yes -p node@22.22.0 -c 'npm test && ./node_modules/.bin/playwright test tests/e2e/site.spec.ts && npm run lint && npm run typecheck'
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/pages/contact.astro src/components/EnquiryForm.astro src/styles/global.css tests/e2e/site.spec.ts
git commit -m "fix: make contact briefing accessible and precise"
```

### Task 8: Add Legal Reading Rails and Finish Utility Routes

**Files:**

- Modify: `src/layouts/LegalLayout.astro`
- Modify: `src/pages/support.astro`
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/terms.astro`
- Modify: `src/pages/data-deletion.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/pages/products/[slug]/index.astro`
- Modify: `src/pages/products/[slug]/privacy.astro`
- Modify: `src/pages/products/[slug]/data-deletion.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/build.test.ts`
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**

- Extends `LegalLayout` props with `sections?: readonly { id: string; label: string }[]`.
- Preserves existing `title`, `description`, `path`, `updated`, and default-slot behavior.

- [ ] **Step 1: Write failing legal-navigation and utility-action tests**

Assert Privacy has a navigation landmark named `On this page`, links to `#scope`, `#game-data`, `#sharing-retention`, `#choices`, and `#contact`, and keeps AdMob/Crashlytics text. In Playwright, visit 404 and assert both actions have visible text and at least AA contrast through axe. Assert Support and Data Deletion name Neon Bubble Galaxy.

- [ ] **Step 2: Run focused tests and confirm failures**

Expected: FAIL because there is no contents rail, current headings lack IDs, and utility button variants are not surface-aware.

- [ ] **Step 3: Implement the optional LegalLayout rail**

```astro
<div class="legal-grid shell">
  {
    sections?.length ? (
      <aside class="legal-rail">
        <nav aria-label="On this page">
          <ol>
            {sections.map(({ id, label }) => (
              <li>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    ) : null
  }
  <article class="prose"><slot /></article>
</div>
```

At wide widths, make the rail sticky below the 68-pixel header; at narrow widths, render it as a normal horizontal/stacked list before the article.

- [ ] **Step 4: Add stable section IDs and arrays**

Define literal section arrays in each legal page and give every linked `<h2>` the matching ID. Privacy's array must use the IDs from Step 1. Replace `var(--border)` in the app card with `var(--line-dark)`.

- [ ] **Step 5: Correct utility action variants**

Define `.button-dark`, `.button-light`, and `.button-outline` with explicit surface contrast. Update 404 and the strict generated product template so outlined actions on light heroes use Midnight text and border; do not change template data interfaces.

- [ ] **Step 6: Run tests and commit**

```bash
npx --yes -p node@22.22.0 -c 'npm run format:check && npm run lint && npm run typecheck && npm test && npm run build && npm run verify:build && ./node_modules/.bin/playwright test'
git add src/layouts/LegalLayout.astro src/pages/support.astro src/pages/privacy.astro src/pages/terms.astro src/pages/data-deletion.astro src/pages/404.astro src/pages/products/'[slug]'/index.astro src/pages/products/'[slug]'/privacy.astro src/pages/products/'[slug]'/data-deletion.astro src/styles/global.css tests/build.test.ts tests/e2e/site.spec.ts
git commit -m "feat: finish technical legal and utility layouts"
```

### Task 9: Add Responsive, Reduced-Motion, and Visual Review Coverage

**Files:**

- Create: `scripts/capture-visuals.mjs`
- Modify: `tests/e2e/site.spec.ts`
- Modify: `src/styles/global.css`
- Modify: `.gitignore` if `artifacts/` is not already ignored.

**Interfaces:**

- Produces: `node scripts/capture-visuals.mjs http://127.0.0.1:4321/us5/` and screenshots under ignored `artifacts/visual-review/`.

- [ ] **Step 1: Write failing overflow and reduced-motion tests**

```ts
test('key routes do not overflow at 320 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of ['./', './products/', './contact/', './privacy/']) {
    await page.goto(route);
    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  }
});

test('reduced motion exposes final content without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('.mark-trace')).toHaveCSS('animation-name', 'none');
  await expect(page.getByRole('heading', { name: 'Neon Bubble Galaxy' })).toBeVisible();
});
```

- [ ] **Step 2: Run Playwright and confirm any responsive/motion gaps**

Expected: the reduced-motion selector test fails until the final class and CSS contract are present; fix any measured overflow at its originating component.

- [ ] **Step 3: Expand axe coverage**

Run axe on Home, Products, Neon Bubble Galaxy, Services, Contact, Privacy, and the open mobile menu. Continue failing only serious and critical violations, while manually reviewing all moderate color-contrast findings.

- [ ] **Step 4: Create the deterministic screenshot script**

Use this complete script:

```js
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const baseURL = process.argv[2] ?? 'http://127.0.0.1:4321/us5/';
const widths = [320, 390, 800, 1440];
const routes = [
  ['home', ''],
  ['products', 'products/'],
  ['contact', 'contact/'],
  ['privacy', 'privacy/'],
];
const output = 'artifacts/visual-review';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of widths) {
  await page.setViewportSize({ width, height: 1000 });
  for (const [name, route] of routes) {
    await page.goto(new URL(route, baseURL).toString(), { waitUntil: 'networkidle' });
    await page.screenshot({ path: join(output, `${name}-${width}.png`), fullPage: true });
  }
}
await browser.close();
```

- [ ] **Step 5: Run responsive tests and capture screenshots**

```bash
npx --yes -p node@22.22.0 -c './node_modules/.bin/playwright test'
npx --yes -p node@22.22.0 -c 'node scripts/capture-visuals.mjs http://127.0.0.1:4321/us5/'
```

Inspect all 16 images for clipping, awkward wrapping, excessive empty space, unreadable text, broken sticky elements, and layout shifts. Fix the responsible CSS rule, then rerun the affected width and the full Playwright suite.

- [ ] **Step 6: Commit**

```bash
git add scripts/capture-visuals.mjs tests/e2e/site.spec.ts src/styles/global.css .gitignore
git commit -m "test: cover responsive technical-luxury layouts"
```

### Task 10: Final Verification, Documentation, and Deployment

**Files:**

- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-08-28-us5-corporate-website-design.md`
- Modify: any file required by a verified final defect.

**Interfaces:**

- Consumes: all prior tasks.
- Produces: documented, tested, deployed production site at `https://us5inc.github.io/us5/`.

- [ ] **Step 1: Update the original design document's status**

Add a notice at its top that the visual system and initial product-status sections are superseded by `2026-08-29-us5-technical-luxury-redesign.md`. Do not rewrite its historical requirements.

- [ ] **Step 2: Complete README maintenance guidance**

Document the monochrome website palette, full-color product-art exception, featured-product configuration, dedicated product route, unchanged strict schema workflow, Node floor, checks, base path, app-ads root/mirror URLs, and deployment process.

- [ ] **Step 3: Run the fresh full quality gate**

```bash
npx --yes -p node@22.22.0 -c 'npm run check'
npm audit --audit-level=high
git diff --check
```

Expected: formatting clean; ESLint clean; Astro 0 errors/warnings/hints; all Vitest tests pass; 12 pages build; generated links verify; all Playwright/axe tests pass; audit reports 0 high/critical vulnerabilities; diff check exits 0.

- [ ] **Step 4: Verify the production artifact directly**

Search `dist/_astro/*.css`, `dist/*.svg`, and generated HTML for forbidden color values and old product-status phrases. Confirm the favicon and social card use only the approved interface colors, the exact Pattern 1A path exists, `/products/neon-bubble-galaxy/` exists, and `dist/app-ads.txt` contains exactly:

```text
google.com, pub-9578601039790653, DIRECT, f08c47fec0942fa0
```

- [ ] **Step 5: Capture and inspect the final visual matrix**

Start the built preview, run `scripts/capture-visuals.mjs`, and inspect all 16 images. Record any defect as a failing Playwright or build test before fixing it. Rerun the full quality gate after the final change.

- [ ] **Step 6: Commit the final documentation or verification fixes**

```bash
git add README.md docs/superpowers/specs/2026-08-28-us5-corporate-website-design.md
git commit -m "docs: record technical-luxury website system"
```

- [ ] **Step 7: Review branch state and push**

```bash
git status --short
git log --oneline --decorate -12
git push origin main
```

Expected: clean worktree before push and `main -> main` success.

- [ ] **Step 8: Watch the GitHub Pages deployment**

```bash
gh run list --repo us5inc/us5 --workflow 'Deploy to GitHub Pages' --limit 3
US5_RUN_ID=$(gh run list --repo us5inc/us5 --workflow 'Deploy to GitHub Pages' --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$US5_RUN_ID" --repo us5inc/us5 --exit-status
```

Expected: build and deploy jobs both complete successfully for the latest pushed commit.

- [ ] **Step 9: Verify live production URLs**

Use cache-busting query parameters and require HTTP 200 for Home, Products, Neon Bubble Galaxy, Services, Contact, Privacy, Support, Data Deletion, favicon, social card, and `/us5/app-ads.txt`. Confirm all live HTML titles are exactly `US5 Inc.`, product/privacy text is present, forbidden colors are absent from interface assets, and the product icon hash matches the repository asset.

- [ ] **Step 10: Report delivery evidence**

Provide the live Home, Products, product, and Privacy links; final commit; successful workflow URL; test counts; accessibility result; audit result; and a note that a Google Play button remains intentionally absent until a verified listing URL is supplied.
