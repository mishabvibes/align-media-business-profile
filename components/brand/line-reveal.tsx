"use client"

import { motion, useReducedMotion } from "motion/react"

// Headline lines rise out of a mask, one after another (design.md §6):
// 600ms, cubic-bezier(.2,.7,.1,1), 80ms stagger. Per line, not per letter.

type LineRevealProps = {
  lines: readonly React.ReactNode[]
  delay?: number
}

export function LineReveal({ lines, delay = 0.1 }: LineRevealProps) {
  const reduce = useReducedMotion()

  return lines.map((line, i) => (
    // Bottom padding keeps descenders inside the mask at line-height 0.92;
    // the negative margin gives the space back so the leading is unchanged.
    <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "120%" }}
        animate={{ y: 0 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.6, delay: delay + i * 0.08, ease: [0.2, 0.7, 0.1, 1] }
        }
      >
        {line}
      </motion.span>
    </span>
  ))
}
