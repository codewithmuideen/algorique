import { useEffect, useState } from 'react'
import { BrandMark } from '../layout/BrandMark'
import { whatsappUrl } from '../../lib/whatsapp'

export const QR_MESSAGE = 'Hello Algorique Cleaners, I would like a free cleaning quote.'

// QR code that opens a WhatsApp chat with the business number. High error
// correction lets the brand mark sit in the centre without breaking scans.
export function WhatsAppQr({ className = 'size-40', message = QR_MESSAGE }) {
  const [svg, setSvg] = useState('')
  const url = whatsappUrl(message)

  useEffect(() => {
    let alive = true
    // Loaded on demand so the QR library is not part of the first page download.
    import('qrcode').then(({ default: QRCode }) => QRCode.toString(url, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 0,
      color: { dark: '#0b1f44', light: '#ffffff' },
    })).then((s) => alive && setSvg(s.replace('<svg ', '<svg width="100%" height="100%" ')))
    return () => {
      alive = false
    }
  }, [url])

  return (
    <div className={`relative ${className}`} role="img" aria-label="QR code: scan to chat with Algorique Cleaners on WhatsApp">
      <div className="size-full" dangerouslySetInnerHTML={{ __html: svg }} />
      <span className="absolute top-1/2 left-1/2 grid size-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[18%] bg-white p-[3%]">
        <BrandMark className="size-full" />
      </span>
    </div>
  )
}
