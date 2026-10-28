"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import { cn } from "cn"

// Adapted from React Bits Magnet (reactbits.dev/animations/magnet).
// Only active on hover-capable fine pointers and when motion is allowed.
// Writes the transform straight to the DOM so pointer moves don't re-render.

type MagnetProps = {
  children: React.ReactNode
  /** Extra hit area around the element, in px. */
  padding?: number
  /** Higher is weaker. */
  strength?: number
  disabled?: boolean
  className?: string
}

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

export function Magnet({ children, padding = 60, strength = 4, disabled = false, className }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const canHover = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  )
  const on = canHover && !disabled

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    const move = (x: number, y: number, active: boolean) => {
      inner.style.transition = active ? "transform 0.3s ease-out" : "transform 0.5s ease-in-out"
      inner.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    if (!on) {
      move(0, 0, false)
      return
    }
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const dx = e.clientX - (left + width / 2)
      const dy = e.clientY - (top + height / 2)
      if (Math.abs(dx) < width / 2 + padding && Math.abs(dy) < height / 2 + padding) {
        move(dx / strength, dy / strength, true)
      } else {
        move(0, 0, false)
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [on, padding, strength])

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <div ref={innerRef} className={on ? "will-change-transform" : undefined}>
        {children}
      </div>
    </div>
  )
}
