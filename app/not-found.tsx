import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "cn"

import { CropMarks } from "@/components/brand/crop-marks"
import { Eyebrow } from "@/components/brand/eyebrow"
import { GridLines } from "@/components/brand/grid-lines"
import { WhatsAppButton } from "@/components/brand/whatsapp-button"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

const numeral = "font-display text-[clamp(8.5rem,3rem+28vw,19rem)] leading-[0.8] font-extrabold tracking-[-0.05em]"

/** Branded 404: an outlined "404" printed slightly off register, on the static 12-col hairlines. */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="relative isolate flex flex-1 items-center section-y">
      <GridLines />

      <div className="shell">
        <Eyebrow>Error 404 — Page not found</Eyebrow>

        <div className="grid-site mt-10 gap-y-10 sm:mt-14 lg:items-end">
          <div className="relative col-span-4 justify-self-start px-3 py-4 sm:px-5 sm:py-6 lg:col-span-7">
            <CropMarks />
            <p aria-hidden="true" className="relative select-none">
              <span className={`${numeral} text-outline block text-transparent`}>404</span>
              {/* The misregistered second pass: same plate, violet ink, nudged off true. */}
              <span
                className={`${numeral} absolute inset-0 block translate-x-[0.035em] translate-y-[0.025em] text-transparent [-webkit-text-stroke:1px_var(--violet-text)]`}
              >
                404
              </span>
            </p>
          </div>

          <div className="col-span-4 lg:col-span-5 lg:pb-6">
            <h1 id="not-found-title" className="type-h2 max-w-[16ch] text-paper">
              This page is out of alignment.
            </h1>
            <p className="type-lead mt-5 measure-tight text-mute">
              The link may be old or mistyped. Head back to the studio, or message us and we&apos;ll point you to the
              right place.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
              >
                <ArrowLeft data-icon="inline-start" aria-hidden="true" />
                Back home
              </Link>
              <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
