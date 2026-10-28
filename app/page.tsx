import { About } from "@/components/sections/about"
import { Clients } from "@/components/sections/clients"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { Services } from "@/components/sections/services"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"
import { Ticker } from "@/components/sections/ticker"
import { Work } from "@/components/sections/work"

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Services />
      <Work />
      {/* Hidden until content/clients, stats and testimonials have real entries. */}
      <Clients />
      <Stats />
      <Testimonials />
      <Process />
      <About />
      <Contact />
    </>
  )
}
