# US5 Technical-Luxury Website Redesign

## Status and authority

This specification records the design approved on 29 August 2026. It supersedes the visual direction and product-status assumptions in `2026-08-28-us5-corporate-website-design.md`; all factual, legal, accessibility, architecture, routing, and deployment requirements from that document remain in force unless this document explicitly changes them.

The approved reference mood is the current Prime Intellect website: high-contrast technical composition, oversized typography, disciplined whitespace, modular figure labels, and precise diagrams. US5 will apply those principles without copying Prime Intellect's brand, layouts, graphics, copy, or motion.

## Objectives

The redesign must make US5 feel confident, modern, technically capable, and memorable while remaining factual and fast. It must replace the current startup-template rhythm of repeated centered heroes, three-column cards, and identical calls to action with a coherent editorial system that gives each route its own composition.

The experience must:

- express the Pattern 1A continuous-stroke identity throughout the layout rather than only inside a decorative hero square;
- present Neon Bubble Galaxy as a published US5 mobile game;
- communicate game, application, and digital-solution capabilities without invented clients, metrics, awards, testimonials, release facts, or product features;
- retain every public route, base-aware GitHub Pages URL, privacy disclosure, contact flow, app-ads file, and deployment workflow;
- remain useful and visually intentional from 320-pixel mobile screens through wide desktop displays.

## Visual language

### Palette

The public website uses only three interface colors:

- Midnight `#0A0E1A`
- Paper `#F4F5F7`
- White `#FFFFFF`

Signal Violet and Circuit Cyan are removed from the website, including gradients, decorative SVGs, focus treatments, buttons, text, borders, social artwork, and hover states. Supporting hierarchy may use Midnight or White at controlled opacity, which produces neutral tones without introducing another hue.

The Neon Bubble Galaxy icon is the only full-color exception because it is product artwork, not website chrome. The favicon remains a Midnight tile with the Paper Pattern 1A stroke.

### Typography

The approved self-hosted type system remains:

- Space Grotesk for display headlines, wordmarks, and large numerals;
- IBM Plex Sans for body and interface text;
- IBM Plex Mono for figure labels, indices, metadata, and technical annotations.

Headlines use large scale, tight tracking, and short line lengths. Body copy remains compact and readable rather than becoming tiny for aesthetic effect. Labels use uppercase sparingly and never replace clear headings.

### Geometry and surfaces

The system uses a strict twelve-column desktop grid, an eight-column tablet grid, and a four-column mobile grid. Fine one-pixel rules expose the layout structure. Pattern 1A's continuous path appears as a recurring connector, section divider, diagram trace, and focus motif.

Corners remain primarily square. Small radii are reserved for controls and the product icon; large generic rounded cards and floating shadows are removed. Depth comes from inversion, borders, whitespace, scale, and overlap. Paper and White form reading surfaces; Midnight forms the hero, selected feature bands, navigation overlays, and footer.

### Motion

Motion is quiet and technical:

- the home diagram may draw a single Pattern 1A path on first view;
- small rules may extend on hover or when a section enters the viewport;
- links and controls may invert or shift by at most two pixels;
- the mobile menu may reveal with a short opacity and transform transition.

No continuous background animation, cursor replacement, parallax, scroll hijacking, heavy canvas, glow, or ornamental loading screen is allowed. All motion must be disabled or reduced under `prefers-reduced-motion: reduce`. The information hierarchy must remain complete without JavaScript or animation.

## Shared shell

### Header

The header becomes a thin, high-contrast technical bar with the approved horizontal Pattern 1A lockup. Desktop navigation includes Products, Services, Digital Solutions, About, and Contact. The current route receives an accessible `aria-current="page"` state and a monochrome rule or inversion treatment.

The mobile navigation becomes a full-width Midnight panel with large numbered links and a clear close state. Escape closes the panel and restores focus to the menu trigger. All targets remain at least 44 pixels.

### Footer

The footer uses a structured grid with the lockup, concise positioning line, navigation, legal links, and email. Hover states remain Paper or White on Midnight and meet WCAG AA. Decorative figure labels may organize columns, but no unverified company details are added.

### Shared section components

The redesign introduces reusable structural components rather than route-specific styling fragments:

- a technical section header with figure number, label, title, and optional intro;
- a continuous-rule divider derived from Pattern 1A geometry;
- capability rows for indexed service information;
- a three-stage process rail for Define, Build, and Refine;
- a product feature module for Neon Bubble Galaxy;
- an editorial page hero with asymmetric title and metadata columns;
- a legal reading layout with an in-page section rail on wide screens;
- explicit dark, light, and outlined button/link variants.

Components remain static Astro by default. JavaScript is limited to navigation, contact validation, and the smallest progressive enhancement needed for one-time motion.

## Route designs

### Home

The home hero occupies most of the first viewport. A concise positioning statement sits on an asymmetric grid beside a monochrome Pattern 1A technical diagram. The diagram is integrated with the grid rather than enclosed in a floating square. Primary actions lead to Products and Contact.

The remainder of the home page follows this sequence:

1. a published-product feature for Neon Bubble Galaxy using the supplied icon, product name, mobile-game category, and internal product/privacy/support paths;
2. an indexed capability ledger replacing the six generic cards;
3. a large Define → Build → Refine process rail with factual deliverables and no performance claims;
4. a full-width Midnight contact strip.

Only one saturated image—the Neon Bubble Galaxy icon—appears in the experience. It should feel intentionally framed by the monochrome system.

### Products and Neon Bubble Galaxy

The Products route no longer says releases are in development. It presents Neon Bubble Galaxy as a published US5 mobile game.

