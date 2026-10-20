import { images } from './images.js'

// Services: add, remove or reorder freely. `id` is used by the booking form
// and in links such as /services#residential.
export const services = [
  {
    id: 'residential',
    title: 'Residential cleaning',
    short: 'Weekly, fortnightly or monthly upkeep',
    description:
      'The same high standard every visit. Kitchens, bathrooms and living spaces stay consistently clean, so nothing builds up between one visit and the next.',
    includes: ['Kitchen and bathroom surfaces', 'Vacuuming and mopping', 'Dusting reachable surfaces', 'Bins emptied and relined'],
    image: images.kitchenMopping,
    residential: true,
  },
  {
    id: 'tenancy',
    title: 'End-of-tenancy cleaning',
    short: 'Move-in and move-out ready',
    description:
      'A thorough, room-by-room clean for tenants, landlords and letting agents, prepared with the check-out inventory in mind.',
    includes: ['Inside cupboards and drawers', 'Kitchen appliances inside and out', 'Bathrooms descaled and polished', 'Floors, skirting and interior glass'],
    image: images.teamOpenPlan,
    residential: true,
  },
  {
    id: 'commercial',
    title: 'Commercial cleaning',
    short: 'Offices, shops and shared spaces',
    description:
      'Offices, retail units and communal areas cleaned on a schedule that works around your business, before you open or after you close.',
    includes: ['Desks and shared surfaces', 'Meeting rooms and breakout areas', 'Kitchens, bins and recycling', 'Washrooms cleaned and restocked'],
    image: images.officeVacuum,
    residential: false,
  },
  {
    id: 'airbnb',
    title: 'Airbnb & short-let cleaning',
    short: 'Guest-ready between every stay',
    description:
      'Fast, reliable turnovers between guests for hosts and property managers, so every check-in feels fresh, spotless and five-star ready.',
    includes: ['Full clean between guests', 'Beds made with fresh linen', 'Kitchen and bathroom reset', 'Essentials checked before check-in'],
    image: images.bedroom,
    residential: true,
  },
  {
    id: 'deep',
    title: 'Deep cleaning',
    short: 'A top-to-bottom reset',
    description:
      'For the corners a regular clean does not reach: limescale, grease, skirting boards, behind and beneath. Ideal as a first visit or a seasonal reset.',
    includes: ['Descaling taps, tiles and glass', 'Degreasing kitchen surfaces', 'Skirting boards, doors and switches', 'Behind and under movable furniture'],
    image: images.showerGlass,
    residential: true,
  },
  {
    id: 'builders',
    title: 'After-builders cleaning',
    short: 'From building site to finished space',
    description:
      'Fine dust settles everywhere after building work. We remove it from every surface, fitting and frame so the new space is ready to use.',
    includes: ['Fine dust removed from all surfaces', 'Paint and residue spots on glass', 'Fixtures, fittings and frames', 'Floors vacuumed and washed'],
    image: images.buildersMopping,
    residential: true,
  },
]

// The Algorique formula: right people + right products + proven process.
export const formula = [
  {
    icon: 'people',
    label: 'The right people',
    body: 'Vetted, trained and reliable cleaners who take pride in the finish.',
  },
  {
    icon: 'products',
    label: 'The right products',
    body: 'Professional, eco-friendly cleaning solutions, chosen for every surface.',
  },
  {
    icon: 'process',
    label: 'A proven process',
    body: 'Documented checklists, quality inspections and customer feedback.',
  },
]

// The three services highlighted in the editorial showcase.
export const signature = [
  {
    serviceId: 'deep',
    kicker: 'The reset',
    title: ['Every corner,', 'not just', 'the obvious ones.'],
    body: 'A deep clean works through a room in a fixed order, top to bottom and back to front, so nothing is missed and nothing is cleaned twice.',
    points: ['Limescale removed from taps, tiles and glass', 'Grease lifted from hobs, splashbacks and extractor', 'Skirting, door frames, handles and switches', 'Behind and beneath anything that moves'],
    image: images.bathroomShower,
    detail: images.kitchenFloorScrub,
  },
  {
    serviceId: 'tenancy',
    kicker: 'The hand-over',
    title: ['Ready for', 'the keys to', 'change hands.'],
    body: 'Built around a move-out inventory: inside every cupboard and appliance, every surface left as you would want to find it.',
    points: ['Oven, hob and extractor inside and out', 'Fridge and freezer cleaned and dried', 'Inside all cupboards, wardrobes and drawers', 'Interior windows, sills and frames'],
    image: images.kitchenWipe,
    detail: images.kitchenIsland,
  },
  {
    serviceId: 'commercial',
    kicker: 'The quiet shift',
    title: ['Your business,', 'reset before', 'anyone arrives.'],
    body: 'Scheduled around your working day, with a documented checklist and regular quality inspections you can adjust whenever priorities change.',
    points: ['Desks, screens and phones wiped down', 'Kitchens and break areas cleaned', 'Washrooms cleaned and restocked', 'Bins, recycling and floors'],
    image: images.officeGlass,
    detail: images.officeNight,
  },
]

