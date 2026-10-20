import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { Logo } from '../layout/Logo'
import { site, nav } from '../../data/site'
import { services } from '../../data/content'
import { whatsappUrl } from '../../lib/whatsapp'
import { openConsentSettings } from '../../lib/consent'
import { EASE } from '../../lib/motion'

const socialIcons = {
  instagram: [FaInstagram, 'Instagram'],
  facebook: [FaFacebookF, 'Facebook'],
  tiktok: [FaTiktok, 'TikTok'],
  linkedin: [FaLinkedinIn, 'LinkedIn'],
  x: [FaXTwitter, 'X'],
}

function Column({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-lime uppercase">{title}</h3>
      <ul className="space-y-3 text-sm text-ivory/75">{children}</ul>
    </div>
  )
}

const linkClass = 'transition-colors duration-300 hover:text-lime'

export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url)
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="container-x pt-20 pb-10 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="dark" className="h-10 sm:h-12" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">
              Careful cleaning for homes, rentals and workplaces, done to a checklist you can see.
            </p>
            <div className="mt-8 space-y-2">
              {site.email.startsWith('[') ? (
                <p className="text-xl font-semibold text-lime">{site.email}</p>
              ) : (
                <a href={`mailto:${site.email}`} className="block text-xl font-semibold text-lime hover:underline">
                  {site.email}
                </a>
              )}
              {site.phoneHref ? (
                <a href={site.phoneHref} className="block text-xl font-semibold text-lime hover:underline">
                  {site.phone}
                </a>
              ) : (
                <p className="text-xl font-semibold text-lime">{site.phone}</p>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full border border-ivory/20 transition hover:border-lime hover:bg-lime hover:text-ink"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="size-5" aria-hidden />
              </a>
              {socials.map(([key, url]) => {
                const [Icon, label] = socialIcons[key]
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-ivory/20 transition hover:border-lime hover:bg-lime hover:text-ink"
                    aria-label={label}
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <Column title="Services">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Explore">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className={linkClass}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/faq" className={linkClass}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/book" className={linkClass}>
                  Book a cleaning
                </Link>
              </li>
            </Column>
            <Column title="Areas">
              {site.areas.map((a) => (
                <li key={a.name}>
                  <Link to="/contact#areas" className={linkClass}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Legal">
              <li>
                <Link to="/privacy" className={linkClass}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={linkClass}>
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link to="/cookies" className={linkClass}>
                  Cookie policy
                </Link>
              </li>
              <li>
                <button type="button" onClick={openConsentSettings} className={linkClass}>
                  Cookie settings
                </button>
              </li>
            </Column>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
            {site.companyNumber && <span className="block sm:inline sm:pl-2">{site.companyNumber}</span>}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-3 self-start font-semibold text-ivory sm:self-auto"
          >
            Back to top
            <span className="grid size-10 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden />
            </span>
          </button>
        </div>
      </div>

      {/* Oversized wordmark, rising into place */}
      <div className="pointer-events-none overflow-hidden pb-6 select-none sm:pb-10" aria-hidden>
        <motion.p
          className="bg-gradient-to-b from-ivory/45 to-ivory/10 bg-clip-text text-center text-[15.5vw] leading-[0.9] font-bold tracking-[-0.04em] whitespace-nowrap text-transparent"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          ALGORIQUE
        </motion.p>
      </div>
    </footer>
  )
}
