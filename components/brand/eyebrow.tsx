import { cn } from "cn"

type EyebrowProps = {
  /** Section number, rendered zero-padded: 1 → "01". Omit for a free-form label. */
  index?: number
  children: React.ReactNode
  as?: "p" | "span" | "div"
  className?: string
}

/** Mono proof-sheet label: ■ 01 — SERVICES, in faint (ink/surface backgrounds only). */
export function Eyebrow({ index, children, as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag className={cn("type-label flex items-center gap-2.5 text-faint", className)}>
      <span aria-hidden="true" className="inline-block size-[0.5rem] shrink-0 bg-violet" />
      <span>
        {index !== undefined && <>{String(index).padStart(2, "0")} — </>}
        {children}
      </span>
    </Tag>
  )
}
