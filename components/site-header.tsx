"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { LocalTime } from "@/components/brand/local-time"
import { WhatsAppButton } from "@/components/brand/whatsapp-button"
import { Wordmark } from "@/components/brand/wordmark"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { site } from "@/content/site"

const SCROLL_THRESHOLD = 24

/** Anchor hrefs work from any route: on `/` they only change the hash. */
const toHref = (hash: string) => `/${hash}`

/** Two hairlines; they cross into an X for the close button. */
function MenuGlyph({ open = false }: { open?: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-2.5 w-6">
      <span
        className={cn(
          "absolute inset-x-0 h-px bg-paper transition-transform duration-200 ease-out",
          open ? "top-1/2 rotate-45" : "top-0"
        )}
      />
      <span
        className={cn(
          "absolute inset-x-0 h-px bg-paper transition-transform duration-200 ease-out",
          open ? "top-1/2 -rotate-45" : "bottom-0"
        )}
      />
    </span>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Anchor picked in the sheet; we scroll to it once the sheet has closed
  // and the scroll lock is released.
  const pendingHash = useRef<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goTo = (hash: string) => {
    const target = document.getElementById(hash.slice(1))
    if (!target) {
      window.location.assign(toHref(hash))
      return
    }
    history.pushState(null, "", hash)
    // scroll-behavior on <html> makes this smooth (and instant for reduced motion).
    target.scrollIntoView()
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
    target.focus({ preventScroll: true })
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-out",
        scrolled ? "border-line bg-surface/85 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className="shell flex h-full items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a
          href={toHref("#top")}
          className="-m-1 inline-flex min-h-11 items-center justify-self-start p-1"
          aria-label={`${site.name}, back to top`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={toHref(link.href)}
                  className="relative block py-3 font-sans before:absolute before:inset-y-0 before:-inset-x-2  text-[0.9375rem] font-medium text-mute transition-colors duration-150 ease-out after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-violet-text after:transition-transform after:duration-200 after:ease-out hover:text-paper hover:after:scale-x-100 focus-visible:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-self-end gap-6 lg:flex">
          <LocalTime className="hidden xl:block" />
          <WhatsAppButton icon arrow={false} />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* 36px pill to fit the bar; the ::after stretches the tap area to 44px. */}
          <WhatsAppButton size="sm" icon arrow={false} className="relative after:absolute after:inset-x-0 after:-inset-y-1">
            Chat<span className="sr-only"> on WhatsApp</span>
          </WhatsAppButton>

          <Sheet
            open={open}
            onOpenChange={setOpen}
            onOpenChangeComplete={(isOpen) => {
              if (isOpen || !pendingHash.current) return
              const hash = pendingHash.current
              pendingHash.current = null
              goTo(hash)
            }}
          >
            <SheetTrigger className="-mr-2 flex size-11 items-center justify-center rounded-chip">
              <MenuGlyph />
              <span className="sr-only">Menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              // Leave focus on the chosen section, not the menu button.
              finalFocus={() => pendingHash.current === null}
              className="w-full gap-0 border-line bg-ink data-[side=right]:w-full data-[side=right]:sm:max-w-md"
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-(--gutter)">
                <SheetTitle className="type-label text-faint">Menu</SheetTitle>
                <SheetClose className="-mr-2 flex size-11 items-center justify-center rounded-chip">
                  <MenuGlyph open />
                  <span className="sr-only">Close menu</span>
                </SheetClose>
              </div>
              <SheetDescription className="sr-only">Jump to a section of the page.</SheetDescription>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-(--gutter) pt-6">
                <ol className="border-t border-line">
                  {site.nav.map((link, i) => (
                    <li key={link.href} className="border-b border-line">
                      <a
                        href={toHref(link.href)}
                        onClick={(event) => {
                          // Let modified clicks (new tab etc.) behave normally.
                          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
                          event.preventDefault()
                          pendingHash.current = link.href
                          setOpen(false)
                        }}
                        className="group flex items-baseline gap-4 py-4 text-paper"
                      >
                        <span className="type-label w-6 shrink-0 text-faint transition-colors group-hover:text-violet-text">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="type-h2 transition-transform duration-200 ease-out group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="flex shrink-0 flex-col gap-4 px-(--gutter) pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
                <WhatsAppButton size="lg" icon className="w-full" />
                <a
                  href={`tel:${site.phone.tel}`}
                  className="inline-flex min-h-11 items-center self-center font-mono text-sm tracking-[0.04em] text-mute transition-colors hover:text-paper"
                >
                  <span className="sr-only">Call </span>
                  {site.phone.display}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
