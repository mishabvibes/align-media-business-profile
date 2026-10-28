import { site } from "./site"

export const contact = {
  eyebrow: "Contact",
  kicker: "Okay, that's the tour.",
  title: "Got a project? Let's talk.",
  primaryCta: "Chat on WhatsApp",
  phoneLabel: "or call us",
  // Editable: lives in content/site.ts so the header, contact and footer stay in sync.
  replyHours: site.replyHours,
  // Floating button (all pages).
  floating: {
    label: "Chat",
    ariaLabel: "Chat with Align Media on WhatsApp",
  },
} as const

export const footer = {
  navLabel: "Footer",
  contactLabel: "Talk to us",
  sectionsLabel: "Sections",
} as const
