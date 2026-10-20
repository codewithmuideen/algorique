// Search and social metadata for every route, plus structured data (JSON-LD).
// Used in the browser (src/components/layout/Seo.jsx) and at build time to
// write a static HTML file per route (see vite.config.js), so crawlers and link
// previews see the right tags without running JavaScript.
// Imports use explicit .js extensions because Node loads this file at build time.
import { site } from './site.js'
import { services, faqs } from './content.js'

const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim())

export const routes = [
  {
    path: '/',
    title: 'Algorique Cleaners | Home, Office and End-of-Tenancy Cleaning',
    description:
      'Careful, checklist-led cleaning for homes, rentals and workplaces: regular and deep cleans, end-of-tenancy, office, carpet and after-builders cleaning. Request a booking online.',
    heading: 'Spotless spaces for homes and workplaces',
    image: '/og-image.jpg',
    priority: '1.0',
  },
  {
    path: '/services',
    name: 'Services',
    title: 'Cleaning Services | Algorique Cleaners',
    description:
      'Regular home cleaning, deep cleaning, end-of-tenancy, office and commercial, carpet and upholstery, and after-builders cleaning. Book a one-off or recurring clean.',
    heading: 'Cleaning that fits your life',
    image: '/images/kitchen-island.jpg',
    priority: '0.9',
  },
  {
    path: '/book',
    name: 'Book a cleaning',
    title: 'Book a Cleaning | Algorique Cleaners',
    description:
      'Request a cleaning in a couple of minutes. Choose your service, property details and preferred date, and we will confirm availability with you personally.',
    heading: 'Request your cleaning',
    image: '/images/team/kitchen-wipe.jpg',
    priority: '0.9',
  },
  {
    path: '/about',
    name: 'About',
    title: 'About Us | Algorique Cleaners',
    description:
      'Who we are and how we work: written room-by-room checklists, the right products for every surface, and a team that takes pride in the finish.',
    heading: 'Careful people, checked work',
    image: '/images/team/team-living-room.jpg',
    priority: '0.7',
  },
  {
    path: '/process',
    name: 'Our process',
    title: 'How It Works | Algorique Cleaners',
    description:
      'How booking a clean works, from your request to a confirmed visit: choose a service, tell us about the space, request a date, and we confirm with you.',
    heading: 'From request to spotless',
    image: '/images/team/team-checklist.jpg',
    priority: '0.7',
  },
  {
    path: '/reviews',
    name: 'Reviews',
    title: 'Client Reviews | Algorique Cleaners',
    description: 'What clients say about Algorique Cleaners, and the finish they come home to.',
    heading: 'Real homes. Lasting results.',
    image: '/images/living-bright.jpg',
    priority: '0.6',
  },
  {
    path: '/contact',
    name: 'Contact',
    title: 'Contact Us | Algorique Cleaners',
    description: 'Get in touch for quotes, questions about a service, or help with a booking. See the areas we cover.',
    heading: 'Let us know how we can help',
    image: '/images/team/cleaner-smiling.jpg',
    priority: '0.8',
  },
  {
    path: '/faq',
    name: 'FAQs',
    title: 'Cleaning FAQs | Algorique Cleaners',
    description: 'Answers to common questions: what is included, how bookings and prices work, products, rescheduling and areas covered.',
    heading: 'Everything to know before booking',
    image: '/images/bathroom-wood.jpg',
    priority: '0.6',
  },
  {
    path: '/privacy',
    name: 'Privacy policy',
    title: 'Privacy Policy | Algorique Cleaners',
    description: 'How Algorique Cleaners collects, uses and protects your personal information.',
    heading: 'Privacy policy',
    priority: '0.3',
  },
  {
    path: '/terms',
    name: 'Terms and conditions',
    title: 'Terms and Conditions | Algorique Cleaners',
    description: 'The terms that apply to booking requests, confirmed cleans and the use of this website.',
    heading: 'Terms and conditions',
    priority: '0.3',
  },
  {
    path: '/cookies',
    name: 'Cookie policy',
    title: 'Cookie Policy | Algorique Cleaners',
    description: 'Which cookies this website uses, why, and how to change your choices.',
    heading: 'Cookie policy',
    priority: '0.3',
  },
]

export const notFound = {
  path: '/404',
  title: 'Page Not Found | Algorique Cleaners',
  description: 'The page you were looking for does not exist or has moved.',
  heading: 'Page not found',
  noindex: true,
}

export const routeFor = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? notFound
}

export const absolute = (base, path) => (/^https?:/.test(path) ? path : `${base}${path === '/' ? '/' : path}`)

// Structured data. Contact details are only included once they are real, so
// placeholders never reach search engines.
export function jsonLd(route, base) {
  const orgId = `${base}/#organization`
  const business = {
    '@type': 'LocalBusiness',
    '@id': orgId,
    name: site.name,
    url: `${base}/`,
    logo: `${base}/brand/logo-color.png`,
    image: `${base}/og-image.jpg`,
    description: routes[0].description,
  }
  if (!isPlaceholder(site.email)) business.email = site.email
  if (site.phoneHref) business.telephone = site.phoneHref.replace(/^tel:/, '')
  const areas = site.areas.map((a) => a.name).filter((n) => !isPlaceholder(n))
  if (areas.length) business.areaServed = areas.map((name) => ({ '@type': 'Place', name }))
  const sameAs = Object.values(site.social).filter(Boolean)
  if (sameAs.length) business.sameAs = sameAs
  business.makesOffer = services.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.title, description: s.description },
  }))

  const graph = [
    business,
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: `${base}/`,
      name: site.name,
      inLanguage: 'en-GB',
      publisher: { '@id': orgId },
    },
    {
      '@type': 'WebPage',
      '@id': `${absolute(base, route.path)}#webpage`,
      url: absolute(base, route.path),
      name: route.title,
      description: route.description,
      isPartOf: { '@id': `${base}/#website` },
      about: { '@id': orgId },
      inLanguage: 'en-GB',
    },
  ]

  if (route.path !== '/' && route.name) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: route.name, item: absolute(base, route.path) },
      ],
    })
  }

  if (route.path === '/services') {
    graph.push({
      '@type': 'ItemList',
      name: 'Cleaning services',
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          url: `${base}/services#${s.id}`,
          provider: { '@id': orgId },
          serviceType: s.title,
        },
      })),
    })
  }

  if (route.path === '/faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