A dedicated internal Neon Bubble Galaxy route will be added using only verified information: name, category, developer, icon, privacy behavior, support email, and links to privacy and data-deletion information. No Google Play button, package name, rating, download count, feature list, screenshot, release date, price, or audience claim is shown until supplied and verified. The existing strict product schema and generated product templates remain unchanged for a future complete store record; the curated public feature does not fabricate required schema fields.

Support and data-deletion copy must stop saying that US5 has no listed or published product. Privacy must retain the approved AdMob and Firebase Crashlytics disclosures and distinguish US5 direct handling from Google SDK processing.

### Services

Services use full-width indexed capability rows with alternating copy and concise scope statements. Static cards must not lift on hover or imply clickability. A single Midnight feature panel summarizes the end-to-end delivery path, followed by a contextual Contact action.

### Digital Solutions

Digital Solutions uses stacked system bands and a simple connection diagram to organize mobile applications, workflows, integrations, connected systems, and modernization. The content stays factual and avoids unsupported platform, security, scale, or outcome claims.

### About

About becomes a concise editorial manifesto. The page connects product intent, interface decisions, engineering, testing, privacy, and maintainability through the shared process rail. It does not invent a founding story, team biography, office, client list, or operating statistic.

### Contact

Contact becomes a two-column briefing interface: expectations and direct email on one side, the enquiry composer on the other. The form continues to open the visitor's email client and never implies server-side submission.

Validation errors use a high-contrast monochrome treatment, set `aria-invalid`, connect messages through `aria-describedby`, and focus the first invalid field. Error meaning is conveyed through text and structure, not color alone.

### Support and legal routes

Support distinguishes product help, website questions, and privacy requests. Legal pages use a narrower reading measure, visible update metadata, and a sticky in-page contents rail on sufficiently wide screens. The rail collapses naturally on small screens.

Privacy retains all approved statements about Neon Bubble Galaxy, AdMob, Firebase Crashlytics, the static website, correspondence, retention, choices, security, and contact. Design changes must not weaken or generalize those disclosures.

### 404

The 404 route uses a large technical error code, a short explanation, and visible dark/light navigation actions. It shares the monochrome system and never renders a white outlined button on a White or Paper surface.

## Content rules

Copy remains concise, specific, and claim-safe. It may describe:

- mobile game development;
- Android and cross-platform applications;
- interface and interaction design;
- workflows, integrations, modernization, testing, and support;
- the verified existence of Neon Bubble Galaxy and its approved privacy behavior.

It may not invent clients, partners, testimonials, awards, downloads, ratings, dates, team size, locations, proprietary technology, service guarantees, response times, product gameplay details, or commercial results.

Every browser tab remains exactly `US5 Inc.` as explicitly requested. Canonical URLs, descriptions, route-specific visible headings, Open Graph descriptions, and structured data remain accurate even though the title text is shared.

## Accessibility and responsive behavior

The implementation must preserve semantic landmarks, heading order, the skip link, visible focus, keyboard navigation, meaningful alternatives, and explicit image dimensions. It must additionally:

- restore menu-trigger focus after Escape closes the mobile navigation;
- expose the current navigation item with `aria-current`;
- make form errors programmatically associated and focus the first invalid input;
- maintain WCAG AA contrast in default, hover, focus, active, and error states;
- avoid hover-only information and hover effects on noninteractive content;
- prevent horizontal overflow at 320 pixels;
- keep legal text comfortable to read and controls at least 44 pixels;
- preserve content and layout stability with reduced motion enabled.

## Performance and compatibility

The site remains a static Astro build deployed beneath `/us5/` on GitHub Pages. Existing route paths, `withBase` behavior, canonical origin, sitemap, robots file, manifest, favicon path, social-card path, app-ads files, email flow, schemas, and workflow remain compatible.

The redesign adds no external runtime font, UI framework, animation library, analytics, cookie, or remote visual dependency. The full-color product icon remains local and dimensioned. Decorative graphics use inline/local SVG and CSS. JavaScript growth must be negligible.

## Verification and acceptance

Implementation is accepted only when all of the following are verified:

- formatting, ESLint, strict Astro checking, unit tests, production build, generated-link verification, Playwright, and dependency audit pass;
- every existing public route and every newly approved internal product route builds beneath `/us5/`;
- generated website assets and CSS contain no Signal Violet `#5B34E8`, Circuit Cyan `#22D3EE`, or violet/cyan gradient usage;
- the exact Pattern 1A SVG path remains present and the provisional logo remains absent;
- the favicon remains Midnight with a Paper monogram and the social card is monochrome;
- Neon Bubble Galaxy is visible as a published mobile game and no page says that US5 has no published/listed product;
- AdMob, Firebase Crashlytics, privacy contact, and app-ads disclosures remain intact;
- keyboard tests cover mobile-menu Escape/focus restoration and current-page state;
- form tests cover `aria-invalid`, described errors, first-invalid-field focus, and the unchanged email fallback;
- serious and critical axe violations are absent on Home, Products, Services, Contact, Privacy, and an open mobile menu;
- screenshots are captured and inspected at 320, 390, 800, and 1440 pixels for Home, Products, Contact, and Privacy;
- there is no horizontal overflow or unintended layout shift at tested widths;
- reduced-motion behavior is tested;
- the GitHub Pages workflow succeeds and live Home, Products, Privacy, Support, Data Deletion, favicon, social image, and app-ads URLs are verified.

## Delivery

Implementation will proceed from a written plan after this specification is approved. Work will preserve unrelated user changes, use test-first development for behavior and regression coverage, and finish with a reviewed commit on `main`, a successful push, and direct production verification.
