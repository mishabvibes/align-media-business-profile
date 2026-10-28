export type Client = {
  name: string
  // Path under /public, e.g. "/clients/acme.svg". Monochrome logos work best.
  logo: string
  href?: string
}

// Empty until the client provides real logos. The section stays hidden while empty.
export const clients: Client[] = []
