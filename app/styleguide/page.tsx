import type { Metadata } from "next"
import { ArrowRight, ArrowDown, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/brand/blur-fade"
import { CropMarks } from "@/components/brand/crop-marks"
import { Eyebrow } from "@/components/brand/eyebrow"
import { LocalTime } from "@/components/brand/local-time"
import { Magnet } from "@/components/brand/magnet"
import { WhatsAppButton } from "@/components/brand/whatsapp-button"
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { Wordmark } from "@/components/brand/wordmark"

// Scratch page for checking design tokens (task #2). Not linked from the site.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
}

const palette = [
  { name: "ink", hex: "#0B0A0D", className: "bg-ink", use: "Page background" },
  { name: "surface", hex: "#141318", className: "bg-surface", use: "Cards, scrolled header, sheet" },
  { name: "raised", hex: "#1C1A22", className: "bg-raised", use: "Hover, inputs, tab list" },
  { name: "line", hex: "#2A2732", className: "bg-line", use: "Hairlines, card borders" },
  { name: "line-strong", hex: "#3A3644", className: "bg-line-strong", use: "Interactive borders" },
  { name: "paper", hex: "#F1EEE8", className: "bg-paper", use: "Main text" },
  { name: "mute", hex: "#A6A1AE", className: "bg-mute", use: "Secondary text" },
  { name: "faint", hex: "#7D7887", className: "bg-faint", use: "Mono meta on ink/surface" },
  { name: "violet", hex: "#7C3AED", className: "bg-violet", use: "Primary button fill" },
  { name: "violet-press", hex: "#6D3AE8", className: "bg-violet-press", use: "Primary hover/active" },
  { name: "violet-text", hex: "#A78BFA", className: "bg-violet-text", use: "Links, icons, focus ring" },
  { name: "lilac", hex: "#C9B8FF", className: "bg-lilac", use: "Sticker blocks, ink text" },
]

const typeScale = [
  { token: "type-display", spec: "44–120px / 0.92 / -0.045em · Bricolage 800", sample: "Move your brand forward." },
  { token: "type-h2", spec: "32–72px / 0.98 / -0.035em · Bricolage 700", sample: "What we make." },
  { token: "type-h3", spec: "20–28px / 1.1 / -0.02em · Bricolage 700", sample: "Poster & Graphic Design" },
  { token: "type-lead", spec: "17–22px / 1.45 · Instrument Sans 400", sample: "Posters, reels, ads and brand identities for businesses that want to be noticed." },
  { token: "type-body", spec: "16px / 1.6 · Instrument Sans 400", sample: "Tell us what you need on WhatsApp and we reply fast. Every project starts with a short chat about what you want people to feel." },
  { token: "type-small", spec: "14px / 1.5 · Instrument Sans 500", sample: "Full case studies on request." },
  { token: "type-label", spec: "12px / 1.2 / +0.12em · JetBrains Mono 500, uppercase", sample: "01 — Services" },
]

const radii = [
  { token: "rounded-0", value: "0", use: "Sections, images, tiles" },
  { token: "rounded-chip", value: "6px", use: "Chips, inputs, tabs" },
  { token: "rounded-pill", value: "999px", use: "Buttons, floating WhatsApp" },
]

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-label text-faint">
      <span aria-hidden className="mr-2 inline-block size-[0.6em] bg-violet" />
      {children}
    </p>
  )
}

