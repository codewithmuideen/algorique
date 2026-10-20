import { Link } from 'react-router-dom'
import { LegalPage } from './LegalPage'
import { site } from '../data/site'

// Business-specific values are in [BRACKETS]. Confirm them, and have the
// final terms reviewed, before launch (see README).
export default function Terms() {
  const sections = [
    {
      title: 'About these terms',
      body: (
        <p>
          These terms apply when you use this website and when you book a cleaning service with {site.legalName}, trading as{' '}
          {site.name}. Please read them before requesting a booking. Nothing in these terms affects your legal rights as a
          consumer.
        </p>
      ),
    },
    {
      title: 'Booking requests',
      body: (
        <>
          <p>
            Submitting the booking form, sending an email or messaging us on WhatsApp is a <strong>request</strong>, not a
            confirmed booking. The date and time you choose are preferences.
          </p>
          <p>
            A booking is confirmed only when we contact you to confirm the service, date, time and price. We may suggest a
            different time if your preferred slot is not available.
          </p>
        </>
      ),
    },
    {
      title: 'Quotes and prices',
      body: (
        <>
          <p>
            Prices depend on the service, the size and condition of the property, the frequency and any extras. We will give
            you a quote before any work starts.
          </p>
          <p>
            If the property is in a significantly different condition or size from what was described, we will talk to you
            before continuing and agree any change to the price.
          </p>
        </>
      ),
    },
    {
      title: 'Payment',
      body: (
        <p>
          No payment is taken on this website. Payment terms, including how and when to pay, are [to be confirmed by the
          business, for example: payment is due on the day of the clean by bank transfer or card].
        </p>
      ),
    },
    {
      title: 'Access, safety and preparation',
      body: (
        <ul>
          <li>Please make sure we can get into the property at the agreed time, either by being there or by arranging key or code access.</li>
          <li>We need running water, electricity and safe working conditions.</li>
          <li>Please tell us in advance about pets, alarms, fragile items or surfaces that need special care.</li>
          <li>We may decline or stop work if conditions are unsafe.</li>
        </ul>
      ),
    },
    {
      title: 'Rescheduling and cancellation',
      body: (
        <>
          <p>You can reschedule or cancel a confirmed booking free of charge with at least [48 hours] notice.</p>
          <p>
            For cancellations with less notice, or if we cannot get in at the agreed time, a charge of [amount or percentage]
            may apply. We will always tell you if we need to move a booking, and agree a new time with you.
          </p>
        </>
      ),
    },
    {
      title: 'If something is not right',
      body: (
        <p>
          If you are not happy with any part of a clean, please tell us within [24 hours] by phone, email or WhatsApp,
          ideally with photos. We will look into it and, where appropriate, come back to put it right.
        </p>
      ),
    },
    {
      title: 'Damage and liability',
      body: (
        <p>
          We take great care in every home and workplace. If anything is damaged as a result of our work, please tell us as
          soon as possible so we can deal with it fairly. We are not responsible for pre-existing damage, wear and tear, or
          items that were not properly secured. We do not exclude liability where it would be unlawful to do so, including for
          death or personal injury caused by negligence.
        </p>
      ),
    },
    {
      title: 'Using this website',
      body: (
        <p>
          We try to keep the information on this website accurate, but it is general information and may change. Photography
          may be illustrative. You must not misuse the website or its forms.
        </p>
      ),
    },
    {
      title: 'Your information',
      body: (
        <p>
          We use the information you give us as described in our <Link to="/privacy">privacy policy</Link>.
        </p>
      ),
    },
    {
      title: 'Complaints and governing law',
      body: (
        <p>
          If you have a complaint, contact us at {site.email} and we will do our best to resolve it. These terms are governed by
          the law of England and Wales, and the courts of England and Wales have jurisdiction, unless you live in Scotland or
          Northern Ireland, in which case you may also bring proceedings there.
        </p>
      ),
    },
  ]

  return (
    <LegalPage
      title="Terms and conditions"
      intro="The terms that apply to booking requests, confirmed cleans and the use of this website."
      updated="[Date of publication]"
      sections={sections}
    />
  )
}
