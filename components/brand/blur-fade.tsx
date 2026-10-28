"use client"

import { useRef } from "react"
import { useInView, type UseInViewOptions } from "motion/react"

// Adapted from Magic UI BlurFade (magicui.design/docs/components/blur-fade):
// fade + 12px rise + light blur, once, as the block enters the viewport.
// The hidden state and the transition live in globals.css ([data-blur-fade]);
// it only applies under html.js, so without JavaScript everything is visible.

type BlurFadeProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  /** Rise distance in px. */
  offset?: number
  blur?: string
  /** Animate when scrolled into view (default) or straight away on mount. */
  inView?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  as?: "div" | "section" | "li" | "span"
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  offset = 12,
  blur = "4px",
  inView = true,
  inViewMargin = "-64px",
  as: Tag = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: inViewMargin })
  const visible = !inView || seen

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      data-blur-fade=""
      data-shown={visible ? "" : undefined}
      style={
        {
          "--bf-offset": `${offset}px`,
          "--bf-blur": blur,
          "--bf-duration": `${duration}s`,
          "--bf-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  )
}
