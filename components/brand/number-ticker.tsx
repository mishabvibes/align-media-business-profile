"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "cn"

// Adapted from Magic UI NumberTicker (magicui.design/docs/components/number-ticker):
// springs from 0 to `value` once in view. The animated digits are hidden from screen readers;
// the final value is always available to them (and is shown straight away under reduced motion).

type NumberTickerProps = {
  value: number
  suffix?: string
  delay?: number
  className?: string
}

const format = (n: number) => Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)

export function NumberTicker({ value, suffix = "", delay = 0, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (!inView || reduce) return
    const t = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, reduce, value, delay, motionValue])

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(Math.round(latest))
      }),
    [spring],
  )

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        <span ref={ref}>{format(reduce ? value : 0)}</span>
        {suffix}
      </span>
    </span>
  )
}
