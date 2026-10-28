import { CalendarDays, Clapperboard, PenTool, Shapes, Target, type LucideIcon } from "lucide-react"

import { BlurFade } from "@/components/brand/blur-fade"
import { Eyebrow } from "@/components/brand/eyebrow"
import { services, servicesIntro, type ServiceIcon } from "@/content/services"
import { serviceMessage, waLink } from "@/lib/whatsapp"

const icons: Record<ServiceIcon, LucideIcon> = { PenTool, Clapperboard, CalendarDays, Target, Shapes }

/** 01 — SERVICES: numbered, hairline-separated rows (Flatline-style), not a card grid. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y scroll-mt-16">
      <div className="shell">
        <BlurFade className="grid-site gap-y-6">
          <div className="col-span-4 lg:col-span-8">
            <Eyebrow index={1}>{servicesIntro.eyebrow}</Eyebrow>
            <h2 id="services-title" className="type-h2 mt-5 text-paper sm:mt-6">
              {servicesIntro.title}
            </h2>
          </div>
          <p className="type-lead col-span-4 text-mute lg:col-span-4 lg:self-end lg:text-right">
            {servicesIntro.subline}
          </p>
        </BlurFade>

        <ol className="mt-12 sm:mt-16">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            const number = String(i + 1).padStart(2, "0")
            return (
              <BlurFade
                key={service.id}
                as="li"
                delay={i * 0.06}
                className="group -mx-4 border-t border-line px-4 last:border-b transition-colors duration-200 ease-out hover:bg-raised has-[a:focus-visible]:bg-raised sm:-mx-6 sm:px-6"
              >
                <div className="grid-site items-baseline gap-y-3 py-7 sm:py-8 lg:py-10">
                  {/* faint fails on raised, so the number steps up to mute on hover. */}
                  <span
                    aria-hidden="true"
                    className="type-label col-span-4 text-faint transition-colors duration-200 group-hover:text-mute group-has-[a:focus-visible]:text-mute lg:col-span-1"
                  >
                    {number}
                  </span>

                  <h3 className="type-h3 col-span-4 flex items-start gap-3 text-paper lg:gap-4">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-[0.1em] size-6 shrink-0 text-violet-text"
                    />
                    <span>
                      <span className="sr-only">{number}. </span>
                      {service.title}
                    </span>
                  </h3>

                  <p className="type-body measure col-span-4 text-mute lg:col-span-5">{service.description}</p>

                  <div className="col-span-4 mt-1 lg:col-span-2 lg:mt-0 lg:justify-self-end">
                    <a
                      href={waLink(serviceMessage(service.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${service.title} on WhatsApp (opens in a new tab)`}
                      className="inline-flex min-h-11 items-center gap-2 font-semibold text-violet-text underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors duration-150 ease-out hover:decoration-violet-text"
                    >
                      {servicesIntro.enquireLabel}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5 group-has-[a:focus-visible]:translate-x-1.5 motion-reduce:transition-none"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </BlurFade>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
