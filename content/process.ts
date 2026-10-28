export type ProcessStep = {
  number: string
  title: string
  description: string
}

export const processIntro = {
  eyebrow: "Process",
  title: "How it works.",
} as const

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discuss on WhatsApp",
    description: "Send us a message with what you need. We ask a few questions and share a quote.",
  },
  {
    number: "02",
    title: "Plan & concept",
    description: "We agree on the idea, the format and the deadline before anything gets made.",
  },
  {
    number: "03",
    title: "Create & revise",
    description: "We make the first version, you tell us what to change, and we refine it.",
  },
  {
    number: "04",
    title: "Deliver & grow",
    description: "You get ready-to-post files. We stay around for the next campaign.",
  },
]
