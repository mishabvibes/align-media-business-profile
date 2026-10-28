"use client"

import { useEffect, useState } from "react"
import { cn } from "cn"

import { site } from "@/content/site"

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
})

/** Live studio clock: KERALA — 14:32 IST. Renders a placeholder until mounted. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const d = new Date()
      setNow(d)
      // Re-render on the next minute boundary.
      timer = setTimeout(tick, 60_000 - (d.getTime() % 60_000) + 50)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return (
    <p className={cn("type-label text-faint tabular-nums", className)}>
      {site.timeLabel} —{" "}
      <time dateTime={now?.toISOString()} suppressHydrationWarning>
        {now ? formatter.format(now) : "--:--"}
      </time>{" "}
      IST
    </p>
  )
}
