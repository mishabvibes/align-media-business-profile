import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { clients } from "@/content/clients"
import { stats } from "@/content/stats"
import { testimonials } from "@/content/testimonials"

import { Clients } from "./clients"
import { Stats } from "./stats"
import { Testimonials } from "./testimonials"

// Test-only sample data. It never ships: the content files must stay empty until the client sends real entries.
const sampleClients = [{ name: "Sample Co", logo: "/sample.svg" }]
const sampleStats = [{ value: 120, suffix: "+", label: "Sample label" }]
const sampleTestimonials = [{ quote: "Sample quote", name: "Sample Name", role: "Sample role" }]

const render = (el: Parameters<typeof renderToStaticMarkup>[0]) => renderToStaticMarkup(el)

describe("hidden-until-data sections", () => {
  it("ships with no clients, stats or testimonials", () => {
    expect(clients).toEqual([])
    expect(stats).toEqual([])
    expect(testimonials).toEqual([])
  })

  it("render nothing with the shipped (empty) content", () => {
    expect(render(createElement(Clients))).toBe("")
    expect(render(createElement(Stats))).toBe("")
    expect(render(createElement(Testimonials))).toBe("")
  })

  it("render nothing when given empty arrays", () => {
    expect(render(createElement(Clients, { items: [] }))).toBe("")
    expect(render(createElement(Stats, { items: [] }))).toBe("")
    expect(render(createElement(Testimonials, { items: [] }))).toBe("")
  })

  it("render their content when data is present", () => {
    const c = render(createElement(Clients, { items: sampleClients }))
    expect(c).toContain("Trusted by")
    expect(c).toContain('alt="Sample Co"')

    const s = render(createElement(Stats, { items: sampleStats }))
    expect(s).toContain("120+")
    expect(s).toContain("Sample label")

    const t = render(createElement(Testimonials, { items: sampleTestimonials }))
    expect(t).toContain("Sample quote")
    expect(t).toContain("Sample Name")
    expect(t).toContain("Sample role")
  })
})
