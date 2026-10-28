import { Hero } from "@/components/sections/hero"
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
    </>
  )
}
