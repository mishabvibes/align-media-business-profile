import { site } from "@/content/site"

// Organization + LocalBusiness structured data for the home page and brand.
// Image routes are exported without an extension (out/apple-icon, out/opengraph-image).
const data = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${site.siteUrl}/#organization`,
  name: site.name,
  description: site.description,
  url: `${site.siteUrl}/`,
  logo: `${site.siteUrl}/apple-icon`,
  image: `${site.siteUrl}/opengraph-image`,
  telephone: site.phone.tel,
  ...(site.email && { email: site.email }),
  address: {
    "@type": "PostalAddress",
    addressRegion: site.region,
    addressCountry: site.country.code,
  },
  areaServed: [
    { "@type": "State", name: site.region },
    { "@type": "Country", name: site.country.name },
  ],
  ...(site.socials.length > 0 && { sameAs: site.socials.map((s) => s.href) }),
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
