import { BlurFade } from "@/components/brand/blur-fade"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { testimonials as defaultTestimonials, type Testimonial } from "@/content/testimonials"

/** Hidden until data: quote cards, quote in Bricolage 600, name and role in mono. */
export function Testimonials({ items = defaultTestimonials }: { items?: Testimonial[] }) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="testimonials-title" className="section-y">
      <div className="shell">
        <BlurFade>
          <Eyebrow>
            <span id="testimonials-title">Kind words</span>
          </Eyebrow>
        </BlurFade>
        <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((t, i) => (
            <BlurFade as="li" key={`${t.name}-${i}`} delay={i * 0.06} className="flex">
              <Card className="w-full gap-8 rounded-0 bg-surface py-8 ring-line">
                <CardContent className="flex-1 px-6 sm:px-8">
                  <blockquote className="font-display text-xl leading-[1.25] font-semibold tracking-[-0.02em] text-paper sm:text-2xl">
                    <p>“{t.quote}”</p>
                  </blockquote>
                </CardContent>
                <CardFooter className="flex-col items-start gap-1 rounded-0 border-line bg-transparent px-6 pt-6 sm:px-8">
                  <p className="type-label text-paper">{t.name}</p>
                  <p className="type-label text-faint">{t.role}</p>
                </CardFooter>
              </Card>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  )
}
