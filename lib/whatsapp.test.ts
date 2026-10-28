import { describe, expect, it } from "vitest"

import { serviceMessage, waLink } from "./whatsapp"

describe("waLink", () => {
  it("uses the default message when none is given", () => {
    expect(waLink()).toBe(
      "https://wa.me/919562827463?text=Hi%20Align%20Media%2C%20I'd%20like%20to%20discuss%20a%20project.",
    )
  })

  it("encodes reserved characters so the message round-trips", () => {
    const message = "Logo & poster? 50% off / today #1"
    const url = new URL(waLink(message))
    expect(url.origin + url.pathname).toBe("https://wa.me/919562827463")
    expect(url.searchParams.get("text")).toBe(message)
    const text = waLink(message).split("?text=")[1]
    expect(text).not.toMatch(/[ &#?/]/)
  })
})

describe("serviceMessage", () => {
  it("builds the per-service message", () => {
    expect(serviceMessage("Branding & Identity")).toBe(
      "Hi Align Media, I'm interested in Branding & Identity.",
    )
  })

  it("encodes the ampersand in a service link", () => {
    expect(waLink(serviceMessage("Branding & Identity"))).toBe(
      "https://wa.me/919562827463?text=Hi%20Align%20Media%2C%20I'm%20interested%20in%20Branding%20%26%20Identity.",
    )
  })
})
