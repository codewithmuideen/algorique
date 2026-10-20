import { PageHero } from '../components/layout/PageHero'
import { ServiceList } from '../components/services/ServiceList'
import { SignatureShowcase } from '../components/services/SignatureShowcase'
import { Process } from '../components/sections/Process'
import { FinalCta } from '../components/sections/FinalCta'
import { images } from '../data/images'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={['Cleaning that fits', 'your life.']}
        intro="From a weekly tidy to a full move-out reset, every service follows a written checklist and can be booked as a one-off or on a schedule."
        image={images.kitchenIsland}
      />
      <ServiceList />
      <SignatureShowcase />
      <Process />
      <FinalCta />
    </>
  )
}
