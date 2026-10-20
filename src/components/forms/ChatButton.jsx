import { Phone } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { chatAction } from '../../lib/whatsapp'

// "WhatsApp us" when a WhatsApp number is configured, otherwise "Call ...".
export function ChatButton({ message, className, label, iconClassName = 'size-5' }) {
  const chat = chatAction(message)
  const Icon = chat.kind === 'whatsapp' ? FaWhatsapp : Phone
  return (
    <a href={chat.href} className={className} {...(chat.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <Icon className={iconClassName} aria-hidden /> {label?.[chat.kind] ?? chat.label}
    </a>
  )
}
