"use client"

import { useLayoutEffect, useRef, useState } from "react"
import {
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import * as m from "motion/react-m"
import { cn } from "cn"

// Adapted from React Bits ScrollVelocity (reactbits.dev/text-animations/scroll-velocity):
// a row drifts at a low base speed; scrolling speeds it up and flips its direction.
// Under reduced motion the row is static.

type ScrollVelocityProps = {
  children: React.ReactNode
  /** Drift speed in px per second. Positive moves right, negative moves left. */
  baseVelocity?: number
  /** Copies laid end to end; enough to cover the widest viewport. */
  copies?: number
  className?: string
  rowClassName?: string
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export function ScrollVelocity({
  children,
  baseVelocity = -40,
  copies = 4,
  className,
  rowClassName,
}: ScrollVelocityProps) {
  const reduce = useReducedMotion()
  const copyRef = useRef<HTMLDivElement>(null)
  const [copyWidth, setCopyWidth] = useState(0)

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  // Scroll speed adds up to 4x the base drift, never less than none.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => (copyWidth ? `${wrap(-copyWidth, 0, v)}px` : "0px"))
  const direction = useRef(1)

  useLayoutEffect(() => {
    const el = copyRef.current
    if (!el) return
    const measure = () => setCopyWidth(el.offsetWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (reduce || !copyWidth) return
    const vf = velocityFactor.get()
    if (vf < 0) direction.current = -1
    else if (vf > 0) direction.current = 1
    const moveBy = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(vf))
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={cn("overflow-hidden", className)}>
      <m.div className={cn("flex w-max", rowClassName)} style={{ x: reduce ? 0 : x }}>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} ref={i === 0 ? copyRef : undefined} className="flex shrink-0" aria-hidden={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </m.div>
    </div>
  )
}
