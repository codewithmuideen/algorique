import { PageHero } from '../components/layout/PageHero'
import { ContactSection } from '../components/forms/ContactSection'
import { Areas } from '../components/sections/Areas'
import { Faq } from '../components/sections/Faq'
import { images } from '../data/images'

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={['Let us know', 'how we can help.']}
        intro="For quotes, questions about a service or anything else, send a message and we will reply as soon as we can."
        image={images.cleanerSmiling}
        imagePosition="60% 30%"
      />
      <ContactSection />
      <Areas />
      <Faq />
    </>
  )
}
