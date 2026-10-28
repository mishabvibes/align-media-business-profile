# Align Media — business profile site

A one-page, dark-theme profile site for Align Media. Every main call to action opens
WhatsApp. Built with Next.js (App Router), Tailwind CSS and shadcn/ui, and exported
as plain static files: no server needed.

## Run it

Needs Node.js 22.18 or newer (24 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command                    | What it does                                        |
| -------------------------- | --------------------------------------------------- |
| `npm run build`            | Production build and static export to `out/`         |
| `npm run lint`             | ESLint                                              |
| `npm run typecheck`        | Generates route types, then runs `tsc`              |
| `npm test`                 | Vitest unit tests                                   |
| `npm run gen:placeholders` | Regenerates the placeholder images in `public/portfolio/` |

## Edit the content

All copy lives in `content/*.ts`. Change the text there; the components never need
editing for copy changes.

| File                      | Holds                                                        |
| ------------------------- | ------------------------------------------------------------ |
| `content/site.ts`         | Name, tagline, description, `siteUrl`, phone, WhatsApp number and default message, location, nav links, social links |
| `content/hero.ts`         | Headline lines, highlighted word, subline, buttons, ticker words |
| `content/services.ts`     | The five service cards                                       |
| `content/portfolio.ts`    | Work grid items and filter categories                        |
| `content/process.ts`      | The process steps                                            |
| `content/about.ts`        | About copy                                                   |
| `content/contact.ts`      | Contact block and footer labels                              |
| `content/clients.ts`, `stats.ts`, `testimonials.ts` | Hidden sections (see below)           |

Notes:

- **WhatsApp number:** `site.whatsapp.number`, digits only in international format
  (e.g. `919562827463`). Every WhatsApp link on the site is built from it by
  `lib/whatsapp.ts`, with the message URL-encoded, and opens in a new tab.
- **Phone:** `site.phone.display` is what people see and `site.phone.tel` is used for
  click-to-call. Update both.
- **Reply hours:** `site.replyHours` is a placeholder line; confirm it with the client
  or set it to an empty string to hide it.
- **Email:** set `site.email` to show it in the contact block and footer.
- **Social links:** add `{ label, href }` items to `site.socials` and they appear in
  the footer.

## Client details

The client will pick the final location, tagline, social links, email and domain.
Until then the site uses the placeholders below. Each one is a single value in
`content/site.ts`; change it, run `npm test` (it checks the format) and rebuild.

| Detail       | Where                          | Placeholder now                                  | Used in |
| ------------ | ------------------------------ | ------------------------------------------------ | ------- |
| Location     | `region`, `country` at the top | Kerala, India                                    | Hero label, About, footer, local-time clock, page title, description, JSON-LD |
| Tagline      | `site.tagline`                 | "Design, video & social media that move your brand forward." | Footer, Open Graph image and alt text |
| Hero headline | `content/hero.ts`             | "Design, video & social that move your brand forward." | Hero |
| Social links | `site.socials`                 | none (hidden)                                    | Footer, JSON-LD `sameAs` |
| Email        | `site.email`                   | `""` (hidden)                                    | Contact block, footer, JSON-LD |
| Domain       | `site.siteUrl`                 | `https://alignmedia.in`                          | Metadata, Open Graph, JSON-LD, robots, sitemap |
| Reply hours  | `site.replyHours`              | "Usually replies within a few hours · Mon–Sat"  | Contact block (set to `""` to hide) |

If the studio moves out of India, also update `site.timeZone` (the footer clock) and
the `"India"`/`"IN"` country values. The About text in `content/about.ts` and the
description in `site.description` mention the region, so reread them after a change.

## Switch on the hidden sections

Clients, Stats and Testimonials are built but stay hidden while their data arrays are
empty. Add real entries and the section appears on the next build. Please don't add
made-up clients, numbers or quotes.

```ts
// content/clients.ts — put logo files in public/clients/
export const clients: Client[] = [
  { name: "Acme Foods", logo: "/clients/acme.svg", href: "https://acme.example" },
]

// content/stats.ts
export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects delivered" },
]

// content/testimonials.ts
export const testimonials: Testimonial[] = [
  { quote: "…", name: "Anu M.", role: "Owner, Café Kochi" },
]
```

Logos are shown in a single light tone, so SVG or transparent PNG works best.

## Swap the portfolio images

1. Export each piece as a WebP about **1200px wide**, ideally under 200 KB.
2. Put it in `public/portfolio/` (you can reuse an existing file name to replace it).
3. In `content/portfolio.ts`, update the item's `image`, `title`, `alt` (describe
   what the image actually shows) and `category`. Set `aspectRatio` to the closest of
   `"4:5"`, `"1:1"`, `"16:9"` or `"3:4"` so the layout reserves the right space.
4. For video work, set `isVideo: true` and a `duration` like `"00:30"`. A play icon is
   drawn over the image; there are no video embeds.

Once real images are in, remove the placeholder `.svg` and `.webp` files you no longer
use. Don't run `npm run gen:placeholders` after that, because it overwrites files in
`public/portfolio/`.

## Change the domain

Set `siteUrl` in `content/site.ts` (currently the placeholder `https://alignmedia.in`,
with no trailing slash). The page metadata, Open Graph image, JSON-LD, `robots.txt`
and `sitemap.xml` all read it. Rebuild afterwards.

## Build the static export

```bash
npm run build
```

This writes the whole site to `out/`. Upload the contents of `out/` to any static host
(Netlify, Cloudflare Pages, Vercel, GitHub Pages, S3 or plain Apache/nginx).
To preview it locally:

```bash
npx serve out
```

Notes for hosting:

- Turn on gzip or Brotli compression on the host (most do it by default). The site
  is tuned for it.
- `out/404.html` is the branded not-found page; point the host's 404 setting at it if
  it doesn't pick it up automatically.
- `out/icon`, `out/apple-icon` and `out/opengraph-image` are PNG files without an
  extension. If your host serves them as `application/octet-stream`, add a header
  rule giving those three paths `Content-Type: image/png`.
- `/styleguide/` is an internal design reference. It's marked `noindex` and blocked in
  `robots.txt`; delete `app/styleguide/` if you don't want it published.
