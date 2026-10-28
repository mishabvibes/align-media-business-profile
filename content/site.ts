export type NavLink = {
  label: string
  href: `#${string}`
}

export type SocialLink = {
  label: string
  href: string
}

export const site = {
  name: "Align Media",
  tagline: "Design, video & social media that move your brand forward.",
  description:
    "Align Media is a creative and digital studio in Kerala. Posters, video editing, social media, ad campaigns and branding for businesses that want to be noticed.",
  siteUrl: "https://alignmedia.in",
  phone: {
    display: "+91 95628 27463",
    tel: "+919562827463",
  },
  whatsapp: {
    // International format, digits only, as wa.me expects.
    number: "919562827463",
    defaultMessage: "Hi Align Media, I'd like to discuss a project.",
  },
  location: "Based in Kerala, India · Working with clients everywhere",
  timeZone: "Asia/Kolkata",
  timeLabel: "Kerala",
  // TODO(client): placeholder claim, confirm reply hours with the client or remove.
  replyHours: "Usually replies within a few hours · Mon–Sat",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
  // Empty until the client shares links; icons render only when this has items.
  socials: [] as SocialLink[],
} as const
