import { PageHero } from '../components/layout/PageHero'
import { Faq } from '../components/sections/Faq'
import { images } from '../data/images'

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title={['Everything to know', 'before booking.']}
        intro="What is included, how bookings and prices work, and what to expect on the day."
        image={images.bathroomWood}
      />
      <Faq />
    </>
  )
}
