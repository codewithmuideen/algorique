import { PageHero } from '../components/layout/PageHero'
import { Process } from '../components/sections/Process'
import { SignatureShowcase } from '../components/services/SignatureShowcase'
import { WhyUs } from '../components/sections/WhyUs'
import { Faq } from '../components/sections/Faq'
import { FinalCta } from '../components/sections/FinalCta'
import { images } from '../data/images'

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title={['From request', 'to spotless.']}
        intro="Booking online sends us a request. We check availability, confirm the details with you personally, and arrive with a checklist built around your space."
        image={images.teamChecklist}
        imagePosition="30% 40%"
      />
      <Process />
      <SignatureShowcase />
      <WhyUs />
      <Faq />
      <FinalCta />
    </>
  )
}
