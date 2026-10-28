import { siWhatsapp } from "simple-icons"

type WhatsAppIconProps = React.SVGProps<SVGSVGElement> & {
  /** Accessible name. Without it the icon is decorative and hidden from screen readers. */
  title?: string
}

/** Official WhatsApp glyph from simple-icons, monochrome in the current text colour. */
export function WhatsAppIcon({ title, className, ...props }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={siWhatsapp.path} />
    </svg>
  )
}
