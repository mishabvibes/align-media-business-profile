import { cn } from "cn"

/**
 * The visible 12-col grid (design.md §4): 1px `line` hairlines at the column
 * edges, desktop only, 50% opacity. Place inside a `relative` parent.
 */
export function GridLines({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div className="shell hidden h-full opacity-50 lg:block">
        <div className="grid-site h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="border-x border-line" />
          ))}
        </div>
      </div>
    </div>
  )
}
