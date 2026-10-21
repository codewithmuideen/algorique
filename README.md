# Algorique Cleaners website

Marketing site and booking request flow for Algorique Cleaners.

**Stack:** React 18 + Vite 6, Tailwind CSS 4, Framer Motion, React Router, React Hook Form + Zod, Lucide and React Icons. Contact and booking emails go through Resend, sent from two Vercel Functions. There is no database, CMS, user account or stored submission.

## Run locally

```bash
npm install
cp .env.example .env      # optional: add real Resend values to send test emails
npm run dev               # http://localhost:5173
npm run build             # production build into dist/
npm run preview           # serve the production build
```

`npm run dev` also serves `/api/booking` and `/api/contact` through a small Vite middleware, so both forms work locally without the Vercel CLI. Without Resend variables, the forms show an honest "temporarily unavailable" error. They never report success unless the email was accepted for delivery.

## Email setup (Resend)

1. Create an account at [resend.com](https://resend.com).
2. **Domains → Add domain** with the business domain, then add the DNS records Resend shows (SPF, DKIM and optionally DMARC) at your DNS provider. Wait until the domain shows **Verified**.
3. **API Keys → Create** a key with "Sending access".
4. In Vercel, open **Project → Settings → Environment Variables** and add:

| Variable | Example | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_...` | Server-only API key |
| `BUSINESS_EMAIL` | `bookings@your-domain.co.uk` | Inbox that receives requests (comma separate several) |
| `VERIFIED_FROM_EMAIL` | `website@your-domain.co.uk` | Sender on the verified domain |
| `PUBLIC_SITE_URL` | `https://www.your-domain.co.uk` | Shown in notification emails |

These are server-side only. Never prefix them with `VITE_`, and never commit `.env`.

Each notification is a branded HTML email with a plain-text fallback. Its reply-to is set to the customer's validated address, so replying goes straight to them. Every value is HTML-escaped, and both endpoints validate with the same Zod schemas as the browser, reject non-POST and oversized requests, and silently drop bots that fill the hidden honeypot field.

## Deploy (Vercel)

1. Push the project to a Git repository and import it in Vercel. The framework preset is **Vite**.
2. Add the environment variables above, then deploy.
3. `vercel.json` already sets clean URLs (each route is a prebuilt HTML file, see SEO), security headers and long-term caching for images.
4. Submit a real booking request and a real contact message to confirm both arrive.

**Other hosts:** the `/api` files use the Vercel Node function signature `(req, res)`. For Netlify, move them to `netlify/functions/` and adapt them to the Netlify handler format.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, services carousel, how we work, why choose us, process, reviews |
| `/services` | Full service list (each service has an anchor, e.g. `/services#deep`) |
| `/about` | About, why choose us, gallery, areas covered |
| `/process` | How booking works, how we work, FAQs |
| `/reviews` | Reviews and gallery |
| `/contact` | Contact form, areas covered, FAQs |
| `/book` | Booking request wizard. `/book?service=deep` preselects a service |
| `/faq`, `/privacy`, `/terms`, `/cookies` | FAQs and legal pages |

The hero cut-out (`public/images/team/hero-cleaner-cutout.webp`) was made from the supplied clipboard photo with background removal. To use a different person, remove the background from a portrait photo and replace that file.

## Business details and what is still to fill in

Real details are set in `src/data/site.js`: phone and WhatsApp 020 8058 6268, info@algoriquecleaners.co.uk, www.algoriquecleaners.co.uk, coverage London and surrounding areas (London, Dartford and Bexley postcode districts power the checker), and the brand lines. Empty or `[bracketed]` fields are hidden automatically.

Still to complete before launch:

- **`whatsappNumber`** in `site.js` is set to 020 8058 6268 (442080586268). Make sure that number is registered on WhatsApp or WhatsApp Business. The "Scan to chat" QR code is generated from it automatically.
- **`hours`**, **`social`** links, and **`legalName` / `companyNumber`** if trading as a limited company.
- **Reviews** in `src/data/content.js`: three visibly labelled placeholders. Replace them with genuine reviews used with permission.
- **Gallery**: illustrative stock photography (labelled on the page). Replace it with real job photos. Add `before` to an item for a before/after slider.
- **Legal pages**: `[Date of publication]`, retention periods, hosting and email providers, payment terms, cancellation notice and complaint window. Have them reviewed before launch.
- **Resend** environment variables (see Email setup).

## SEO

- One source of truth: `src/data/seo.js` holds the title, description, heading and share image for every route, plus the structured data. It includes a LocalBusiness with contact details, areas served and services, plus WebSite, WebPage, BreadcrumbList, an ItemList of services on `/services`, and FAQPage on `/faq`. Placeholder values are never output.
- `seo-plugin.js` (a Vite plugin) writes a static HTML file per route at build time: `about.html`, `services.html` and so on. Each has its own title, description, canonical, Open Graph and Twitter tags, JSON-LD, and readable fallback content, so crawlers and link previews work without JavaScript. It also writes `404.html` (noindex), `sitemap.xml` and `robots.txt`.
- `src/components/layout/Seo.jsx` keeps the tags in step during in-app navigation.
- `vercel.json` uses clean URLs, so `/about` is served from `about.html` and unknown paths return a real 404.
- The canonical domain comes from `site.url`; override it at build time with `SITE_URL`.
- After launch: verify the domain in Google Search Console, submit `https://www.algoriquecleaners.co.uk/sitemap.xml`, and set up a Google Business Profile for Dartford, Bexley and London.

## Images

All image references live in `src/data/images.js`.

- `public/images/team/`: the business's own photos, renamed descriptively. Two had a generator watermark in the bottom-right corner, which was cropped out (`kitchen-floor-scrub.jpg`, `sofa-upholstery.jpg`).
- `public/images/`: Unsplash photography (free for commercial use), stored locally.

To swap a photo, drop the new file in `public/images/` and update its entry in `images.js` (path, alt text, width, height). Images 1600px wide or more work best for full-width sections.

## Brand

- **Logo:** a vector redraw of the Algorique house-and-leaf mark (`src/components/layout/BrandMark.jsx`) with the wordmark set in Nunito Black, the closest match to the original logo lettering. The header, footer and menu render it as SVG, so it stays sharp at every size. The original uploads are kept as `public/brand/algorique_*.png`.
- **Raster versions** rendered from the vector logo: `public/brand/logo-color.png`, `logo-white.png`, `mark-color.png`, `mark-white.png` and `social-avatar.png`, plus `favicon.png`, `apple-touch-icon.png`, `icon-512.png` and the 1200×630 `og-image.jpg` in `public/`.
- **Colours:** navy `#0B1F44`, royal blue `#0B4FB3`, leaf green `#6CC24A` (darker `#58AE36`), cool white `#F8FAFD` and light blue `#EBF2FB`. They are defined as tokens in `src/styles/index.css`.
- **Type:** Nunito (variable font, one file) throughout, self-hosted through Fontsource and preloaded, so no third party is contacted on page load.
- **Loading:** a branded splash screen (inline in `index.html`) shows the logo until the font, the first page's code and the home hero photo are ready, then fades out (`src/main.jsx`, never longer than 3.5 seconds). The crawler fallback text in each page's HTML is visually hidden.
- **Images:** photos are served as WebP in an 800px and a full-size version (`name-800.webp`, `name.webp`); browsers pick the right one. When adding a photo, convert it the same way (the JPG is kept for social previews).
- **WhatsApp QR:** `src/components/forms/WhatsAppQr.jsx` generates the code from `whatsappNumber` in `site.js`, so it always matches the configured number. It appears in the hero on desktop and in the quote banner on every page. On phones a "Chat on WhatsApp" button replaces it.

## Cookies and analytics

The cookie banner (`src/components/layout/CookieConsent.jsx`) is a wide bar at the bottom of the screen with Customise, Reject all and Accept all. Customise opens a preferences modal. It stores the visitor's choice in the first-party `algorique_consent` cookie for six months. **Cookie settings** in the footer and on the cookie policy page reopens the panel.

No analytics are installed. To add a tool, load it only after consent:

```js
import { onConsent } from './lib/consent'
onConsent('analytics', () => {
  /* inject the analytics script here */
})
```

Then list the tool's cookies in `src/pages/Cookies.jsx`.

## Motion and accessibility

- Motion follows one language throughout: expo-out easing, clip-path image reveals, line-by-line headline reveals, directional blur fades, a scroll-driven horizontal services track, a velocity-reactive marquee, and a scroll-scrubbed final CTA. It was modelled on the motion quality of the reference site, whose built bundle shows Framer Motion with an `[0.16, 1, 0.3, 1]` ease and clip-path inset reveals.
- `MotionConfig reducedMotion="user"` respects the visitor's system setting. The horizontal services section switches to a swipe carousel on mobile and for reduced-motion users, so nobody is locked into scroll-driven movement.
- Accessibility basics are covered: semantic landmarks, a skip link, visible focus states, keyboard-operable tabs, accordions, carousels, lightbox (arrow keys and Escape) and mobile menu (focus trap and Escape), labelled form fields with announced errors, and touch targets of 44px or more.

## Project structure

```
api/                 Vercel Functions (booking.js, contact.js, _lib/email.js)
public/              brand/, images/, favicon, robots.txt, sitemap.xml
src/
  components/        animation, booking, footer, forms, gallery, hero,
                     layout, navigation, sections, services, testimonials
  data/              site.js (business config), content.js, images.js
  hooks/             shared hooks
  lib/               schemas (shared with api), consent, scroll, whatsapp, motion
  pages/             Home, Privacy, Terms, Cookies, NotFound
  styles/            Tailwind theme and base styles
```
