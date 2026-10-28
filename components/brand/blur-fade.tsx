"use client"

import { useRef } from "react"
import { useInView, useReducedMotion, type UseInViewOptions } from "motion/react"
import * as m from "motion/react-m"

// Adapted from Magic UI BlurFade (magicui.design/docs/components/blur-fade):
// fade + 12px rise + light blur, once, as the block enters the viewport.

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
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: inViewMargin })
  const reduce = useReducedMotion()
  const visible = !inView || seen
  const Tag = m[as] as typeof m.div

  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: offset, filter: `blur(${blur})` }}
      animate={visible || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: [0.2, 0.7, 0.1, 1] }}
    >
      {children}
    </Tag>
  )
}
