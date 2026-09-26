# OWASP CUJ — Student Chapter Website

Official single-page website for the **OWASP Student Chapter at Central University of Jammu**.

Light by default with a dark toggle, cybersecurity-flavoured, and built to be handed over: every
piece of content lives in one config file, so the next committee can update the site without
touching a component.

---

## Stack

| Concern    | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 15 (App Router, React 19)                          |
| Styling    | Tailwind CSS 3 with CSS-variable theming                   |
| Animation  | Framer Motion (scroll reveals, layout transitions)         |
| Icons      | lucide-react + hand-rolled inline brand glyphs             |
| Fonts      | Space Grotesk (headings) + Inter (body), via `next/font`   |
| Forms      | Route handler at `/api/contact` → Formspree or Web3Forms   |
| Deployment | Vercel (zero config)                                       |

No CSS-in-JS runtime, no UI kit, no analytics scripts. First-load JS is ~172 kB.

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build && npm start
```

```bash
npm run lint
```

---

## Project structure

```
.
├── app/
│   ├── layout.jsx            # Metadata, OG/Twitter tags, JSON-LD, fonts, theme bootstrap
│   ├── page.jsx              # Section composition
│   ├── globals.css           # Design tokens + shared component classes
│   ├── not-found.jsx         # Themed 404
│   ├── icon.png              # Favicon
│   ├── opengraph-image.jsx   # Social share card, generated at build time
│   ├── robots.js             # /robots.txt
│   ├── sitemap.js            # /sitemap.xml
│   └── api/contact/route.js  # Contact form handler
├── components/
│   ├── Navbar.jsx            # Sticky header, scroll spy, mobile menu, progress bar
│   ├── Hero.jsx              # Full-viewport hero: wordmark + typewriter
│   ├── About.jsx             # What is OWASP / About the chapter
│   ├── Activities.jsx        # Six expandable programme cards
│   ├── Mission.jsx           # Why-join value props + pledge strip
│   ├── Events.jsx            # Filterable timeline (upcoming / past / all)
│   ├── Team.jsx              # Faculty coordinator + core team grid
│   ├── Sponsors.jsx          # Tiered sponsor grid with empty states
│   ├── Join.jsx              # WhatsApp / Discord community cards
│   ├── Contact.jsx           # Validated contact form + chapter details
│   ├── Footer.jsx            # Quick links, resources, socials, colophon
│   ├── GridBackdrop.jsx      # Honeycomb lattice / bloom / particles backdrop
│   ├── CustomCursor.jsx      # Circular cursor (fine pointers only)
│   ├── Logo.jsx              # Original chapter mark + wordmark lockup
│   ├── Reveal.jsx            # Scroll-reveal wrapper
│   ├── SectionHeading.jsx    # Shared eyebrow + title + lede
│   ├── SocialIcons.jsx       # Inline brand glyphs
│   ├── ThemeProvider.jsx     # Dark/light state (always opens light)
│   └── ThemeToggle.jsx
├── lib/site.js               # ← ALL CONTENT LIVES HERE
└── public/{brand,team,events,sponsors}/
```

---

## Editing content

**`lib/site.js` is the single source of truth.** Chapter details, nav links, activities, events,
team members and sponsor tiers are all plain arrays and objects there. Components read from it, so
a content update never means editing JSX.

### Before launch

Names, contact details, the chapter URL, the founding year, the wordmark and the four current
portraits are all real and in place. What is left:

| Outstanding               | Where                                | What to do                                                        |
| ------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| 6 unfilled roles          | `lib/site.js` → `coreTeam`           | Set `name`, `photo` and `socials` as members are selected. Entries with `name: null` are hidden from the grid, so nothing fake renders. |
| 2 events without a date   | `lib/site.js` → `events`             | Set `date` (`YYYY-MM-DD`); undated events sort last and show "Date coming soon" |
| 4 events without a banner | `lib/site.js` → `events`             | Add files to `public/events/`, set `banner: '/events/x.png'`       |
| Past events               | `lib/site.js` → `events`             | **The two past events are sample content — replace or delete them before launch** |
| Contact form delivery     | `.env.local`                         | Set `FORMSPREE_ENDPOINT` or `WEB3FORMS_ACCESS_KEY`, or the form only dry-runs |
| Discord invite            | `lib/site.js` → `community.discord`  | The current invite expires **2026-10-26** — replace with a non-expiring one |
| Facebook link             | `lib/site.js` → `socials.facebook`   | Currently points at a single post, not the page                   |
| Share image               | `app/opengraph-image.jsx`            | Still draws the old `</>` shield, not the wasp wordmark            |
| Sponsors                  | `lib/site.js` → `sponsorTiers`       | Empty by design; add `{ name, url, logo }` to replace the empty state |

Sponsor tiers ship empty on purpose and render a "Become our first sponsor" state. Add entries as
`{ name, url, logo }` and they replace it automatically.

### Adding images

Photos are optional everywhere. Until a file exists, the site renders a clearly marked placeholder
tile rather than a broken image, so it always looks finished.

```js
// lib/site.js
{ id: 'co-lead-3', name: 'Aisha Kumar', role: 'Co-Lead', photo: '/team/aisha.jpg', socials: { linkedin: '…' } }
```

Images go through `next/image`, so they are lazy-loaded, resized and served as AVIF/WebP.

---

## Contact form

The form posts to `/api/contact`, which validates server-side, drops honeypot submissions, applies a
light per-IP rate limit, and then forwards to whichever provider you configure.

```bash
cp .env.example .env.local
```

Then set **one** of:

- `FORMSPREE_ENDPOINT` — create a form at [formspree.io](https://formspree.io) and paste the endpoint
- `WEB3FORMS_ACCESS_KEY` — get a key at [web3forms.com](https://web3forms.com)

With neither set, the route runs in **dry-run mode**: it validates the submission, logs it to the
server console and reports back that no provider is configured. That is intentional so the form is
testable on a fresh clone.

Keys are read server-side only and are never exposed to the browser.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import it. Vercel detects Next.js — accept the
   defaults.
3. Add environment variables under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` — your final URL, e.g. `https://owaspcuj.vercel.app`
   - `FORMSPREE_ENDPOINT` *or* `WEB3FORMS_ACCESS_KEY`
