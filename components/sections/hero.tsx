import { CropMarks } from "@/components/brand/crop-marks"
import { Eyebrow } from "@/components/brand/eyebrow"
import { GridLines } from "@/components/brand/grid-lines"
import { LineReveal } from "@/components/brand/line-reveal"
import { Magnet } from "@/components/brand/magnet"
import { WhatsAppButton } from "@/components/brand/whatsapp-button"
import { hero } from "@/content/hero"

// 3% film grain, baked as an SVG feTurbulence tile (design.md §5).
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/** Sets the highlight word of a headline line in lilac. */
function highlight(line: string, word: string) {
  const at = line.indexOf(word)
  if (at === -1) return line
  return (
    <>
      {line.slice(0, at)}
      <span className="text-lilac">{word}</span>
      {line.slice(at + word.length)}
    </>
  )
}

export function Hero() {
  return (
    // Slides under the transparent sticky header so the hero fills the first screen.
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-16 flex h-[min(100svh,860px)] min-h-[560px] flex-col overflow-hidden pt-16"
    >
      {/* Decor: one off-centre light, grain, and the 12-col hairlines on desktop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_75%_20%,rgb(124_58_237/0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: grain }} />
      </div>
      <GridLines />

      <div className="shell flex flex-1 flex-col pt-6 pb-10 sm:pb-14 lg:pt-10 lg:pb-16">
        <div className="relative flex flex-1 flex-col justify-end px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
          <CropMarks />

          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 id="hero-title" className="type-display mt-6 text-paper sm:mt-8">
            <LineReveal lines={hero.headline.map((line) => highlight(line, hero.highlight))} />
          </h1>

          <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="type-lead measure-tight text-mute">{hero.subline}</p>

            <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Magnet padding={40} strength={6} className="block sm:inline-block">
                <WhatsAppButton size="lg" className="w-full sm:w-auto">
                  {hero.primaryCta}
                </WhatsAppButton>
              </Magnet>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 self-center font-semibold text-paper underline decoration-line-strong decoration-1 underline-offset-[0.35em] transition-colors duration-150 ease-out hover:decoration-violet-text sm:self-auto"
              >
                {hero.secondaryCta.label}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
