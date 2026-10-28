import { LocalTime } from "@/components/brand/local-time"
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { Wordmark } from "@/components/brand/wordmark"
import { footer } from "@/content/contact"
import { site } from "@/content/site"
import { waLink } from "@/lib/whatsapp"

/** Anchor hrefs work from any route: on `/` they only change the hash. */
const toHref = (hash: string) => `/${hash}`

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-mute underline decoration-transparent decoration-1 underline-offset-[0.3em] transition-colors duration-150 ease-out hover:text-paper hover:decoration-violet-text focus-visible:text-paper"

// Layout after HyperUI's "Simple stacked" footer, restyled to the proof-sheet tokens.
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="shell pt-16 sm:pt-24">
        <a href={toHref("#top")} aria-label={`${site.name}, back to top`} className="-ml-[0.05em] inline-block">
          <Wordmark size="footer" />
        </a>

        <div className="grid-site mt-14 gap-y-10 sm:mt-20">
          <p className="type-lead col-span-4 max-w-[28ch] text-mute lg:col-span-4">{site.tagline}</p>

          <nav aria-label={footer.navLabel} className="col-span-2 lg:col-span-2 lg:col-start-6">
            <p className="type-label text-faint">{footer.sectionsLabel}</p>
            <ul className="mt-2 flex flex-col">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a href={toHref(link.href)} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <p className="type-label text-faint">{footer.contactLabel}</p>
            <ul className="mt-2 flex flex-col">
              <li>
                <a href={waLink()} target="_blank" rel="noopener" className={`${linkClass} gap-2`}>
                  <WhatsAppIcon className="size-4 shrink-0 text-violet-text" />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.tel}`} className={`${linkClass} tabular-nums`}>
                  <span className="sr-only">Call </span>
                  {site.phone.display}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                    {site.email}
                  </a>
                </li>
              )}
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noopener" className={linkClass}>
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 lg:col-span-2 lg:justify-self-end">
            <LocalTime />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 pb-24 sm:mt-20 md:flex-row md:justify-between md:pb-10">
          <p className="type-label text-faint">
            © {year} {site.name}
          </p>
          <p className="type-label text-faint">{site.location}</p>
        </div>
      </div>
    </footer>
  )
}
