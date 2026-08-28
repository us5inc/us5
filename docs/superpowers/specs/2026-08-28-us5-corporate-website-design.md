# US5 Incorporation Corporate Website Design

## Purpose

Build a credible, fast corporate website for US5 Incorporation that presents its mobile-game, application-development, and digital-solution capabilities. The initial launch will not advertise unpublished products or make claims that cannot be verified. It will provide a structured path for adding future Google Play products and permanent privacy-policy URLs.

## Confirmed information

- Public name: US5 Incorporation
- Contact email: `usfiveincorporation@gmail.com`
- GitHub repository: `us5inc/us5`
- Production URL: `https://us5inc.github.io/us5/`
- No Android product is currently published.
- No phone number, street address, location, LinkedIn profile, form service, analytics service, advertising identifier, client list, certification, or company statistic has been supplied.

Unsupplied information will be omitted from the public website. It will not be represented by placeholder text.

## Scope

The initial release includes:

- Home
- About
- Services
- Digital Solutions
- Contact
- Support
- Website Privacy Policy
- Terms of Use
- Data Deletion Instructions
- Custom 404 page
- Reusable site shell, navigation, footer, calls to action, service cards, and metadata components
- Central company and product configuration
- Future-ready product detail and product privacy-policy route generation
- Sitemap, robots file, canonical metadata, Open Graph metadata, favicon, web app icons, and structured organization data
- Automated checks and GitHub Pages deployment workflow
- Setup, content maintenance, product onboarding, privacy review, and deployment documentation

The initial release excludes public product cards and product-specific privacy policies because no real product details or verified data practices exist. Product navigation will appear only when at least one valid product is configured. Cookie controls and a cookie notice are excluded because the site will not set cookies or load non-essential tracking.

## Brand and experience

The visual identity uses the approved Pattern 1A “One stroke, three characters” system. Its continuous-stroke monogram uses the exact path `M64 26 H34 V60 A26 26 0 0 0 86 60 V42` on a 120 × 120 grid, with a 14-unit stroke and round caps and joins. Horizontal navigation and footer lockups pair the monogram with the US5 wordmark and INCORPORATION descriptor while preserving clear space equal to the monogram stroke width.

The website uses a mostly light application: White navigation and primary surfaces, Paper alternate sections, and Midnight hero, call-to-action, and footer areas. Signal Violet and Circuit Cyan provide controlled digital accents; their 135-degree gradient is limited to digital hero and icon applications. Space Grotesk is used for headings and wordmarks, IBM Plex Sans for body and interface copy, and IBM Plex Mono for labels and technical details. Optimized font files are self-hosted.

Layouts will be compact on mobile, spacious on larger screens, and usable from 320-pixel viewports upward. Decorative construction grids, continuous paths, restrained gradients, and small interface details will provide energy without heavy glow or distracting animation. Motion will be limited to progressive hover effects and disabled when reduced motion is requested.

Copy will remain concise and factual. It may describe broad capabilities and business outcomes but will not assert a founding date, team size, named technology partnership, client, award, certification, product performance figure, or product feature.

## Information architecture

The home page will introduce the positioning “Games that entertain. Digital solutions that perform.” and direct visitors toward services and enquiries. It will summarize game development, application development, digital solutions, delivery capabilities, and the company’s responsible product approach. Until real products exist, it will not contain a featured-products section disguised as live inventory.

The About page will explain the company’s focus and its design, development, testing, and delivery approach. The Services and Digital Solutions pages will explain business outcomes for the approved broad service categories. The Contact page will provide direct email access and a validated enquiry composer. Support and legal pages will use the confirmed email address as their contact channel.

## Architecture

Astro will statically generate all pages with strict TypeScript. Shared layouts and focused components will own presentation; configuration and content modules will own company and product data. The browser will receive JavaScript only for the mobile navigation and contact-form enhancement.

The central product model will validate the information required for a product page and policy. Adding a product will create its detail and privacy routes during the build. A product cannot be published from incomplete legal placeholders. Documentation will require maintainers to reconcile every policy with the app’s actual SDKs and Google Play Data Safety declaration.

The Astro `site` value will use the confirmed GitHub Pages origin. The `base` path will be controlled through a documented environment setting and default to `/us5`, while allowing `/` for a user-site repository or custom-domain deployment. All internal links and assets will be generated with base-aware utilities.

## Contact flow and failure behavior

The site has no backend and will not imply that it stores enquiries. The contact form will validate name, email, service, project summary, and consent in the browser. A valid submission will open a pre-addressed email draft to `usfiveincorporation@gmail.com`; the page will state this behavior before submission. Without JavaScript, visitors retain a direct email link and complete contact instructions.

Validation errors will be associated with their fields, announced accessibly, and preserve entered values. The interface will never show a false “message sent” state.

## Legal content

The website privacy policy will accurately state the behavior of the static site: no accounts, server-side form storage, advertising, analytics, or intentionally deployed cookies. It will distinguish ordinary infrastructure processing by GitHub Pages and the visitor’s email provider from collection by US5 Incorporation. Terms will be modest and will not invent jurisdiction-specific corporate registration claims.

Data deletion instructions will explain how to contact the company regarding website correspondence and future products. They will not promise deletion of data controlled by an unspecified third party. Product policy templates will cover direct collection, SDK processing, sharing purposes, retention, security, children, choices, deletion, international processing, changes, and contact details only when the corresponding verified configuration is present.

## Accessibility, performance, and SEO

Pages will use landmarks, a logical heading structure, labelled controls, descriptive links, visible focus states, a skip link, keyboard-operable navigation, WCAG AA contrast, and reduced-motion support. Decorative SVGs will be hidden from assistive technology; meaningful images will have useful alternatives and explicit dimensions.

Static HTML, local SVG assets, system fonts, minimal JavaScript, and stable layout dimensions will keep loading costs low. Each page will have unique titles and descriptions, canonical and social metadata, and appropriate structured data. Product `SoftwareApplication` data will be emitted only for configured real products, without ratings or prices.

## Verification

Automated checks will cover strict type checking, linting, formatting, a production build, generated-route and link validation, contact-form behavior, mobile navigation, and key accessibility rules where practical. Verification will scan for placeholders and secrets, inspect generated privacy URLs, validate the GitHub Actions workflow, and exercise the built site at the `/us5/` base path. The live deployment will be checked directly before it is reported as successful.

## Delivery

GitHub Actions will install from a lockfile, run the quality checks, build the static site, upload the Pages artifact, and deploy it using GitHub’s official Pages actions. Repository documentation will explain local commands, Pages configuration, the base-path setting, custom domains, product onboarding, and privacy review. The authorized AdMob seller record is published from the hostname-root repository `us5inc/us5inc.github.io` at `https://us5inc.github.io/app-ads.txt`.

Implementation is complete only after the production build and checks pass. Deployment is complete only after the workflow succeeds and `https://us5inc.github.io/us5/` is reachable and inspected.
