export type Testimonial = {
  quote: string
  name: string
  role: string
}

// Empty until the client provides real quotes. The section stays hidden while empty.
export const testimonials: Testimonial[] = []
