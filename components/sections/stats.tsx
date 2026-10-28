import { BlurFade } from "@/components/brand/blur-fade"
import { NumberTicker } from "@/components/brand/number-ticker"
import { stats as defaultStats, type Stat } from "@/content/stats"

/** Hidden until data: 3–4 big Bricolage numerals that count up, with mute labels. */
export function Stats({ items = defaultStats }: { items?: Stat[] }) {
  if (items.length === 0) return null

  return (
    <section aria-label="Numbers" className="section-y">
      <dl className="shell grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {items.map((stat, i) => (
          <BlurFade key={stat.label} delay={i * 0.06} className="flex flex-col-reverse gap-3 border-t border-line pt-6">
            <dt className="type-small text-mute">{stat.label}</dt>
            <dd className="font-display text-6xl leading-[0.9] font-extrabold tracking-[-0.04em] text-paper sm:text-7xl">
              <NumberTicker value={stat.value} suffix={stat.suffix} delay={i * 0.1} />
            </dd>
          </BlurFade>
        ))}
      </dl>
    </section>
  )
}
