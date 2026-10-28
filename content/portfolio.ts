export const portfolioCategories = ["Design", "Video", "Social", "Ads", "Branding"] as const
export type PortfolioCategory = (typeof portfolioCategories)[number]

export type AspectRatio = "4:5" | "1:1" | "16:9" | "3:4"

export type PortfolioItem = {
  id: string
  title: string
  category: PortfolioCategory
  // Corner code printed on the placeholder, e.g. "DSN-01".
  code: string
  // Path under /public. Swap these files for real work later.
  image: string
  alt: string
  aspectRatio: AspectRatio
  isVideo: boolean
  // "mm:ss", only for video items.
  duration?: string
}

export const portfolioIntro = {
  eyebrow: "Work",
  title: "Selected work.",
  note: "A taste of what we do. Full case studies on request.",
  allLabel: "All",
} as const

export const portfolio: PortfolioItem[] = [
  {
    id: "dsn-01",
    title: "Festival poster series",
    category: "Design",
    code: "DSN-01",
    image: "/portfolio/dsn-01.webp",
    alt: "Placeholder for a festival poster series",
    aspectRatio: "4:5",
    isVideo: false,
  },
  {
    id: "vid-01",
    title: "Restaurant launch reel",
    category: "Video",
    code: "VID-01",
    image: "/portfolio/vid-01.webp",
    alt: "Placeholder for a restaurant launch reel",
    aspectRatio: "16:9",
    isVideo: true,
    duration: "00:30",
  },
  {
    id: "soc-01",
    title: "Café Instagram feed",
    category: "Social",
    code: "SOC-01",
    image: "/portfolio/soc-01.webp",
    alt: "Placeholder for a café Instagram feed",
    aspectRatio: "1:1",
    isVideo: false,
  },
  {
    id: "brd-01",
    title: "Boutique identity",
    category: "Branding",
    code: "BRD-01",
    image: "/portfolio/brd-01.webp",
    alt: "Placeholder for a boutique brand identity",
    aspectRatio: "3:4",
    isVideo: false,
  },
  {
    id: "ads-01",
    title: "Retail sale campaign",
    category: "Ads",
    code: "ADS-01",
    image: "/portfolio/ads-01.webp",
    alt: "Placeholder for a retail sale ad campaign",
    aspectRatio: "1:1",
    isVideo: false,
  },
  {
    id: "dsn-02",
    title: "Menu and table cards",
    category: "Design",
    code: "DSN-02",
    image: "/portfolio/dsn-02.webp",
    alt: "Placeholder for a restaurant menu and table cards",
    aspectRatio: "3:4",
    isVideo: false,
  },
  {
    id: "vid-02",
    title: "Product teaser in motion",
    category: "Video",
    code: "VID-02",
    image: "/portfolio/vid-02.webp",
    alt: "Placeholder for an animated product teaser",
    aspectRatio: "4:5",
    isVideo: true,
    duration: "00:15",
  },
  {
    id: "ads-02",
    title: "Admissions lead campaign",
    category: "Ads",
    code: "ADS-02",
    image: "/portfolio/ads-02.webp",
    alt: "Placeholder for an admissions lead ad campaign",
    aspectRatio: "16:9",
    isVideo: false,
  },
  {
    id: "soc-02",
    title: "Gym monthly content plan",
    category: "Social",
    code: "SOC-02",
    image: "/portfolio/soc-02.webp",
    alt: "Placeholder for a gym's monthly social content",
    aspectRatio: "4:5",
    isVideo: false,
  },
  {
    id: "brd-02",
    title: "Startup logo and brand kit",
    category: "Branding",
    code: "BRD-02",
    image: "/portfolio/brd-02.webp",
    alt: "Placeholder for a startup logo and brand kit",
    aspectRatio: "1:1",
    isVideo: false,
  },
  {
    id: "vid-03",
    title: "Event highlights edit",
    category: "Video",
    code: "VID-03",
    image: "/portfolio/vid-03.webp",
    alt: "Placeholder for an event highlights video",
    aspectRatio: "16:9",
    isVideo: true,
    duration: "01:00",
  },
  {
    id: "dsn-03",
    title: "Real estate brochure",
    category: "Design",
    code: "DSN-03",
    image: "/portfolio/dsn-03.webp",
    alt: "Placeholder for a real estate brochure",
    aspectRatio: "4:5",
    isVideo: false,
  },
]
