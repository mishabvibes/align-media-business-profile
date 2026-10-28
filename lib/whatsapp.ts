import { site } from "@/content/site"

/** Builds a wa.me link with the message URL-encoded. Falls back to the default message. */
export function waLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

/** Prefilled message for a single service enquiry. */
export function serviceMessage(serviceName: string): string {
  return `Hi Align Media, I'm interested in ${serviceName}.`
}
