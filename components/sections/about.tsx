"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { BlurFade } from "@/components/brand/blur-fade"
import { Eyebrow } from "@/components/brand/eyebrow"
import { about } from "@/content/about"

// Literal token values: motion interpolates hex colours, not CSS variables.
const FAINT = "#7d7887"
const PAPER = "#f1eee8"

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [FAINT, PAPER])
  return <motion.span style={{ color }}>{word}</motion.span>
}

/** Words go from faint to paper as the statement scrolls through the viewport (Anthracite-style). */
function ScrollStatement({ text, id }: { text: string; id: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
  const words = text.split(" ")

  if (reduce) {
    return (
      <h2 id={id} className="type-h2 max-w-[24ch] text-paper">
        {text}
      </h2>
    )
  }

  return (
    <h2 ref={ref} id={id} className="type-h2 max-w-[24ch] text-faint">
      {words.map((word, i) => (
        <span key={i}>
          <Word word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          {i < words.length - 1 && " "}
        </span>
      ))}
    </h2>
  )
}

/** 04 — ABOUT: a manifesto line, then the paragraph and the lilac sticker side by side on desktop. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="shell">
        <Eyebrow index={4}>{about.eyebrow}</Eyebrow>
        <div className="mt-6 sm:mt-8">
          <ScrollStatement id="about-title" text={about.statement} />
        </div>

        <BlurFade className="grid-site mt-14 gap-y-12 sm:mt-20 lg:items-end">
          <p className="type-lead col-span-4 text-mute lg:col-span-6">{about.paragraph}</p>
          <div className="col-span-4 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <p className="type-label inline-block -rotate-2 bg-lilac px-5 py-4 leading-relaxed text-ink">
              {about.sticker}
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
