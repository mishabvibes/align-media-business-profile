import { cn } from "cn"

type CropMarksProps = {
  /** Hide the marks until the nearest `group` ancestor is hovered or has focus inside. */
  showOnHover?: boolean
  /** Push the marks outward from the corners, in px. */
  offset?: number
  className?: string
}

const corners = [
  "top-[calc(var(--crop-offset)*-1)] left-[calc(var(--crop-offset)*-1)] border-t border-l",
  "top-[calc(var(--crop-offset)*-1)] right-[calc(var(--crop-offset)*-1)] border-t border-r",
  "bottom-[calc(var(--crop-offset)*-1)] left-[calc(var(--crop-offset)*-1)] border-b border-l",
  "bottom-[calc(var(--crop-offset)*-1)] right-[calc(var(--crop-offset)*-1)] border-b border-r",
]

/**
 * Four 12px L-shaped corner ticks (design.md §4). Place inside a `relative`
 * parent; with `showOnHover`, give that parent the `group` class.
 */
export function CropMarks({ showOnHover = false, offset = 0, className }: CropMarksProps) {
  return (
    <span
      aria-hidden="true"
      style={{ "--crop-offset": `${offset}px` } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0",
        showOnHover &&
          "opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 group-focus-within:opacity-100",
        className
      )}
    >
      {corners.map((c) => (
        <span key={c} className={cn("absolute size-3 border-line-strong", c)} />
      ))}
    </span>
  )
}