4. **Deploy**. Every push to `main` redeploys; pull requests get preview URLs.

`NEXT_PUBLIC_SITE_URL` matters — canonical tags, Open Graph URLs and `sitemap.xml` are all derived
from it.

### Custom domain

Add it under **Settings → Domains**, point the DNS record Vercel shows you, then update
`NEXT_PUBLIC_SITE_URL` and redeploy so the metadata matches.

---

## Accessibility

- Skip-to-content link, landmark elements and a single `h1`
- Every interactive control is reachable and operable by keyboard; the mobile menu closes on `Escape`
  and locks background scroll while open
- Visible focus rings on every focusable element
- `aria-expanded` / `aria-controls` on disclosures, `role="tablist"` on the events filter,
  `role="status"` with `aria-live` for form feedback
- Decorative backdrops are `aria-hidden` with pointer events disabled
- Placeholder tiles carry descriptive labels instead of empty `alt` text
- `prefers-reduced-motion` is respected — animations collapse to instant, and `Reveal` skips
  Framer Motion entirely
- Reveal elements are un-hidden via `<noscript>` so the page is readable without JavaScript

## SEO

- Full metadata: title template, description, keywords, canonical, `robots`
- Open Graph + Twitter card, with the share image generated at build time from `opengraph-image.jsx`
- `Organization` JSON-LD linked to the OWASP Foundation as parent org
- `sitemap.xml` and `robots.txt` generated from the same config
- Semantic headings, `<time datetime>` on events, descriptive link text

## Performance notes

- Backdrops animate with `transform` (compositor-only) and use radial gradients rather than large
  `filter: blur()` layers, which are expensive to rasterise
- Fonts are self-hosted by `next/font` with `display: swap` — no render-blocking third-party request
- Brand icons are inline SVG, so no icon font or extra network request
- The static page is fully prerendered; only `/api/contact` is dynamic

---

## Licence & attribution

Code and copy in this repository were written for OWASP CUJ. OWASP® and the OWASP logo are
trademarks of the OWASP Foundation. OWASP CUJ is an officially recognised OWASP Student Chapter —
see https://owasp.org/chapters/central-university-jammu

Made with ❤ by OWASP CUJ.
