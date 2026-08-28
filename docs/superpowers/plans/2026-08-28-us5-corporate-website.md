# US5 Incorporation Corporate Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and deploy the production-ready static corporate website for US5 Incorporation at `https://usfiveincorporation.github.io/us5/`.

**Architecture:** Astro statically generates base-aware pages from focused layouts, components, and validated configuration. HTML and CSS provide the core experience; small standalone browser scripts enhance navigation and the email enquiry form without creating a backend or false submission state.

**Tech Stack:** Astro, strict TypeScript, Zod, ESLint, Prettier, Vitest, Playwright, axe-core, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-28-us5-corporate-website-design.md`

## Global Constraints

- Public name is `US5 Incorporation`; contact email is `usfiveincorporation@gmail.com`.
- Production origin is `https://usfiveincorporation.github.io`; default base path is `/us5`.
- Do not publish products, product claims, product policies, company statistics, addresses, phone numbers, social profiles, client claims, certifications, analytics, advertising, cookies, or `app-ads.txt` without verified configuration.
- All pages are static and work from 320-pixel viewports upward with semantic HTML, keyboard navigation, visible focus states, WCAG AA contrast, and reduced-motion support.
- Internal links and assets must use base-aware URL helpers.
- No backend exists; the enquiry form validates locally and opens an email draft.
- Product policies must be checked against actual SDKs and Google Play Data Safety declarations before publication.

---

### Task 1: Project foundation and base-aware URL configuration

**Files:**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.js`
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `.gitignore`
- Create: `src/env.d.ts`
- Create: `src/config/site.ts`
- Create: `src/lib/urls.ts`
- Test: `src/lib/urls.test.ts`

**Interfaces:**

- Produces: `siteConfig`, `type SiteConfig`, `withBase(path: string): string`, and `absoluteUrl(path: string): string`.
- Produces scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `format:check`, `test`, and `test:e2e`.

- [ ] **Step 1: Scaffold dependencies and strict configuration**

Create Astro configuration that reads `PUBLIC_SITE_BASE`, normalizes it to `/` or a slash-delimited segment, defaults to `/us5`, and sets `site: "https://usfiveincorporation.github.io"`. Configure `strictest` Astro TypeScript, ESLint for TypeScript/Astro, Prettier with the Astro plugin, Vitest, Playwright, and axe-core. Generate and retain the npm lockfile.

- [ ] **Step 2: Write the failing URL tests**

```ts
import { describe, expect, it } from 'vitest';
import { absoluteUrl, withBase } from './urls';

describe('site URLs', () => {
  it('prefixes internal paths with the configured project base', () => {
    expect(withBase('/services/')).toBe('/us5/services/');
    expect(withBase('/')).toBe('/us5/');
  });

  it('creates canonical production URLs', () => {
    expect(absoluteUrl('/privacy/')).toBe('https://usfiveincorporation.github.io/us5/privacy/');
  });
});
```

- [ ] **Step 3: Run the focused test and confirm failure**

Run: `npm test -- src/lib/urls.test.ts`

Expected: FAIL because `src/lib/urls.ts` does not exist.

- [ ] **Step 4: Implement site configuration and URL helpers**

```ts
export const siteConfig = {
  name: 'US5 Incorporation',
  email: 'usfiveincorporation@gmail.com',
  origin: 'https://usfiveincorporation.github.io',
  base: import.meta.env.PUBLIC_SITE_BASE || '/us5',
} as const;

