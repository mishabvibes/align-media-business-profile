"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, useReducedMotion } from "motion/react"
import * as m from "motion/react-m"
import { Play } from "lucide-react"

import { BlurFade } from "@/components/brand/blur-fade"
import { CropMarks } from "@/components/brand/crop-marks"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  portfolio,
  portfolioCategories,
  portfolioIntro,
  type AspectRatio,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/content/portfolio"

type Filter = PortfolioCategory | typeof portfolioIntro.allLabel

const filters: Filter[] = [portfolioIntro.allLabel, ...portfolioCategories]

// Intrinsic sizes of the 1200px-wide placeholders in /public/portfolio.
const dimensions: Record<AspectRatio, { width: number; height: number }> = {
  "4:5": { width: 1200, height: 1500 },
  "1:1": { width: 1200, height: 1200 },
  "16:9": { width: 1200, height: 675 },
  "3:4": { width: 1200, height: 1600 },
}

/** "00:30" → "30 seconds", "01:00" → "1 minute" for screen readers. */
function spokenDuration(duration: string) {
  const [m, s] = duration.split(":").map(Number)
  const parts = []
  if (m) parts.push(`${m} minute${m === 1 ? "" : "s"}`)
  if (s) parts.push(`${s} second${s === 1 ? "" : "s"}`)
  return parts.join(" ")
}

// Chip styles override the stock shadcn trigger (incl. its `dark:` variants, as <html> is always .dark).
const chipClass = [
  "h-11 flex-none rounded-chip border-line-strong px-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-mute",
  "transition-colors duration-150 ease-out hover:border-mute hover:text-paper dark:text-mute dark:hover:text-paper",
  "data-active:border-violet-text data-active:bg-violet-text data-active:text-ink",
  "dark:data-active:border-violet-text dark:data-active:bg-violet-text dark:data-active:text-ink",
  // The `line` list variant forces a transparent active tab; put the fill back.
  "group-data-[variant=line]/tabs-list:data-active:bg-violet-text dark:group-data-[variant=line]/tabs-list:data-active:border-violet-text dark:group-data-[variant=line]/tabs-list:data-active:bg-violet-text",
  "focus-visible:border-line-strong focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-text",
  "after:hidden",
].join(" ")

/** 02 — WORK: filter chips over a masonry-style column grid of placeholder tiles. */
export function Work() {
  const [filter, setFilter] = useState<Filter>(portfolioIntro.allLabel)
  const reduce = useReducedMotion()
  const items = filter === portfolioIntro.allLabel ? portfolio : portfolio.filter((p) => p.category === filter)

  return (
    <section id="work" aria-labelledby="work-title" className="section-y scroll-mt-16">
      <div className="shell">
        <BlurFade className="grid-site gap-y-6">
          <div className="col-span-4 lg:col-span-8">
            <Eyebrow index={2}>{portfolioIntro.eyebrow}</Eyebrow>
            <h2 id="work-title" className="type-h2 mt-5 text-paper sm:mt-6">
              {portfolioIntro.title}
            </h2>
          </div>
          <p className="type-lead col-span-4 text-mute lg:col-span-4 lg:self-end lg:text-right">
            {portfolioIntro.note}
          </p>
        </BlurFade>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mt-10 gap-8 sm:mt-14 sm:gap-10">
          {/* Edge-to-edge scroller on mobile; the fade hints there are more chips to the right. */}
          <div className="relative -mx-(--gutter) sm:mx-0">
            <TabsList
              variant="line"
              aria-label="Filter work by category"
              className="h-auto w-full justify-start gap-2 overflow-x-auto overscroll-x-contain p-0 px-(--gutter) py-1 [scrollbar-width:none] sm:w-fit sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {filters.map((f) => (
                <TabsTrigger key={f} value={f} className={chipClass}>
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-ink to-transparent sm:hidden"
            />
          </div>

          {/* One panel whose value follows the active chip, so the grid can animate between filters. */}
          <TabsContent value={filter} className="text-base">
            <ul className="relative columns-1 gap-x-5 sm:columns-2 lg:columns-3 lg:gap-x-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item) => (
                  <m.li
                    key={item.id}
                    layout={!reduce}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: [0.2, 0.7, 0.1, 1] }}
                    className="mb-10 break-inside-avoid sm:mb-12"
                  >
                    <WorkTile item={item} />
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function WorkTile({ item }: { item: PortfolioItem }) {
  const { width, height } = dimensions[item.aspectRatio]

  return (
    <article className="group">
      <div className="relative">
        <div className="overflow-hidden bg-surface">
          <Image
            src={item.image}
            alt={item.alt}
            width={width}
            height={height}
            sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            className="h-auto w-full transition-transform duration-250 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />

          {item.isVideo && (
            <>
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink"
              >
                <Play className="ml-0.5 size-5 fill-current" strokeWidth={1.5} />
              </span>
              {item.duration && (
                <span className="type-label absolute right-3 bottom-3 bg-ink/80 px-2 py-1 text-paper">
                  <span aria-hidden="true">{item.duration}</span>
                  <span className="sr-only">Video, {spokenDuration(item.duration)}</span>
                </span>
              )}
            </>
          )}
        </div>
        <CropMarks showOnHover offset={8} />
      </div>

      <p className="type-label mt-4 text-faint">{item.category}</p>
      <h3 className="mt-2 text-lg leading-snug font-medium text-paper">{item.title}</h3>
    </article>
  )
}
