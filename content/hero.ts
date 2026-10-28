import { site } from "./site"

export const hero = {
  eyebrow: `Creative & digital studio — ${site.region}, ${site.country.code}`,
  // Rendered line by line; the `highlight` word is set in lilac.
  headline: ["Design, video", "& social that move", "your brand forward."],
  highlight: "move",
  subline:
    "Posters, reels, ads and brand identities for businesses that want to be noticed. Tell us what you need on WhatsApp; we reply fast.",
  primaryCta: "Start a project on WhatsApp",
  secondaryCta: { label: "See our work", href: "#work" },
  ticker: ["Posters", "Motion", "Social", "Ads", "Branding"],
} as const