export function withBase(path: string): string {
  const base = siteConfig.base === '/' ? '' : `/${siteConfig.base.replace(/^\/+|\/+$/g, '')}`;
  const suffix = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${base}${suffix}`;
}

export function absoluteUrl(path: string): string {
  return new URL(withBase(path), siteConfig.origin).toString();
}
```

- [ ] **Step 5: Verify and commit the foundation**

Run: `npm test -- src/lib/urls.test.ts && npm run typecheck && npm run lint && npm run format:check`

Expected: all commands exit 0.

```bash
git add package.json package-lock.json astro.config.ts tsconfig.json eslint.config.js .prettierrc.json .prettierignore .gitignore src/env.d.ts src/config/site.ts src/lib/urls.ts src/lib/urls.test.ts
git commit -m "build: establish Astro project foundation"
```

### Task 2: Brand assets, global styles, metadata, and site shell

**Files:**

- Create: `public/favicon.svg`
- Create: `public/icon-192.svg`
- Create: `public/icon-512.svg`
- Create: `public/social-card.svg`
- Create: `src/assets/logo.svg`
- Create: `src/styles/global.css`
- Create: `src/components/Logo.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/Seo.astro`
- Create: `src/layouts/BaseLayout.astro`
- Test: `src/components/site-shell.test.ts`

**Interfaces:**

- Consumes: `siteConfig`, `withBase`, and `absoluteUrl` from Task 1.
- Produces: `BaseLayout` props `{ title: string; description: string; image?: string; noindex?: boolean; structuredData?: Record<string, unknown> }`.

- [ ] **Step 1: Write failing static shell tests**

Create tests that render `BaseLayout` and assert a skip link, unique title, canonical URL, description, Open Graph and Twitter tags, Organization JSON-LD, header navigation, email footer link, and base-prefixed assets. Assert that header navigation excludes Products when the product list is empty.

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `npm test -- src/components/site-shell.test.ts`

Expected: FAIL because the layout and components do not exist.

- [ ] **Step 3: Create original SVG identity and responsive design tokens**

Build a geometric `US5` mark from original SVG paths and pair it with the company wordmark. Define color, spacing, typography, radius, shadow, and layout tokens in `global.css`; include AA-contrast foregrounds, `:focus-visible`, 320-pixel safeguards, and `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 4: Implement the shell and progressive mobile navigation**

Use semantic header/nav/main/footer landmarks. Render navigation links as normal anchors, provide an accessible menu button below the desktop breakpoint, synchronize `aria-expanded`, close on Escape and link activation, and leave navigation usable when JavaScript is unavailable.

- [ ] **Step 5: Implement metadata and structured data**

`Seo.astro` must produce canonical, Open Graph, and Twitter card metadata from absolute URLs. Emit Organization JSON-LD containing only the confirmed name, URL, logo, industry description, and email; omit postal address, telephone, founding date, and social profiles.

- [ ] **Step 6: Verify and commit the site shell**

Run: `npm test -- src/components/site-shell.test.ts && npm run typecheck && npm run lint && npm run format:check`

Expected: all commands exit 0.

```bash
git add public src/assets src/styles src/components src/layouts
git commit -m "feat: add US5 brand and accessible site shell"
```

### Task 3: Corporate content pages and reusable sections

**Files:**

- Create: `src/config/navigation.ts`
- Create: `src/config/services.ts`
- Create: `src/components/Hero.astro`
- Create: `src/components/SectionHeading.astro`
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/ProcessSteps.astro`
- Create: `src/components/CallToAction.astro`
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/services.astro`
- Create: `src/pages/digital-solutions.astro`
- Test: `src/pages/corporate-pages.test.ts`

**Interfaces:**

- Consumes: `BaseLayout`, `withBase`, and `siteConfig`.
- Produces: static routes `/`, `/about/`, `/services/`, and `/digital-solutions/`.

- [ ] **Step 1: Write failing page-content tests**

Assert each route renders one `h1`, unique metadata, working calls to action, and no banned claims. Assert the home page contains “Games that entertain. Digital solutions that perform.” and business-outcome descriptions for games, applications, digital solutions, quality, and maintenance.

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- src/pages/corporate-pages.test.ts`

Expected: FAIL because the pages do not exist.

- [ ] **Step 3: Implement reusable content components and configuration**

Represent the seven approved service categories as typed configuration. Components accept plain content and links, use semantic lists and sections, and contain no route-specific business logic.

- [ ] **Step 4: Build the four corporate pages**

Write concise, factual copy covering capability, process, usability, performance, testing, responsible development, workflow solutions, API integrations, cloud-connected systems, consulting, and modernization. Do not name specific platforms, engines, clients, metrics, or certifications beyond Android and cross-platform development already approved in the brief.

- [ ] **Step 5: Verify and commit the corporate pages**

Run: `npm test -- src/pages/corporate-pages.test.ts && npm run build`

Expected: tests pass and Astro reports four generated corporate routes.

```bash
git add src/config/navigation.ts src/config/services.ts src/components src/pages/index.astro src/pages/about.astro src/pages/services.astro src/pages/digital-solutions.astro
git commit -m "feat: add corporate capability pages"
```

### Task 4: Contact, support, and legal experience

**Files:**

- Create: `src/lib/enquiry.ts`
- Create: `src/lib/enquiry.test.ts`
- Create: `src/components/EnquiryForm.astro`
- Create: `src/layouts/LegalLayout.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/support.astro`
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`
- Create: `src/pages/data-deletion.astro`
- Test: `src/pages/legal-pages.test.ts`

**Interfaces:**

- Produces: `type Enquiry`, `validateEnquiry(value: FormData): Record<string, string>`, and `buildMailto(enquiry: Enquiry): string`.
- Produces routes `/contact/`, `/support/`, `/privacy/`, `/terms/`, and `/data-deletion/`.

- [ ] **Step 1: Write failing enquiry unit tests**

```ts
it('rejects missing required fields and invalid email', () => {
  const data = new FormData();
  data.set('email', 'invalid');
  expect(validateEnquiry(data)).toMatchObject({
    name: expect.any(String),
    email: expect.any(String),
    summary: expect.any(String),
    consent: expect.any(String),
  });
});

it('builds an encoded email draft without claiming delivery', () => {
  expect(buildMailto(validEnquiry)).toContain('mailto:usfiveincorporation%40gmail.com');
  expect(buildMailto(validEnquiry)).toContain('subject=Project%20enquiry');
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- src/lib/enquiry.test.ts`

Expected: FAIL because `src/lib/enquiry.ts` does not exist.

- [ ] **Step 3: Implement validation and email draft construction**

Validate trimmed name, syntactically valid email, selected service, 20–3000 character summary, and checked consent. Construct the mail body from encoded fields, including the optional company name. Never return or display a stored/sent status.

- [ ] **Step 4: Build the progressively enhanced contact and support pages**

Use labelled controls, inline field errors, an `aria-live` summary, preserved values, explanatory text stating that submission opens the visitor’s email application, and a direct email link outside the form. The non-JavaScript fallback uses a visible `mailto:` action.

- [ ] **Step 5: Write and test accurate legal pages**

State that the website intentionally uses no accounts, analytics, advertising, non-essential cookies, or backend form storage. Explain email correspondence, GitHub Pages infrastructure processing, security limitations, user requests, policy changes, and the confirmed contact channel without inventing jurisdiction, registration, or product behavior.

- [ ] **Step 6: Verify and commit contact and legal pages**

Run: `npm test -- src/lib/enquiry.test.ts src/pages/legal-pages.test.ts && npm run build`

Expected: tests pass and all five routes appear in `dist/us5/` or the Astro base-aware output.

```bash
git add src/lib/enquiry.ts src/lib/enquiry.test.ts src/components/EnquiryForm.astro src/layouts/LegalLayout.astro src/pages/contact.astro src/pages/support.astro src/pages/privacy.astro src/pages/terms.astro src/pages/data-deletion.astro src/pages/legal-pages.test.ts
git commit -m "feat: add enquiry, support, and legal pages"
```

### Task 5: Validated future product and privacy-policy system

**Files:**

- Create: `src/config/product-schema.ts`
- Create: `src/config/products.ts`
- Create: `src/config/product-schema.test.ts`
- Create: `src/components/ProductCard.astro`
- Create: `src/components/PrivacySection.astro`
- Create: `src/pages/products/index.astro`
- Create: `src/pages/products/[slug]/index.astro`
- Create: `src/pages/products/[slug]/privacy.astro`
- Create: `src/pages/products/[slug]/data-deletion.astro`
- Test: `src/pages/product-routes.test.ts`

**Interfaces:**

- Produces: Zod `productSchema`, inferred `Product` type, and `products: readonly Product[]`, initially `[]`.
- Product fields cover identity, package, dates, contacts, description, category, verified features, media, Play URL, audience, direct collection, SDK processing, sharing, advertising, analytics, crash reporting, purchases, accounts, location, device identifiers, retention, security, rights, deletion, and provider-policy links.

- [ ] **Step 1: Write failing schema tests**

Test that an empty list is valid; a complete fixture produces `/products/sample/privacy/`; duplicate slugs fail; invalid Play URLs fail; missing package, dates, contact, retention, security, or deletion content fails; and enabled SDK flags require a purpose plus official provider-policy URLs.

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- src/config/product-schema.test.ts`

Expected: FAIL because the schema does not exist.

- [ ] **Step 3: Implement discriminated, strict product validation**

Use Zod strict objects and enums to distinguish `directCollection`, `sdkProcessing`, and `sharedData`. Require explicit booleans for children, advertising, analytics, crash reporting, purchases, accounts, location, and device identifiers; do not infer “no data collected” from absence.

- [ ] **Step 4: Implement conditional static route generation**

Each dynamic route exports `getStaticPaths()` derived only from validated `products`. The products index exists in the build but redirects or presents an honest no-products message and is excluded from primary navigation while the list is empty. Product pages emit accurate SoftwareApplication JSON-LD without ratings or prices. Privacy pages render all 15 required headings from verified configuration.

- [ ] **Step 5: Add source-level privacy review warning**

Place a prominent comment above `products` and a README section stating: “Before publishing, review every product policy against the app’s actual SDKs and Google Play Data Safety declaration.” This warning belongs in repository documentation, not as unfinished public page copy.

- [ ] **Step 6: Verify and commit the product system**

Run: `npm test -- src/config/product-schema.test.ts src/pages/product-routes.test.ts && npm run build`

Expected: schema tests pass, no product detail routes are emitted for the empty list, and no fabricated product appears in generated HTML.

```bash
git add src/config/product-schema.ts src/config/products.ts src/config/product-schema.test.ts src/components/ProductCard.astro src/components/PrivacySection.astro src/pages/products src/pages/product-routes.test.ts
git commit -m "feat: add validated product privacy system"
```

### Task 6: Static discovery files, 404 behavior, and end-to-end quality checks

**Files:**

- Create: `src/pages/robots.txt.ts`
- Create: `src/pages/404.astro`
- Create: `src/pages/manifest.webmanifest.ts`
- Create: `scripts/verify-build.mjs`
- Create: `playwright.config.ts`
- Create: `tests/e2e/site.spec.ts`
- Modify: `package.json`

**Interfaces:**

- Produces scripts `verify:build` and `check` where `check` runs formatting, lint, typecheck, unit tests, build verification, and end-to-end tests.

- [ ] **Step 1: Write the failing build verifier**

Make `verify-build.mjs` recursively inspect `dist`, parse local HTML links, and fail on missing local targets, root-incorrect `/assets` links, unresolved template markers, malformed canonical URLs, absent privacy/legal routes, or secrets matching private-key headers. It must confirm that sitemap and robots references use `https://usfiveincorporation.github.io/us5/`.

- [ ] **Step 2: Run verification and confirm failure**

Run: `npm run build && node scripts/verify-build.mjs`

Expected: FAIL until discovery files and the custom 404 page are present.

- [ ] **Step 3: Implement discovery files and 404 page**

Generate a base-aware robots file and manifest, enable Astro sitemap integration, and create a helpful 404 page with links to Home, Services, Contact, and Support. Include favicon and web app icon declarations in the layout.

- [ ] **Step 4: Write browser tests for navigation, forms, responsiveness, and accessibility**

Use Playwright at desktop and 320×700 viewports. Test every primary/footer link, direct loading of each route, mobile menu keyboard behavior, invalid and valid enquiry behavior, JavaScript-disabled navigation/contact fallback, absence of horizontal overflow, console errors, and axe violations at serious or critical impact.

- [ ] **Step 5: Run the complete local quality gate**

Run: `npm run check`

Expected: formatting, lint, typecheck, unit tests, production build, build verification, Playwright, and accessibility checks all exit 0.

- [ ] **Step 6: Commit quality tooling**

```bash
git add src/pages/robots.txt.ts src/pages/404.astro src/pages/manifest.webmanifest.ts scripts/verify-build.mjs playwright.config.ts tests/e2e/site.spec.ts package.json package-lock.json astro.config.ts
git commit -m "test: verify static site quality and accessibility"
```

### Task 7: GitHub Pages automation and maintainer documentation

**Files:**

- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Modify: `docs/superpowers/specs/2026-08-28-us5-corporate-website-design.md` only if implementation reveals an approved clarification
- Test: `.github/workflows/deploy.yml` via action syntax inspection and GitHub run

**Interfaces:**

- Consumes: `npm ci` and `npm run check` from Tasks 1 and 6.
- Produces: a Pages deployment from `main` and complete maintainer instructions.

- [ ] **Step 1: Add the least-privilege deployment workflow**

Configure triggers for pushes to `main` and manual dispatch. Set `contents: read`, `pages: write`, and `id-token: write`; use concurrency group `pages`; run `actions/checkout`, `actions/setup-node` with npm cache, `npm ci`, Playwright browser installation, `npm run check`, `actions/configure-pages`, `actions/upload-pages-artifact` with `dist`, and `actions/deploy-pages`, pinned to current stable major versions.

- [ ] **Step 2: Document setup, maintenance, and legal review**

README must include prerequisites, `npm ci`, development/build/check commands, `PUBLIC_SITE_BASE=/` for a user-site repository or custom domain, the default `/us5`, enabling Pages with “GitHub Actions”, custom-domain steps, the exact future-product fields, policy route format, privacy/Data Safety reconciliation warning, contact-form behavior, and why cookie controls and `app-ads.txt` are absent.

- [ ] **Step 3: Verify repository contents and workflow syntax**

Run: `npm run check && git diff --check && rg -n 'BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|AKIA[0-9A-Z]{16}' . --glob '!node_modules/**' --glob '!dist/**'`

Expected: quality gate exits 0, diff check is clean, and secret scan returns no matches.

- [ ] **Step 4: Commit and push the completed implementation**

```bash
git add .github/workflows/deploy.yml README.md
git commit -m "ci: deploy verified site to GitHub Pages"
git push -u origin main
```

Expected: push succeeds to `https://github.com/usfiveincorporation/us5.git`.

- [ ] **Step 5: Enable and verify GitHub Pages**

In repository Settings → Pages, set Source to “GitHub Actions” if it is not already selected. Inspect the Actions run until deployment succeeds, then load `https://usfiveincorporation.github.io/us5/`, the legal URLs, navigation, mobile menu, and email enquiry flow. Do not report deployment success if the URL is unreachable or the workflow failed.

- [ ] **Step 6: Record final evidence**

Report the commit SHA, quality commands and results, workflow run URL, live site URL, verified legal URLs, the fact that no product privacy URLs exist yet, and the exact configuration path used to add the first product.