export default function Styleguide() {
  return (
    <div className="flex-1">
      <header className="shell border-b border-line py-10">
        <Label>00 — Styleguide</Label>
        <h1 className="type-h2 mt-4 text-paper">Tokens, type and buttons.</h1>
        <p className="type-lead measure mt-4 text-mute">
          A scratch sheet for checking the design system. Tab through the page to see the focus ring.
        </p>
      </header>

      <section className="shell section-y border-b border-line" aria-labelledby="sg-palette">
        <Label>01 — Palette</Label>
        <h2 id="sg-palette" className="type-h3 mt-4 text-paper">Colour</h2>
        <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {palette.map((c) => (
            <li key={c.name} className="bg-ink p-4">
              <div className={`${c.className} aspect-[4/3] border border-line`} />
              <p className="type-small mt-3 text-paper">--{c.name}</p>
              <p className="type-label mt-1 text-faint">{c.hex}</p>
              <p className="type-small mt-1 font-normal text-mute">{c.use}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-line bg-surface p-6">
            <p className="type-body text-paper">Paper on surface</p>
            <p className="type-body text-mute">Mute on surface</p>
            <p className="type-label mt-2 text-faint">Faint meta on surface</p>
          </div>
          <div className="border border-line bg-raised p-6">
            <p className="type-body text-paper">Paper on raised</p>
            <p className="type-body text-mute">Mute on raised (no faint here)</p>
            <a href="#sg-buttons" className="type-body text-violet-text underline underline-offset-4">Violet-text link</a>
          </div>
          <div className="-rotate-2 bg-lilac p-6">
            <p className="type-label text-ink">Based in Kerala, India · Working with clients everywhere</p>
          </div>
        </div>
      </section>

      <section className="shell section-y border-b border-line" aria-labelledby="sg-type">
        <Label>02 — Type</Label>
        <h2 id="sg-type" className="type-h3 mt-4 text-paper">Fluid scale</h2>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {typeScale.map((t) => (
            <div key={t.token} className="grid-site gap-y-3 py-8">
              <dt className="col-span-4 lg:col-span-3">
                <p className="type-small text-paper">.{t.token}</p>
                <p className="type-label mt-1 text-faint normal-case tracking-normal">{t.spec}</p>
              </dt>
              <dd className={`${t.token} col-span-4 text-paper lg:col-span-9`}>{t.sample}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell section-y border-b border-line" aria-labelledby="sg-layout">
        <Label>03 — Layout</Label>
        <h2 id="sg-layout" className="type-h3 mt-4 text-paper">Container, grid, radius</h2>
        <p className="type-body measure mt-4 text-mute">
          <code className="font-mono text-sm text-paper">.shell</code> caps content at 1280px with a
          clamp(20px, 5vw, 64px) gutter. <code className="font-mono text-sm text-paper">.section-y</code>{" "}
          gives clamp(96px, 12vw, 160px) vertical padding. <code className="font-mono text-sm text-paper">.grid-site</code>{" "}
          is 4 columns on mobile and 12 from 1024px.
        </p>
        <div className="grid-site mt-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={`${i >= 4 ? "hidden lg:flex" : "flex"} h-20 items-end border border-line bg-surface p-2`}
            >
              <span className="type-label text-faint">{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {radii.map((r) => (
            <li key={r.token} className="flex items-center gap-4">
              <div className={`${r.token} h-14 w-24 border border-line-strong bg-raised`} />
              <div>
                <p className="type-small text-paper">.{r.token}</p>
                <p className="type-small font-normal text-mute">{r.value} · {r.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell section-y" aria-labelledby="sg-buttons">
        <Label>04 — Buttons</Label>
        <h2 id="sg-buttons" className="type-h3 mt-4 text-paper">Button variants</h2>

        <div className="mt-8 flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button>
              Chat on WhatsApp <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" className="w-full sm:w-auto">
              Start a project on WhatsApp <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="xl" className="w-full sm:w-auto">
              Chat on WhatsApp <ArrowRight data-icon="inline-end" />
            </Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="sm">Small outline</Button>
            <Button variant="outline">Back home</Button>
            <Button variant="outline" size="lg">
              <Phone data-icon="inline-start" /> Call +91 95628 27463
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <Button variant="link">
              See our work <ArrowDown data-icon="inline-end" />
            </Button>
            <Button variant="link" size="lg">
              Enquire <ArrowRight data-icon="inline-end" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="icon" aria-label="Next">
              <ArrowRight />
            </Button>
            <Button variant="outline" size="icon" aria-label="Call">
              <Phone />
            </Button>
          </div>
        </div>
      </section>
      <section className="shell section-y" aria-labelledby="sg-primitives">
        <Eyebrow index={5}>Primitives</Eyebrow>
        <h2 id="sg-primitives" className="type-h3 mt-4 text-paper">Shared brand primitives</h2>

        <div className="mt-8 flex flex-col gap-12">
          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-line py-5">
            <Wordmark />
            <LocalTime />
          </div>

          <Wordmark size="footer" />

          <div className="flex flex-col gap-3">
            <Eyebrow index={1}>Services</Eyebrow>
            <Eyebrow>Creative &amp; digital studio — Kerala, IN</Eyebrow>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative bg-surface p-8">
              <CropMarks />
              <p className="type-small text-mute">Crop marks, always on</p>
            </div>
            <div className="group relative border border-line p-8">
              <CropMarks showOnHover offset={6} />
              <p className="type-small text-mute">Crop marks on hover, 6px outside</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppIcon className="size-6 text-paper" title="WhatsApp" />
            <WhatsAppButton size="md" icon arrow={false}>Chat</WhatsAppButton>
            <WhatsAppButton size="lg" message="Hi Align Media, I'd like to start a project.">
              Start a project on WhatsApp
            </WhatsAppButton>
            <Magnet>
              <WhatsAppButton size="xl" />
            </Magnet>
            <WhatsAppButton variant="outline" icon />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {["Discuss on WhatsApp", "Plan & concept", "Create & revise"].map((step, i) => (
              <BlurFade key={step} delay={i * 0.08} className="border border-line p-6">
                <p className="type-label text-faint">{String(i + 1).padStart(2, "0")}</p>
                <p className="type-h3 mt-3 text-paper">{step}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
