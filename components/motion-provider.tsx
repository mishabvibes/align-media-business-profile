"use client"

import { LazyMotion } from "motion/react"

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default)

/**
 * Lets the `m.*` components (motion/react-m) animate. Features load after
 * hydration; until then they render their initial styles, as before.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
