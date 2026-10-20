import { Link } from 'react-router-dom'
import { SplitLines } from '../components/animation/SplitLines'

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[85svh] items-center bg-ink pt-32 pb-20 text-ivory">
      <div className="container-x">
        <p className="eyebrow mb-6 text-lime">Error 404</p>
        <SplitLines
          as="h1"
          trigger="mount"
          lines={['This corner', <>is <em className="text-lime">already clean.</em></>]}
          className="display text-[clamp(2.4rem,6vw,5rem)]"
        />
        <p className="mt-6 max-w-md text-lg text-ivory/70">The page you were looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-lime">
            Back to home
          </Link>
          <Link to="/contact" className="btn btn-ghost-light">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
