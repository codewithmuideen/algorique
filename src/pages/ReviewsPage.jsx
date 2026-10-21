import { PageHero } from '../components/layout/PageHero'
import { Reviews } from '../components/testimonials/Reviews'
import { Gallery } from '../components/gallery/Gallery'
import { images } from '../data/images'

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={['Real homes.', 'Lasting results.']}
        intro="Every visit we finish is more than a quick tidy. Here is what our clients say, and the kind of finish they come home to."
        image={images.livingBright}
      />
      <Reviews />
      <Gallery />
    </>
  )
}
