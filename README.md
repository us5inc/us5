# US5 Incorporation website

Production corporate website for US5 Incorporation, built with Astro and strict TypeScript for GitHub Pages.

## Brand identity

The site uses the approved Pattern 1A “One stroke, three characters” identity. The monogram is constructed on a 120 × 120 grid with the path `M64 26 H34 V60 A26 26 0 0 0 86 60 V42`, a 14-unit stroke, and round caps and joins. Keep clear space around the mark equal to its stroke width.

The palette is Midnight `#0A0E1A`, Signal Violet `#5B34E8`, Circuit Cyan `#22D3EE`, Paper `#F4F5F7`, and White. The violet-to-cyan gradient is for digital hero and icon applications only. Space Grotesk is used for the wordmark and headings, IBM Plex Sans for body and interface copy, and IBM Plex Mono for labels and technical details; all font files are self-hosted through the locked Fontsource packages.

## Local development

Use Node.js 22.22.3 or newer.

```bash
npm ci
npm run dev
npm run check
```

`npm run build` writes the static site to `dist`. The default production base is `/us5/`. To build for a user-site repository or a configured custom domain, use `PUBLIC_SITE_BASE=/ npm run build`.

## Deployment

The workflow in `.github/workflows/deploy.yml` checks and deploys pushes to `main`. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the source. The production address is `https://usfiveincorporation.github.io/us5/`.

For a custom domain, add the domain in **Settings → Pages**, configure the DNS records GitHub provides, add a `public/CNAME` file containing only that domain, and set `PUBLIC_SITE_BASE` to `/` in the workflow.

## Adding a product

Add a validated entry to `src/config/products.ts`. The schema requires the real product name, slug, description, category, package name, Google Play URL, support email, dates, verified features, audience, direct collection, SDK processing, sharing, advertising, analytics, crash reporting, purchases, accounts, location, device identifiers, retention, security, rights, deletion process, and third-party provider links.

The build then creates:

- `/products/<slug>/`
- `/products/<slug>/privacy/`
- `/products/<slug>/data-deletion/`

Before publishing, review every product policy against the app’s actual SDKs and Google Play Data Safety declaration. Do not describe an app as collecting no data unless that has been explicitly verified.

## Website behavior

The contact form opens a prepared message in the visitor’s email application; this static site does not store or claim to send it. The site intentionally uses no analytics, advertising, accounts, or non-essential cookies, so it has no cookie banner. `app-ads.txt` is absent because no authorized AdMob publisher entry has been supplied.
