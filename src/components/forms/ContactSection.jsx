import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Clock, Globe, MapPin, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { contactSchema, contactSubjects } from '../../lib/schemas'
import { ChatButton } from './ChatButton'
import { site, isPlaceholder } from '../../data/site'
import { Field } from './fields'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { EASE } from '../../lib/motion'

const defaults = { name: '', email: '', phone: '', subject: '', message: '', consent: false, website: '' }

export function ContactSection() {
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema), mode: 'onTouched', defaultValues: defaults })

  const onSubmit = async (data) => {
    if (status === 'sending') return
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'We could not send your message. Please try again.')
      reset(defaults)
      setStatus('success')
    } catch (err) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  const input = (name, props = {}) => ({
    id: `contact-${name}`,
    className: 'field-input',
    'aria-invalid': !!errors[name] || undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    ...props,
    ...register(name),
  })

  const details = [
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref || null },
    { icon: Globe, label: 'Website', value: site.url.replace(/^https?:[/][/]/, ''), href: site.url },
    { icon: MapPin, label: 'Areas', value: site.areas.map((a) => a.name).join(', ') },
    { icon: Clock, label: 'Hours', value: site.hours },
  ].filter((d) => !isPlaceholder(d.value))

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-mist py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5 text-forest">Contact</p>
          </Reveal>
          <SplitLines
            lines={['Questions first?', <em className="text-forest">Ask away.</em>]}
            className="display text-[clamp(2rem,3.6vw,3.5rem)] text-ink"
          />
          <h2 id="contact-title" className="sr-only">
            Contact us
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md leading-relaxed text-stone">
              For quotes, questions about a service or anything else, send a message and we will reply as soon as we can.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4 py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-forest">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-wider text-stone uppercase">{label}</span>
                    {href ? (
                      <a href={href} className="font-semibold text-ink hover:text-forest">
                        {value}
                      </a>
                    ) : (
                      <span className="font-semibold text-ink">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <ChatButton className="btn btn-ink mt-8" iconClassName="size-5 text-lime" label={{ whatsapp: 'Message us on WhatsApp' }} />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="rounded-[32px] bg-paper p-5 sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                  role="status"
                >
                  <CheckCircle2 className="mx-auto size-14 text-forest" aria-hidden />
                  <h3 className="display mt-6 text-4xl text-ink">Message sent.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-stone">Thank you for getting in touch. We will reply to the email address you gave us.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost-dark mt-8">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6" exit={{ opacity: 0 }}>
                  <div className="sr-only" aria-hidden>
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" tabIndex={-1} autoComplete="off" {...register('website')} />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="contact-name" error={errors.name?.message}>
                      <input {...input('name', { autoComplete: 'name' })} />
                    </Field>
                    <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
                      <input {...input('email', { type: 'email', autoComplete: 'email' })} />
                    </Field>
                    <Field label="Phone number" htmlFor="contact-phone" optional error={errors.phone?.message}>
                      <input {...input('phone', { type: 'tel', autoComplete: 'tel' })} />
                    </Field>
                    <Field label="Subject" htmlFor="contact-subject" error={errors.subject?.message}>
                      <select {...input('subject', { className: 'field-input appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10' })} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230e2a26' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
                        <option value="">Choose a subject</option>
                        {contactSubjects.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
                    <textarea {...input('message', { rows: 5, className: 'field-input min-h-36 py-3' })} />
                  </Field>
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
                      <input
                        type="checkbox"
                        className="mt-0.5 size-5 shrink-0 accent-[var(--color-forest)]"
                        aria-invalid={!!errors.consent || undefined}
                        {...register('consent')}
                      />
                      <span>
                        I have read the{' '}
                        <Link to="/privacy" className="font-semibold text-forest underline underline-offset-4">
                          privacy notice
                        </Link>{' '}
                        and agree to my details being used to reply to this enquiry.
                      </span>
                    </label>
                    {errors.consent && <p className="field-error" role="alert">{errors.consent.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div role="alert" className="flex gap-3 rounded-2xl border border-[#B42318]/30 bg-[#FEF3F2] p-4 text-sm text-[#7A271A]">
                      <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
                      <p>
                        <span className="font-semibold">Your message was not sent.</span> {serverError}
                      </p>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn btn-lime w-full sm:w-auto disabled:opacity-70">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden /> Sending
                      </>
                    ) : (
                      <>
                        Send message <ArrowRight className="size-4" aria-hidden />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
