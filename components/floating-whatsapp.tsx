"use client"

import { useEffect, useState } from "react"
import { cn } from "cn"

import { Magnet } from "@/components/brand/magnet"
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { contact } from "@/content/contact"
import { waLink } from "@/lib/whatsapp"

/**
 * Fixed WhatsApp button, bottom-right above the safe area. 56px circle on
 * mobile, a "Chat" pill from 768px. Steps aside while #contact is on screen
 * so the page never shows two identical CTAs side by side.
 */
export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById("contact")
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      inert={hidden}
      className={cn(
        "fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-30 transition-[opacity,translate] duration-250 ease-out",
        hidden && "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <Magnet padding={40} strength={5}>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener"
          aria-label={`${contact.floating.ariaLabel} (opens in a new tab)`}
          className="flex size-14 items-center justify-center gap-2 rounded-pill bg-violet text-white shadow-float transition-colors duration-150 ease-out hover:bg-violet-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-text md:w-auto md:pr-6 md:pl-5"
        >
          <WhatsAppIcon className="size-6 shrink-0" />
          <span aria-hidden="true" className="hidden font-sans text-base font-semibold md:inline">
            {contact.floating.label}
          </span>
        </a>
      </Magnet>
    </div>
  )
}
