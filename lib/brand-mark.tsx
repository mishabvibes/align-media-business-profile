import { ogColors } from "@/lib/og-fonts"

// The favicon mark for next/og: Bricolage 800 "A" on ink with the violet
// square at bottom right (design.md §3). `size` is the square canvas in px.
export function BrandMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ogColors.ink,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "Bricolage",
          fontWeight: 800,
          fontSize: size * 0.78,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: ogColors.paper,
          marginTop: -size * 0.06,
          marginLeft: -size * 0.08,
        }}
      >
        A
      </div>
      <div
        style={{
          position: "absolute",
          right: size * 0.1,
          bottom: size * 0.14,
          width: size * 0.18,
          height: size * 0.18,
          background: ogColors.violet,
        }}
      />
    </div>
  )
}
