import { About } from "@/components/sections/about"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { Services } from "@/components/sections/services"
import { Ticker } from "@/components/sections/ticker"
import { Work } from "@/components/sections/work"

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Services />
      <Work />
      <Process />
      <About />
    </>
  )
}
