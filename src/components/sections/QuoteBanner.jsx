import { motion } from 'framer-motion'
import { Phone, Mail, Globe, MapPin, ScanLine } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { site } from '../../data/site'
import { whatsappUrl, hasWhatsapp } from '../../lib/whatsapp'
import { WhatsAppQr, QR_MESSAGE } from '../forms/WhatsAppQr'
import { Reveal } from '../animation/Reveal'
import { EASE, viewport } from '../../lib/motion'

// Site-wide "Get a free quote" band with phone, email and a WhatsApp QR code.
export function QuoteBanner() {
  const website = site.url.replace(/^https?:[/][/]/, '')
  return (
    <section aria-labelledby="quote-title" className="bg-paper px-2 pt-16 pb-2 sm:px-3 sm:pt-24 sm:pb-3">
      <Reveal>
        <div className="on-dark relative isolate overflow-hidden rounded-[28px] bg-ink text-white lg:rounded-[36px]">
          {/* Soft blue wave and a fine green line, echoing the hero */}
          <svg className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1400 520" preserveAspectRatio="none" aria-hidden>
            <path d="M0 0H760C640 120 700 300 520 420C400 500 180 470 0 520Z" fill="var(--color-ink-2)" />
            <motion.path
              d="M760 0C640 120 700 300 520 420C400 500 180 470 0 520"
              fill="none"
              stroke="var(--color-lime)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={{ duration: 2, ease: EASE }}
            />
          </svg>

          <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-16 lg:py-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
              <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-white text-ink sm:size-20">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.4s]" aria-hidden />
                <Phone className="relative size-7 sm:size-8" strokeWidth={2.2} aria-hidden />
              </span>
              <div>
                <h2 id="quote-title" className="text-xl font-semibold sm:text-2xl">
                  Get a free quote today
                </h2>
                <a
                  href={site.phoneHref}
                  className="mt-1 block text-[clamp(2.2rem,5vw,3.6rem)] leading-tight font-bold tracking-[-0.02em] transition-colors hover:text-lime"
                >
                  {site.phone}
                </a>
                <ul className="mt-4 space-y-2.5 text-[15px] text-white/85 sm:text-base">
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-lime">
                      <span className="grid size-8 place-items-center rounded-full bg-white/10">
                        <Mail className="size-4" aria-hidden />
                      </span>
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.url} className="inline-flex items-center gap-3 hover:text-lime">
                      <span className="grid size-8 place-items-center rounded-full bg-white/10">
                        <Globe className="size-4" aria-hidden />
                      </span>
                      {website}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {hasWhatsapp && (
              <div className="flex items-center gap-6 lg:border-l lg:border-white/15 lg:pl-16">
                {/* QR on larger screens: you cannot scan your own phone screen */}
                <motion.div
                  className="hidden rounded-[24px] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] sm:block"
                  initial={{ rotate: -4, y: 20, opacity: 0 }}
                  whileInView={{ rotate: 0, y: 0, opacity: 1 }}
                  viewport={viewport}
                  transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                >
                  <WhatsAppQr className="size-36 lg:size-40" />
                </motion.div>
                <div className="hidden max-w-[12rem] sm:block">
                  <p className="flex items-center gap-2 text-lg font-semibold">
                    <ScanLine className="size-5 text-lime" aria-hidden /> Scan to chat
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    Point your phone camera at the code to open a WhatsApp chat with us.
                  </p>
                </div>
                <a
                  href={whatsappUrl(QR_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lime w-full sm:hidden"
                >
                  <FaWhatsapp className="size-5" aria-hidden /> Chat on WhatsApp
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 bg-lime px-6 py-3.5 text-center text-[15px] font-semibold text-ink">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> {site.coverage}
            </span>
            <span className="hidden text-ink/70 sm:inline">{site.audiences.join('  |  ')}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
