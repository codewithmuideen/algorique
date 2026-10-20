// Business configuration. Anything in [BRACKETS] is a placeholder; fields
// left as placeholders or empty are hidden from the site automatically.

export const site = {
  name: 'Algorique Cleaners',
  // Production address, no trailing slash. Used for canonical links, social
  // previews, structured data and the sitemap. Can also be overridden at build
  // time with the SITE_URL environment variable.
  url: 'https://www.algoriquecleaners.co.uk',
  shortName: 'Algorique',
  slogan: 'Your cleaning needs. Solved.™',
  promise: 'The formula for a cleaner, brighter space.',
  motto: 'Cleaner spaces. Brighter lives.',
  locale: 'en-GB',

  // Shown publicly. The inbox that receives form submissions is set
  // separately with BUSINESS_EMAIL on the server.
  email: 'hello@algoriquecleaners.co.uk',
  phone: '020 8123 4567',
  phoneHref: 'tel:+442081234567',
  hours: '', // e.g. 'Monday to Friday, 8am to 6pm'. Hidden while empty.

  // WhatsApp Business number in international format, digits only, e.g.
  // '447700900123'. While empty, every WhatsApp button becomes a "Call us"
  // button using the phone number above.
  whatsappNumber: '',

  // Add only profiles the business actually owns. Empty entries are hidden.
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    linkedin: '',
    x: '',
  },

  // Areas served. Postcode districts power the "Check your postcode" tool:
  // a full district ('DA1') matches exactly; letters only ('SE') match every
  // district in that London postcode area.
  areas: [
    { name: 'Dartford', prefixes: ['DA1', 'DA2', 'DA3', 'DA4', 'DA9', 'DA10'] },
    { name: 'Bexley', prefixes: ['DA5', 'DA6', 'DA7', 'DA8', 'DA14', 'DA15', 'DA16', 'DA17', 'DA18'] },
    { name: 'London', prefixes: ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'] },
  ],

  // If trading as a limited company, set its registered name and number here.
  legalName: 'Algorique Cleaners',
  companyNumber: '', // e.g. 'Registered in England & Wales No. 12345678'
  registeredAddress: '', // Only if the business wants it published.
}

export const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim())

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services', dropdown: true },
  { label: 'About', to: '/about' },
  { label: 'Our Process', to: '/process' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]
