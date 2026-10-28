import type { MetadataRoute } from "next"

import { site } from "@/content/site"

export const dynamic = "force-static"

// One-page site; /styleguide is a noindex scratch page and stays out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
