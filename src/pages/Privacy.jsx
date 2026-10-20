import { Link } from 'react-router-dom'
import { LegalPage } from './LegalPage'
import { site } from '../data/site'
import { openConsentSettings } from '../lib/consent'

// Written for a UK business under the UK GDPR and the Data Protection Act 2018.
// Values in [BRACKETS] come from src/data/site.js or need confirming. Have the
// final text reviewed before launch (see README).
export default function Privacy() {
  const sections = [
    {
      title: 'Who we are',
      body: (
        <>
          <p>
            This website is operated by{' '}
            {site.legalName === site.name ? site.name : `${site.legalName}, trading as ${site.name}`} (“we”, “us”, “our”). We are the controller
            of the personal information you give us through this website.
          </p>
          <p>
            You can contact us about this policy or your information at <strong>{site.email}</strong> or on{' '}
            <strong>{site.phone}</strong>.
            {site.registeredAddress && <> Our registered address is {site.registeredAddress}.</>}
          </p>
        </>
      ),
    },
    {
      title: 'Information we collect',
      body: (
        <>
          <p>We only collect information you choose to give us:</p>
          <ul>
            <li>
              <strong>Booking requests:</strong> your name, email address, telephone number, property address or postcode,
              property type and size, the service you want, your preferred date, time and frequency, any extras, and any notes
              you add.
            </li>
            <li>
              <strong>Contact enquiries:</strong> your name, email address, optional phone number, the subject and your
              message.
            </li>
            <li>
              <strong>WhatsApp:</strong> if you choose to message us on WhatsApp, we receive your phone number, your WhatsApp
              profile name and the messages you send.
            </li>
          </ul>
          <p>
            Please do not include sensitive information, such as health details, in the notes or message fields unless it is
            needed for us to clean safely (for example an allergy to certain products).
          </p>
        </>
      ),
    },
    {
      title: 'How we use your information',
      body: (
        <>
          <p>We use your information to:</p>
          <ul>
            <li>respond to your enquiry or booking request;</li>
            <li>check availability, prepare a quote and confirm the details of a booking with you;</li>
            <li>carry out and manage the cleaning services you book;</li>
            <li>keep records we are required to keep by law, for example for tax purposes.</li>
          </ul>
          <p>We do not sell your information, and we do not use it for marketing unless you have separately agreed to that.</p>
        </>
      ),
    },
    {
      title: 'Our lawful basis',
      body: (
        <ul>
          <li>
            <strong>Steps before a contract, and the contract itself:</strong> when you request a booking or a quote, we use
            your details to respond and, if you go ahead, to provide the service.
          </li>
          <li>
            <strong>Legitimate interests:</strong> to answer general enquiries and to run our business properly, where this
            does not override your rights.
          </li>
          <li>
            <strong>Legal obligation:</strong> to keep financial records.
          </li>
          <li>
            <strong>Consent:</strong> for optional cookies, which you can change at any time.
          </li>
        </ul>
      ),
    },
    {
      title: 'How your information is sent and stored',
      body: (
        <>
          <p>
            When you submit a form, your details are validated and sent to our business email inbox. This website does not keep
            a database of submissions. The services involved are:
          </p>
          <ul>
            <li>
              <strong>Website hosting</strong> [Vercel Inc.], which runs the website and processes the form submission in
              order to send it.
            </li>
            <li>
              <strong>Email delivery</strong> by Resend, which delivers the form submission to our inbox.
            </li>
            <li>
              <strong>Our email provider</strong> [Email provider], where messages are stored.
            </li>
            <li>
              <strong>WhatsApp</strong>, operated by WhatsApp Ireland Limited (Meta), if you choose to contact us there. Its
              use is governed by WhatsApp’s own privacy policy.
            </li>
          </ul>
          <p>
            Some of these providers may process information outside the UK. Where they do, the transfer is protected by
            appropriate safeguards, such as the UK International Data Transfer Addendum or an adequacy decision.
          </p>
        </>
      ),
    },
    {
      title: 'Who we share it with',
      body: (
        <p>
          We share your information only with the providers listed above, with the members of our team who need it to respond
          to you or carry out your clean, and where we are required to by law. Every provider acts on our instructions.
        </p>
      ),
    },
    {
      title: 'How long we keep it',
      body: (
        <ul>
          <li>Enquiries and booking requests that do not lead to a booking: up to [12 months], then deleted.</li>
          <li>Information about customers and completed bookings: for as long as you are a customer, then up to [6 years] for accounting and legal purposes.</li>
        </ul>
      ),
    },
    {
      title: 'Your rights',
      body: (
        <>
          <p>Under UK data protection law you have the right to:</p>
          <ul>
            <li>ask for a copy of the information we hold about you;</li>
            <li>ask us to correct information that is wrong or incomplete;</li>
            <li>ask us to delete your information, or restrict how we use it;</li>
            <li>object to how we use your information where we rely on legitimate interests;</li>
            <li>ask for your information to be transferred to another organisation;</li>
            <li>withdraw consent at any time, where we rely on consent.</li>
          </ul>
          <p>To use any of these rights, contact us at {site.email}. We will respond within one month.</p>
        </>
      ),
    },
    {
      title: 'Cookies',
      body: (
        <p>
          We use one strictly necessary cookie to remember your cookie choice. Optional analytics or marketing cookies are only
          used if you switch them on. See our <Link to="/cookies">cookie policy</Link> or{' '}
          <button type="button" onClick={openConsentSettings} className="font-semibold text-forest underline underline-offset-4">
            change your cookie settings
          </button>
          .
        </p>
      ),
    },
    {
      title: 'Complaints',
      body: (
        <p>
          If you are unhappy with how we have handled your information, please contact us first so we can put it right. You
          also have the right to complain to the Information Commissioner’s Office (ICO) at{' '}
          <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>{' '}
          or on 0303 123 1113.
        </p>
      ),
    },
    {
      title: 'Changes to this policy',
      body: <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>,
    },
  ]

  return (
    <LegalPage
      title="Privacy policy"
      intro="How we collect, use and protect the information you share with us through this website, our forms and WhatsApp."
      updated="[Date of publication]"
      sections={sections}
    />
  )
}
