// Icon names are lucide-react component names.
export type ServiceIcon = "PenTool" | "Clapperboard" | "CalendarDays" | "Target" | "Shapes"

export type Service = {
  id: string
  title: string
  description: string
  icon: ServiceIcon
}

export const servicesIntro = {
  eyebrow: "Services",
  title: "What we make.",
  subline: "Five things, done properly.",
  enquireLabel: "Enquire",
} as const

export const services: Service[] = [
  {
    id: "design",
    title: "Poster & Graphic Design",
    description:
      "Posters, flyers, menus and offer creatives that stop the scroll and say one thing clearly.",
    icon: "PenTool",
  },
  {
    id: "video",
    title: "Video Editing & Motion Graphics",
    description:
      "Reels, promos and animated text, cut to the beat and sized for every platform.",
    icon: "Clapperboard",
  },
  {
    id: "social",
    title: "Social Media Management",
    description:
      "A monthly plan, consistent posts and a feed that looks like one brand, not ten.",
    icon: "CalendarDays",
  },
  {
    id: "ads",
    title: "Ad Campaigns (Meta / Instagram / Google)",
    description:
      "Campaigns set up, targeted and tracked, so your budget goes to people who might buy.",
    icon: "Target",
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description:
      "Logos, colours and type that make you recognisable, with simple guidelines to keep it that way.",
    icon: "Shapes",
  },
]
