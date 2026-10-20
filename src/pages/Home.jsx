import { Hero } from '../components/hero/Hero'
import { Marquee } from '../components/sections/Marquee'
import { About } from '../components/sections/About'
import { Formula } from '../components/sections/Formula'
import { ServicesScroller } from '../components/services/ServicesScroller'
import { SignatureShowcase } from '../components/services/SignatureShowcase'
import { WhyUs } from '../components/sections/WhyUs'
import { Process } from '../components/sections/Process'
import { Reviews } from '../components/testimonials/Reviews'
import { FinalCta } from '../components/sections/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About showLink />
      <Formula />
      <ServicesScroller />
      <SignatureShowcase />
      <WhyUs />
      <Process />
      <Reviews />
      <FinalCta />
    </>
  )
}
