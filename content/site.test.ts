import { describe, expect, it } from "vitest"

import { site } from "./site"

// Guards the client-owned details in content/site.ts so a typo fails `npm test`.
describe("site details", () => {
  it("has an absolute https siteUrl without a trailing slash or path", () => {
    const url = new URL(site.siteUrl)
    expect(url.protocol).toBe("https:")
    expect(site.siteUrl).toBe(url.origin)
  })

  it("has a non-empty tagline and location", () => {
    expect(site.tagline.trim()).not.toBe("")
    expect(site.location).toContain(site.region)
  })

  it("has a valid email when one is set", () => {
    if (site.email) expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it("has labelled https social links", () => {
    for (const social of site.socials) {
      expect(social.label.trim()).not.toBe("")
      expect(new URL(social.href).protocol).toBe("https:")
    }
  })
})
