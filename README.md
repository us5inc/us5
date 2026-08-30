# US5 Incorporation website

Production corporate website for US5 Incorporation, built with Astro and strict TypeScript for GitHub Pages.

## Brand identity

The site uses the approved Pattern 1A “One stroke, three characters” identity. The monogram is constructed on a 120 × 120 grid with the path `M64 26 H34 V60 A26 26 0 0 0 86 60 V42`, a 14-unit stroke, and round caps and joins. Keep clear space around the mark equal to its stroke width.

The website application palette is Midnight `#0A0E1A`, Paper `#F4F5F7`, and White `#FFFFFF` only. The full-color Neon Bubble Galaxy icon is the sole product-art exception. The master Pattern 1A brand source still records the broader corporate palette outside this web application. Space Grotesk is used for the wordmark and headings, IBM Plex Sans for body and interface copy, and IBM Plex Mono for labels and technical details; all font files are self-hosted through the locked Fontsource packages.

## Local development

Use Node.js 22.22.3 or newer.

```bash
npm ci
npm run dev
npm run check
npm audit --audit-level=high
```

`npm run check` runs Prettier, ESLint, strict Astro checking, Vitest, the production build, generated-link verification, and Playwright/axe browser tests. The individual checks are available as `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run verify:build`, and `npm run test:e2e`.

`npm run build` writes the static site to `dist`. The default production base is `/us5/`. To build for a user-site repository or a configured custom domain, use `PUBLIC_SITE_BASE=/ npm run build`.

## Deployment

The workflow in `.github/workflows/deploy.yml` checks and deploys pushes to `main`. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the source. The production address is `https://us5inc.github.io/us5/`.

For a custom domain, add the domain in **Settings → Pages**, configure the DNS records GitHub provides, add a `public/CNAME` file containing only that domain, and set `PUBLIC_SITE_BASE` to `/` in the workflow.

## Featured product

`src/config/featured-product.ts` contains the verified public information used to feature Neon Bubble Galaxy on the website. Its dedicated route is `/products/neon-bubble-galaxy/`, with privacy, support, and data-deletion links supplied by the same configuration. There is no verified Google Play listing URL, so the website intentionally renders no Google Play button.

## Adding a future store product

The separate strict `Product` schema workflow remains unchanged for a future complete, verified store record. Add a validated entry to `src/config/products.ts`. The schema requires the real product name, slug, description, category, package name, Google Play URL, support email, dates, verified features, audience, direct collection, SDK processing, sharing, advertising, analytics, crash reporting, purchases, accounts, location, device identifiers, retention, security, rights, deletion process, and third-party provider links.

The build then creates:

- `/products/<slug>/`
- `/products/<slug>/privacy/`
- `/products/<slug>/data-deletion/`

Before publishing, review every product policy against the app’s actual SDKs and Google Play Data Safety declaration. Do not describe an app as collecting no data unless that has been explicitly verified.

## Website behavior

The contact form opens a prepared message in the visitor’s email application; this static site does not store or claim to send it. The site intentionally uses no analytics, advertising, accounts, or non-essential cookies, so it has no cookie banner. The authorized AdMob seller record is maintained at the crawler-required hostname root, `https://us5inc.github.io/app-ads.txt`, and mirrored at `https://us5inc.github.io/us5/app-ads.txt` for convenience.
