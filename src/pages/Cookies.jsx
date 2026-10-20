import { Link } from 'react-router-dom'
import { LegalPage } from './LegalPage'
import { site } from '../data/site'
import { CONSENT_COOKIE, openConsentSettings } from '../lib/consent'

// Keep this table in sync with any analytics or marketing tools you add.
const cookieTable = [
  {
    name: CONSENT_COOKIE,
    type: 'Strictly necessary',
    purpose: 'Remembers your cookie choices so we do not ask again on every visit.',
    duration: '6 months',
  },
]

export default function Cookies() {
  const sections = [
    {
      title: 'What cookies are',
      body: (
        <p>
          Cookies are small text files stored on your device when you visit a website. Some are needed for a site to work;
          others help the owner understand how the site is used.
        </p>
      ),
    },
    {
      title: 'Cookies we use',
      body: (
        <>
          <p>This website currently sets only the following cookie:</p>
          <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-mist text-ink">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Name</th>
                  <th scope="col" className="px-4 py-3 font-bold">Type</th>
                  <th scope="col" className="px-4 py-3 font-bold">Purpose</th>
                  <th scope="col" className="px-4 py-3 font-bold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {cookieTable.map((c) => (
                  <tr key={c.name}>
                    <td className="px-4 py-3 font-mono text-[13px] text-ink">{c.name}</td>
                    <td className="px-4 py-3">{c.type}</td>
                    <td className="px-4 py-3">{c.purpose}</td>
                    <td className="px-4 py-3">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Our fonts are hosted on this website itself, so no third party is contacted when the page loads. We do not
            currently use analytics or advertising cookies. If we add them in future, they will only run after you switch them
            on, and they will be listed here.
          </p>
        </>
      ),
    },
    {
      title: 'Third party links',
      body: (
        <p>
          If you click a WhatsApp or social media link, you leave this website and that service may set its own cookies under
          its own policy.
        </p>
      ),
    },
    {
      title: 'Managing your choices',
      body: (
        <>
          <p>You can change your choices at any time:</p>
          <p>
            <button type="button" onClick={openConsentSettings} className="btn btn-ink">
              Open cookie settings
            </button>
          </p>
          <p>
            You can also delete or block cookies in your browser settings. If you block the strictly necessary cookie, we will
            ask for your choice again on each visit.
          </p>
        </>
      ),
    },
    {
      title: 'More information',
      body: (
        <p>
          For more about how we handle personal information, see our <Link to="/privacy">privacy policy</Link> or contact us at{' '}
          {site.email}.
        </p>
      ),
    },
  ]

  return (
    <LegalPage
      title="Cookie policy"
      intro="Which cookies this website uses, why, and how to change your choices."
      updated="[Date of publication]"
      sections={sections}
    />
  )
}
