export type NavLink = {
  label: string
  href: `#${string}`
}

export type SocialLink = {
  label: string
  href: string
}

// Client-owned details. The client will decide the final location, tagline, social
// links, email and domain; every place on the site reads them from here, so changing
// a value below (and rebuilding) is all it takes. See "Client details" in README.md.
const region = "Kerala"
const country = { name: "India", code: "IN" }

export const site = {
  name: "Align Media",
  tagline: "Design, video & social media that move your brand forward.",
  description:
    `Align Media is a creative and digital studio in ${region}. Posters, video editing, social media, ad campaigns and branding for businesses that want to be noticed.`,
  // Placeholder domain, no trailing slash. Used by metadata, OG, JSON-LD, robots and sitemap.
  siteUrl: "https://alignmedia.in",
  // Leave empty to hide. When set, it shows in the contact block, footer and JSON-LD.
  email: "" as string,
  phone: {
    display: "+91 95628 27463",
    tel: "+919562827463",
  },
  whatsapp: {
    // International format, digits only, as wa.me expects.
    number: "919562827463",
    defaultMessage: "Hi Align Media, I'd like to discuss a project.",
  },
  region,
  country,
  location: `Based in ${region}, ${country.name} · Working with clients everywhere`,
  timeZone: "Asia/Kolkata",
  timeLabel: region,
  // TODO(client): placeholder claim, confirm reply hours or set to "" to hide.
  // Non-breaking spaces keep "hours · Mon–Sat" on one line when it wraps.
  replyHours: "Usually replies within a few hours\u00a0·\u00a0Mon–Sat",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
  // Empty until the client shares links, e.g. { label: "Instagram", href: "https://instagram.com/…" }.
  // Links render in the footer (and JSON-LD sameAs) only when this has items.
  socials: [] as SocialLink[],
} as const
