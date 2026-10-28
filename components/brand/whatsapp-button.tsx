import { ArrowRight } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { waLink } from "@/lib/whatsapp"
import { WhatsAppIcon } from "./whatsapp-icon"

// 44 / 52 / 64px tall pills, mapped onto the shared button sizes.
const sizeMap = { md: "default", lg: "lg", xl: "xl" } as const

type WhatsAppButtonProps = Omit<React.ComponentProps<"a">, "href" | "target" | "rel"> & {
  /** Prefilled message; defaults to the site-wide one. */
  message?: string
  size?: keyof typeof sizeMap
  variant?: "default" | "outline"
  /** Show the WhatsApp glyph before the label. */
  icon?: boolean
  /** Show the trailing arrow that nudges 4px right on hover. */
  arrow?: boolean
}

/** Pill link that opens a WhatsApp chat in a new tab. */
export function WhatsAppButton({
  message,
  size = "md",
  variant = "default",
  icon = false,
  arrow = true,
  className,
  children = "Chat on WhatsApp",
  ...props
}: WhatsAppButtonProps) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener"
      className={cn(buttonVariants({ variant, size: sizeMap[size] }), className)}
      {...props}
    >
      {icon && <WhatsAppIcon data-icon="inline-start" />}
      {children}
      {arrow && <ArrowRight data-icon="inline-end" aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
