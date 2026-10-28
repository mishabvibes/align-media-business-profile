import { Phone } from "lucide-react"

import { BlurFade } from "@/components/brand/blur-fade"
import { BorderBeam } from "@/components/brand/border-beam"
import { CropMarks } from "@/components/brand/crop-marks"
import { Eyebrow } from "@/components/brand/eyebrow"
import { WhatsAppButton } from "@/components/brand/whatsapp-button"
import { contact } from "@/content/contact"
import { site } from "@/content/site"

/** 05 — CONTACT: the closing CTA block on surface, with crop marks and one slow border beam. */
export function Contact() {
  return (
    // overflow-x-clip: the border beam's square travels past the card edge (masked, but
    // still laid out), which would otherwise widen the page on small screens.
    <section id="contact" aria-labelledby="contact-title" className="section-y overflow-x-clip">
      <div className="shell">
        <div className="relative border border-line bg-surface">
          <CropMarks offset={8} />
          <BorderBeam duration={10} size={80} colorFrom="#A78BFA" colorTo="#7C3AED" />

          <BlurFade className="px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <Eyebrow index={5}>{contact.eyebrow}</Eyebrow>

            <p className="type-lead mt-10 text-mute sm:mt-14">{contact.kicker}</p>
            <h2 id="contact-title" className="type-display mt-3 max-w-[12ch] text-paper">
              {contact.title}
            </h2>

            <div className="mt-12 flex flex-col gap-8 sm:mt-16 md:flex-row md:items-center md:gap-12">
              <WhatsAppButton size="xl" className="w-full md:w-auto">
                {contact.primaryCta}
              </WhatsAppButton>

              <div className="flex flex-col gap-1.5">
                <span className="type-label text-faint">{contact.phoneLabel}</span>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="type-h3 group inline-flex min-h-11 items-center gap-3 self-start text-paper underline decoration-transparent decoration-1 underline-offset-[0.25em] transition-colors duration-150 ease-out hover:decoration-violet-text"
                >
                  <Phone aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 text-violet-text" />
                  <span className="sr-only">Call </span>
                  <span className="tabular-nums">{site.phone.display}</span>
                </a>
              </div>
            </div>

            <p className="type-label mt-12 border-t border-line pt-6 text-faint sm:mt-16">{contact.replyHours}</p>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
