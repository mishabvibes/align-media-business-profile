import { cn } from "cn"

// Adapted from Magic UI Marquee (magicui.design/docs/components/marquee):
// the children are repeated `repeat` times and each copy slides by its own width plus the gap,
// so the loop is seamless. Pauses on hover; stopped under prefers-reduced-motion.

type MarqueeProps = {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  /** How many copies of the children to render (enough to fill wide screens). */
  repeat?: number
}

export function Marquee({ children, className, reverse = false, pauseOnHover = true, repeat = 4 }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee flex overflow-hidden [--duration:40s] [--gap:3.5rem] [gap:var(--gap)]",
        // Soft fade at both edges.
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 items-center justify-around [gap:var(--gap)]",
            "animate-marquee motion-reduce:animate-none",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
