import { cn } from "cn"

// "Align Media" set in Bricolage 800 at -0.04em, closed by a solid violet
// square sitting on the baseline like a full stop (design.md §3).
const sizes = {
  header: "text-[1.375rem] leading-none",
  footer: "text-[clamp(3rem,12vw,10rem)] leading-[0.85]",
} as const

type WordmarkProps = {
  size?: keyof typeof sizes
  className?: string
}

export function Wordmark({ size = "header", className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-extrabold tracking-[-0.04em] whitespace-nowrap text-paper",
        sizes[size],
        className
      )}
    >
      Align Media
      <span aria-hidden="true" className="ml-[0.06em] inline-block size-[0.22em] shrink-0 bg-violet" />
    </span>
  )
}
