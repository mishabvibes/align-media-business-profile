import { ImageResponse } from "next/og"

import { site } from "@/content/site"
import { loadOgFonts, ogColors } from "@/lib/og-fonts"

export const dynamic = "force-static"
export const alt = `${site.name}: ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const host = new URL(site.siteUrl).host

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: ogColors.ink,
          color: ogColors.paper,
          fontFamily: "Instrument Sans",
          border: `1px solid ${ogColors.line}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: "0.12em", color: ogColors.mute }}>
          CREATIVE &amp; DIGITAL STUDIO · KERALA, INDIA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontFamily: "Bricolage",
              fontWeight: 800,
              fontSize: 168,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            {site.name}
            <div
              style={{
                width: 37,
                height: 37,
                marginLeft: 10,
                marginBottom: 22,
                background: ogColors.violet,
              }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 40, color: ogColors.mute, maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: ogColors.mute }}>
          <span>{host}</span>
          <span>{site.phone.display}</span>
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() }
  )
}