// Add claims such as "Fully insured" only once the business has confirmed them.
export const reasons = [
  {
    icon: 'calendar',
    title: 'Reliable scheduling',
    body: 'A fixed day and arrival window for regular visits, and a heads-up from us if anything has to change.',
    points: ['Agreed arrival windows', 'Advance notice of any change'],
  },
  {
    icon: 'map',
    title: 'Local to you',
    body: 'Professional cleaning for homes, properties and businesses across Dartford, Bexley and London.',
    points: ['Dartford, Bexley and London', 'Homes, lets and businesses'],
  },
  {
    icon: 'repeat',
    title: 'Flexible plans',
    body: 'Book one-off, weekly, fortnightly or monthly, and change the plan when your routine does.',
    points: ['One-off or recurring', 'Pause or change easily'],
  },
  {
    icon: 'receipt',
    title: 'Clear, upfront quotes',
    body: 'You will know the price before we start, based on your property and the work involved, not on surprises.',
    points: ['Quote before any work', 'No hidden extras'],
  },
]

export const process = [
  { title: 'Choose your service', body: 'Pick the clean you need: regular, deep, end-of-tenancy, office and more.' },
  { title: 'Tell us about the space', body: 'Property type, rooms, and anything we should know before we arrive.' },
  { title: 'Request a date and time', body: 'Share your preferred slot. It is a request, not a booking, until we confirm.' },
  { title: 'We confirm with you', body: 'We check availability and get back to you personally to confirm the details.' },
]

export const faqs = [
  {
    q: 'What is included in a cleaning?',
    a: 'It depends on the service. A regular clean covers kitchens, bathrooms, dusting, vacuuming, mopping and bins. Deep and end-of-tenancy cleans go much further, including inside appliances and cupboards. Each service above lists what is included, and you can add extras when you book.',
  },
  {
    q: 'How do bookings work?',
    a: 'Send a booking request with your service, property details and preferred date and time. It is a request, not a confirmed booking. We check availability and contact you to confirm before anything is scheduled.',
  },
  {
    q: 'How are prices calculated?',
    a: 'Prices depend on the service, the size and condition of the property, how often you would like us to visit, and any extras. We give you a clear quote before any work begins.',
  },
  {
    q: 'Do I need to supply cleaning products?',
    a: 'No. We bring professional, eco-friendly cleaning products and equipment. If you would like particular products used, for example because of allergies or surfaces that need special care, add a note when you book.',
  },
  {
    q: 'Can I reschedule a booking?',
    a: 'Yes. Let us know as early as you can by phone, email or WhatsApp and we will find another time that works. Please check our terms for notice periods.',
  },
  {
    q: 'Which locations do you cover?',
    a: 'We clean homes, properties and businesses across Dartford, Bexley and London. You can check your postcode on our contact page. If you are just outside these areas, get in touch and we will tell you whether we can help.',
  },
  {
    q: 'Do you clean Airbnb and short-let properties?',
    a: 'Yes. We provide turnover cleans between guests for hosts and property managers, with beds made, kitchens and bathrooms reset, and essentials checked before the next check-in.',
  },
  {
    q: 'Do I need to be home during the clean?',
    a: 'No, as long as we have safe access. Many clients arrange key access or a code. We will agree the arrangement with you beforehand.',
  },
]

// PLACEHOLDERS ONLY. Replace with real reviews from real customers, quoted with
// their permission, before launch. Placeholder entries are visibly labelled.
export const reviews = [
  {
    quote: 'Placeholder review: replace with a genuine customer quote about their regular clean.',
    name: '[Customer name]',
    role: '[Regular home cleaning · Area]',
    placeholder: true,
  },
  {
    quote: 'Placeholder review: replace with a genuine quote from a landlord, tenant or letting agent.',
    name: '[Customer name]',
    role: '[End-of-tenancy · Area]',
    placeholder: true,
  },
  {
    quote: 'Placeholder review: replace with a genuine quote from a commercial client.',
    name: '[Customer name]',
    role: '[Office cleaning · Company]',
    placeholder: true,
  },
]

// Gallery. `illustrative: true` marks stock photography (shown with a label).
// For real before/after work, add `before` alongside `image` with the
// client's permission. The lightbox then shows a comparison slider.
export const gallery = [
  { image: images.kitchenWhite, title: 'Kitchen', tag: 'Deep clean', illustrative: true },
  { image: images.bathroomTub, title: 'Bathroom', tag: 'Regular clean', illustrative: true },
  { image: images.livingBright, title: 'Open-plan living', tag: 'End of tenancy', illustrative: true },
  { image: images.bedroom, title: 'Bedroom', tag: 'Regular clean', illustrative: true },
  { image: images.glassHouse, title: 'Glazing & stairs', tag: 'After builders', illustrative: true },
  { image: images.apartmentPlants, title: 'Apartment', tag: 'Move-in', illustrative: true },
]

export const bookingOptions = {
  propertyTypes: ['Flat / apartment', 'House', 'Airbnb / short-let', 'Office / commercial', 'Other'],
  // Property types that ask for bedrooms and bathrooms.
  residentialTypes: ['Flat / apartment', 'House', 'Airbnb / short-let'],
  bedrooms: ['Studio', '1', '2', '3', '4', '5', '6+'],
  bathrooms: ['1', '2', '3', '4', '5+'],
  times: ['Morning (8am to 12pm)', 'Afternoon (12pm to 4pm)', 'Evening (4pm to 7pm)', 'Flexible'],
  frequencies: ['One-off', 'Weekly', 'Fortnightly', 'Monthly'],
  extras: ['Inside oven', 'Inside fridge', 'Interior windows', 'Inside cupboards', 'Change bed linen', 'Balcony or patio'],
}
