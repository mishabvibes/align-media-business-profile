"use client"

import { useRef } from "react"
import { useInView } from "motion/react"

import { cn } from "cn"
import { BlurFade } from "@/components/brand/blur-fade"
import { Eyebrow } from "@/components/brand/eyebrow"
import { GridLines } from "@/components/brand/grid-lines"
import { processIntro, processSteps, type ProcessStep } from "@/content/process"

function Step({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  // Fill once the numeral is well inside the viewport, not at the first pixel.
  const filled = useInView(ref, { once: true, margin: "0px 0px -30% 0px" })

  return (
    <li ref={ref} className="relative col-span-4 pl-8 lg:col-span-3 lg:pt-10 lg:pl-0">
      {/* Registration tick where the step meets the connector line. */}
      <span
        aria-hidden="true"
        className="absolute top-[2.75rem] -left-[4.5px] size-2 bg-violet lg:top-[-4.5px] lg:left-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          "text-outline block text-transparent font-display text-8xl leading-[0.85] font-extrabold tracking-[-0.04em]",
          "transition-[color,-webkit-text-stroke-color] duration-700 ease-out-soft",
          filled && "text-violet-text [-webkit-text-stroke-color:var(--violet-text)]",
        )}
      >
        {step.number}
      </span>
      <BlurFade delay={index * 0.06}>
        <h3 className="type-h3 mt-6 text-paper lg:mt-8">
          <span className="sr-only">Step {index + 1}. </span>
          {step.title}
        </h3>
        <p className="type-body mt-3 max-w-[34ch] text-mute">{step.description}</p>
      </BlurFade>
    </li>
  )
}

/** 03 — PROCESS: four numbered phases on the visible 12-col grid (Dopamine-style). */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative isolate">
      <GridLines />
      <div className="shell">
        <BlurFade>
          <Eyebrow index={3}>{processIntro.eyebrow}</Eyebrow>
          <h2 id="process-title" className="type-h2 mt-5 text-paper sm:mt-6">
            {processIntro.title}
          </h2>
        </BlurFade>

        {/* The connector: violet down the left edge on mobile, across the top on desktop. */}
        <ol className="grid-site mt-12 gap-y-14 border-l border-violet sm:mt-16 lg:mt-20 lg:border-t lg:border-l-0">
          {processSteps.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
