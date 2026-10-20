import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SplitLines } from '../components/animation/SplitLines'
import { Reveal } from '../components/animation/Reveal'

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Shared layout for the privacy, terms and cookie pages.
// `sections` is an array of { title, body } where body is JSX.
export function LegalPage({ title, intro, updated, sections }) {

  return (
    <article className="bg-paper">
      <header className="on-dark bg-ink pt-40 pb-16 text-ivory sm:pt-48 sm:pb-24">
        <div className="container-x">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-ivory/70 hover:text-lime">
            <ArrowLeft className="size-4" aria-hidden /> Back to home
          </Link>
          <SplitLines as="h1" trigger="mount" lines={[title]} className="display text-[clamp(2.4rem,5.5vw,4.5rem)]" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-ivory/75">{intro}</p>
            <p className="mt-4 text-sm text-ivory/50">Last updated: {updated}</p>
          </Reveal>
        </div>
      </header>

      <div className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-forest uppercase">On this page</p>
            <ol className="space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className="flex gap-3 text-stone transition-colors hover:text-ink">
                    <span className="w-5 shrink-0 tabular-nums text-forest">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="max-w-3xl space-y-14 lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.title} id={slug(s.title)} className="scroll-mt-28">
              <h2 className="font-display text-[1.6rem] leading-tight text-ink">
                <span className="mr-3 text-forest">{i + 1}.</span>
                {s.title}
              </h2>
              <div className="legal-body mt-5 space-y-4 leading-relaxed text-stone [&_a]:font-semibold [&_a]:text-forest [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
