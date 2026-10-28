"use client"

import { useReducedMotion, type MotionStyle } from "motion/react"
import * as m from "motion/react-m"
import { cn } from "cn"

// Adapted from Magic UI BorderBeam (magicui.design/docs/components/border-beam):
// a short gradient travels the 1px border of its `relative` parent. Restyled to
// the brand (violet-text → violet, no default orange) and square corners. Hidden
// for reduced motion.

type BorderBeamProps = {
  /** Length of the beam, in px. */
  size?: number
  /** Seconds per lap. */
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  reverse?: boolean
  className?: string
}

export function BorderBeam({
  size = 80,
  duration = 10,
  delay = 0,
  colorFrom = "#A78BFA",
  colorTo = "#7C3AED",
  borderWidth = 1,
  reverse = false,
  className,
}: BorderBeamProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div
      aria-hidden="true"
      style={{ "--beam-width": `${borderWidth}px` } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--beam-width) border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <m.div
        className={cn(
          "absolute aspect-square bg-linear-to-l from-(--beam-from) via-(--beam-to) to-transparent",
          className
        )}
        style={
          {
            width: size,
            offsetPath: "rect(0 auto auto 0)",
            "--beam-from": colorFrom,
            "--beam-to": colorTo,
          } as MotionStyle
        }
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay }}
      />
    </div>
  )
}
