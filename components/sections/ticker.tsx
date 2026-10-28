import { cn } from "cn"

import { ScrollVelocity } from "@/components/brand/scroll-velocity"
import { hero } from "@/content/hero"

/** POSTERS ■ MOTION ■ SOCIAL ■ ADS ■ BRANDING ■, between two hairlines. */
export function Ticker() {
  return (
    <div className="border-y border-line py-5 sm:py-7">
      <p className="sr-only">{hero.ticker.join(", ")}</p>
      <ScrollVelocity baseVelocity={-40} copies={4} className="select-none">
        <span aria-hidden="true" className="flex items-center">
          {hero.ticker.map((word, i) => (
            <span
              key={word}
              className={cn("type-h2 flex items-center uppercase", i % 2 === 0 ? "text-paper" : "text-faint")}
            >
              <span className="px-[0.4em]">{word}</span>
              <span className="inline-block size-[0.28em] shrink-0 bg-violet" />
            </span>
          ))}
        </span>
      </ScrollVelocity>
    </div>
  )
}
