import { PageHero } from '../components/layout/PageHero'
import { Booking } from '../components/booking/Booking'
import { Faq } from '../components/sections/Faq'
import { images } from '../data/images'

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a cleaning"
        title={['Request your', 'cleaning.']}
        intro="Tell us about your space and when suits you. Your date and time are preferences until we confirm them with you personally."
        image={images.kitchenWipe}
        imagePosition="50% 30%"
      />
      <Booking />
      <Faq />
    </>
  )
}
