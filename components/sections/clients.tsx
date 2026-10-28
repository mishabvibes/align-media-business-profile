import Image from "next/image"

import { BlurFade } from "@/components/brand/blur-fade"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Marquee } from "@/components/brand/marquee"
import { clients as defaultClients, type Client } from "@/content/clients"

function Logo({ client }: { client: Client }) {
  const img = (
    <Image
      src={client.logo}
      alt={client.name}
      width={160}
      height={48}
      // Forced monochrome paper so any logo file sits quietly on ink.
      className="h-8 w-auto max-w-40 object-contain brightness-0 invert sm:h-10"
    />
  )
  const cls =
    "flex items-center opacity-60 transition-opacity duration-150 ease-out hover:opacity-100 focus-visible:opacity-100"
  return client.href ? (
    <a href={client.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {img}
    </a>
  ) : (
    <span className={cls}>{img}</span>
  )
}

/** Hidden until data: monochrome logo marquee under a TRUSTED BY eyebrow. */
export function Clients({ items = defaultClients }: { items?: Client[] }) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="clients-title" className="border-y border-line py-12 sm:py-16">
      <div className="shell">
        <BlurFade>
          <Eyebrow>
            <span id="clients-title">Trusted by</span>
          </Eyebrow>
        </BlurFade>
      </div>
      {/* Screen readers get one plain list; the scrolling copies are decorative. */}
      <ul className="sr-only">
        {items.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <Marquee className="mt-8 sm:mt-10">
        {items.map((c) => (
          <Logo key={c.name} client={c} />
        ))}
      </Marquee>
    </section>
  )
}
