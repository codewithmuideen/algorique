import { PageHero } from '../components/layout/PageHero'
import { About } from '../components/sections/About'
import { Formula } from '../components/sections/Formula'
import { WhyUs } from '../components/sections/WhyUs'
import { Gallery } from '../components/gallery/Gallery'
import { Areas } from '../components/sections/Areas'
import { FinalCta } from '../components/sections/FinalCta'
import { images } from '../data/images'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={['Careful people,', 'checked work.']}
        intro="We look after homes, rentals and workplaces with written checklists, the right products for every surface, and a team that takes pride in the finish."
        image={images.teamLivingRoom}
        imagePosition="50% 40%"
      />
      <About />
      <Formula />
      <WhyUs showLink={false} />
      <Gallery />
      <Areas />
      <FinalCta />
    </>
  )
}
