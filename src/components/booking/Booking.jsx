import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Clock, CalendarCheck, CreditCard, Loader2, PencilLine, AlertCircle } from 'lucide-react'
import { services, bookingOptions } from '../../data/content'
import { images } from '../../data/images'
import { bookingSchema, bookingSteps, serviceTitle } from '../../lib/schemas'
import { whatsappUrl, hasWhatsapp, bookingWhatsappMessage, formatDate } from '../../lib/whatsapp'
import { site } from '../../data/site'
import { ChatButton } from '../forms/ChatButton'
import { Field, Chips } from '../forms/fields'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { EASE, cn } from '../../lib/motion'

const defaults = {
  service: '',
  propertyType: '',
  bedrooms: '',
  bathrooms: '',
  postcode: '',
  date: '',
  time: '',
  frequency: 'One-off',
  extras: [],
  notes: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
  website: '',
}

const isResidential = (type) => bookingOptions.residentialTypes.includes(type)

const todayIso = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 48, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
  exit: (dir) => ({ opacity: 0, x: dir * -48, filter: 'blur(6px)', transition: { duration: 0.35, ease: EASE } }),
}

export function Booking() {
  const [[step, dir], setStep] = useState([0, 1])
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')
  const cardRef = useRef(null)
  const [params] = useSearchParams()
  const presetService = params.get('service')

  const {
    register,
    control,
    trigger,
    setValue,
    setError,
    clearErrors,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(bookingSchema), mode: 'onTouched', defaultValues: defaults })

  const values = useWatch({ control })

  // /book?service=deep preselects a service.
  useEffect(() => {
    if (!presetService || !services.some((s) => s.id === presetService)) return
    setValue('service', presetService)
    if (status === 'success') setStatus('idle')
    setStep([0, -1])
  }, [presetService]) // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (next) => {
    setStep([next, next > step ? 1 : -1])
    // Keep the top of the card in view on small screens.
    requestAnimationFrame(() => {
      const top = cardRef.current?.getBoundingClientRect().top ?? 0
      if (top < 0) cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const next = async () => {
    const fields = bookingSteps[step].fields
    let ok = await trigger(fields)
    if (step === 0) {
      const v = getValues()
      if (isResidential(v.propertyType)) {
        if (!v.bedrooms) {
          setError('bedrooms', { message: 'Please choose the number of bedrooms.' })
          ok = false
        }
        if (!v.bathrooms) {
          setError('bathrooms', { message: 'Please choose the number of bathrooms.' })
          ok = false
        }
      }
    }
    if (ok) goTo(step + 1)
    else {
      // Wait for the error messages to render, then bring the first into view.
      setTimeout(() => {
        const first = cardRef.current?.querySelector('[role="alert"]')
        const r = first?.getBoundingClientRect()
        if (r && (r.top < 90 || r.bottom > window.innerHeight)) first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 60)
    }
  }

  const onSubmit = async (data) => {
    if (status === 'sending') return
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, bedrooms: isResidential(data.propertyType) ? data.bedrooms : '', bathrooms: isResidential(data.propertyType) ? data.bathrooms : '' }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'We could not send your request. Please try again.')
      setStatus('success')
    } catch (err) {
      setServerError(err.message || 'We could not send your request. Please try again.')
      setStatus('error')
    }
  }

  const waMessage = bookingWhatsappMessage({
    serviceName: values.service ? serviceTitle(values.service) : '',
    date: values.date,
    time: values.time,
  })

  return (
    <section id="book" aria-labelledby="book-title" className="relative bg-ink py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: context and reassurance */}
        <div className="on-dark text-ivory lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-5 text-lime">Book a cleaning</p>
            </Reveal>
            <SplitLines
              as="h2"
              lines={['Tell us what', <>you need. <em className="text-lime">We’ll</em></>, <em className="text-lime">do the rest.</em>]}
              className="display text-[clamp(2rem,3.4vw,3.2rem)]"
            />
            <span id="book-title" className="sr-only">
              Booking request form
            </span>

            <ul className="mt-10 space-y-5 text-[15px] text-ivory/80">
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden />
                Takes about two minutes.
              </li>
              <li className="flex gap-4">
                <CalendarCheck className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden />
                Your date and time are preferences. We check availability and confirm with you personally.
              </li>
              <li className="flex gap-4">
                <CreditCard className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden />
                No payment is taken online.
              </li>
            </ul>

            <div className="mt-10 hidden overflow-hidden rounded-[24px] lg:block">
              <img src={images.handshake.src} srcSet={images.handshake.srcSet} sizes="(min-width: 1024px) 30vw, 100vw" alt={images.handshake.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>

            <div className="mt-8 rounded-[24px] border border-ivory/15 p-6">
              <p className="font-semibold">{hasWhatsapp ? 'Prefer to chat?' : 'Prefer to talk?'}</p>
              <p className="mt-1 text-sm text-ivory/65">
                {hasWhatsapp
                  ? 'Open WhatsApp with a short summary of your choices so far. You review it and decide whether to send it.'
                  : 'Call us and we will take your booking request over the phone.'}
              </p>
              <ChatButton
                message={waMessage}
                className="btn btn-ghost-light mt-4 w-full"
                label={{ whatsapp: 'Continue on WhatsApp' }}
              />
            </div>
          </div>
        </div>

        {/* Right: the wizard */}
        <div ref={cardRef} className="scroll-mt-28 lg:col-span-8">
          <div className="overflow-hidden rounded-[32px] bg-paper">
            {status === 'success' ? (
              <Success
                name={getValues('name')}
                waMessage={waMessage}
                onReset={() => {
                  reset(defaults)
                  setStatus('idle')
                  setStep([0, -1])
                }}
              />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <StepIndicator step={step} onJump={(i) => i < step && goTo(i)} />

                <div className="relative px-5 pt-8 pb-6 sm:px-10 sm:pt-10">
                  {/* Honeypot: hidden from people, tempting to bots */}
                  <div className="sr-only" aria-hidden>
                    <label htmlFor="booking-website">Website</label>
                    <input id="booking-website" tabIndex={-1} autoComplete="off" {...register('website')} />
                  </div>

                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div key={step} custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                      {step === 0 && <StepService register={register} errors={errors} values={values} clearErrors={clearErrors} />}
                      {step === 1 && <StepSchedule register={register} errors={errors} />}
                      {step === 2 && <StepDetails register={register} errors={errors} />}
                      {step === 3 && <StepReview register={register} errors={errors} values={values} onEdit={goTo} />}
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        className="mt-6 flex gap-3 rounded-2xl border border-[#B42318]/30 bg-[#FEF3F2] p-4 text-sm text-[#7A271A]"
                      >
                        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
                        <div>
                          <p className="font-semibold">Your request was not sent.</p>
                          <p className="mt-1">{serverError}</p>
                          <p className="mt-1">
                            You can try again, or{' '}
                            {hasWhatsapp ? (
                              <a className="font-semibold underline" href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer">
                                send it on WhatsApp
                              </a>
                            ) : (
                              <a className="font-semibold underline" href={site.phoneHref}>
                                call us on {site.phone}
                              </a>
                            )}{' '}
                            instead.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-ink/10 px-5 py-5 sm:px-10">
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className={cn('btn btn-ghost-dark', step === 0 && 'invisible')}
                  >
                    <ArrowLeft className="size-4" aria-hidden /> Back
                  </button>
                  {step < bookingSteps.length - 1 ? (
                    <button type="button" onClick={next} className="btn btn-ink group">
                      Continue <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </button>
                  ) : (
                    <button type="submit" disabled={status === 'sending'} className="btn btn-lime min-w-48 disabled:opacity-70">
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden /> Sending request
                        </>
                      ) : (
                        <>
                          Send booking request <ArrowRight className="size-4" aria-hidden />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepIndicator({ step, onJump }) {
  return (
    <div className="border-b border-ink/10 px-5 pt-6 pb-5 sm:px-10">
      <ol className="grid grid-cols-4 gap-2">
        {bookingSteps.map((s, i) => {
          const done = i < step
          const current = i === step
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onJump(i)}
                disabled={!done}
                aria-current={current ? 'step' : undefined}
                className="group flex w-full flex-col gap-3 text-left disabled:cursor-default"
              >
                <span className="relative h-1 w-full overflow-hidden rounded-full bg-ink/10">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-forest"
                    initial={false}
                    animate={{ width: done ? '100%' : current ? '50%' : '0%' }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </span>
                <span className="flex items-center gap-2 text-xs font-bold sm:text-[13px]">
                  <span
                    className={cn(
                      'grid size-5 shrink-0 place-items-center rounded-full text-[10px] transition-colors duration-500',
                      done ? 'bg-forest text-ivory' : current ? 'bg-ink text-ivory' : 'bg-ink/10 text-ink/50',
                    )}
                  >
                    {done ? <Check className="size-3" strokeWidth={3} aria-hidden /> : i + 1}
                  </span>
                  <span className={cn('hidden sm:inline', !done && !current && 'text-ink/45')}>{s.label}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <p className="mt-3 text-[13px] font-semibold text-ink sm:hidden">
        Step {step + 1} of {bookingSteps.length}: {bookingSteps[step].label}
      </p>
    </div>
  )
}

function StepHeading({ title, sub }) {
  return (
    <div className="mb-8">
      <h3 className="font-display text-[1.6rem] leading-none text-ink sm:text-[2rem]">{title}</h3>
      {sub && <p className="mt-2 text-sm text-stone">{sub}</p>}
    </div>
  )
}

function StepService({ register, errors, values, clearErrors }) {
  const residential = isResidential(values.propertyType)
  useEffect(() => {
    if (!residential) clearErrors(['bedrooms', 'bathrooms'])
  }, [residential, clearErrors])

  return (
    <div className="space-y-8">
      <StepHeading title="Which clean do you need?" sub="Choose the closest match. You can add details later." />
      <fieldset aria-invalid={!!errors.service || undefined}>
        <legend className="sr-only">Cleaning service</legend>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <label
              key={s.id}
              className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-ink/12 bg-white p-2.5 pr-4 transition-all duration-300 hover:border-ink/35 has-[:checked]:border-forest has-[:checked]:bg-mist has-[:checked]:ring-2 has-[:checked]:ring-forest has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-forest/30"
            >
              <input type="radio" value={s.id} className="peer sr-only" {...register('service')} />
              <img src={s.image.thumb} alt="" loading="lazy" className="size-14 shrink-0 rounded-xl object-cover" />
              <span className="text-sm leading-tight font-semibold text-ink">{s.title}</span>
              <span className="absolute top-2 right-2 grid size-5 scale-0 place-items-center rounded-full bg-forest text-ivory transition-transform duration-300 peer-checked:scale-100">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
            </label>
          ))}
        </div>
        {errors.service && <p className="field-error" role="alert">{errors.service.message}</p>}
      </fieldset>

      <Chips legend="Property type" name="propertyType" options={bookingOptions.propertyTypes} register={register} error={errors.propertyType?.message} />

      <AnimatePresence initial={false}>
        {residential && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.6, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.35 } }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <Chips legend="Bedrooms" name="bedrooms" options={bookingOptions.bedrooms} register={register} error={errors.bedrooms?.message} />
              <Chips legend="Bathrooms" name="bathrooms" options={bookingOptions.bathrooms} register={register} error={errors.bathrooms?.message} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Field label="Property address or postcode" htmlFor="postcode" error={errors.postcode?.message} hint="A postcode is enough for now.">
        <input
          id="postcode"
          className="field-input"
          autoComplete="postal-code"
          aria-invalid={!!errors.postcode || undefined}
          aria-describedby={errors.postcode ? 'postcode-error' : undefined}
          {...register('postcode')}
        />
      </Field>
    </div>
  )
}

function StepSchedule({ register, errors }) {
  return (
    <div className="space-y-8">
      <StepHeading title="When suits you?" sub="This is your preferred slot. We will confirm availability before anything is booked." />
      <Field label="Preferred date" htmlFor="date" error={errors.date?.message} className="max-w-xs">
        <input
          id="date"
          type="date"
          min={todayIso()}
          className="field-input"
          aria-invalid={!!errors.date || undefined}
          aria-describedby={errors.date ? 'date-error' : undefined}
          {...register('date')}
        />
      </Field>
      <Chips legend="Preferred time" name="time" options={bookingOptions.times} register={register} error={errors.time?.message} />
      <Chips legend="How often?" name="frequency" options={bookingOptions.frequencies} register={register} error={errors.frequency?.message} />
      <Chips legend="Extras" name="extras" type="checkbox" optional options={bookingOptions.extras} register={register} error={errors.extras?.message} />
    </div>
  )
}

function StepDetails({ register, errors }) {
  const input = (name, props = {}) => ({
    id: name,
    className: 'field-input',
    'aria-invalid': !!errors[name] || undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    ...props,
    ...register(name),
  })
  return (
    <div className="space-y-6">
      <StepHeading title="How can we reach you?" sub="We use these details only to respond to your request." />
      <Field label="Full name" htmlFor="name" error={errors.name?.message}>
        <input {...input('name', { autoComplete: 'name' })} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email address" htmlFor="email" error={errors.email?.message}>
          <input {...input('email', { type: 'email', autoComplete: 'email', inputMode: 'email' })} />
        </Field>
        <Field label="Telephone number" htmlFor="phone" error={errors.phone?.message}>
          <input {...input('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })} />
        </Field>
      </div>
      <Field label="Anything we should know?" htmlFor="notes" optional error={errors.notes?.message} hint="Access, parking, pets, priorities, products you prefer.">
        <textarea {...input('notes', { rows: 4, className: 'field-input min-h-28 py-3' })} />
      </Field>
    </div>
  )
}

function StepReview({ register, errors, values, onEdit }) {
  const residential = isResidential(values.propertyType)
  const rows = [
    ['Service', serviceTitle(values.service), 0],
    ['Property', [values.propertyType, residential && `${values.bedrooms} bed`, residential && `${values.bathrooms} bath`].filter(Boolean).join(', '), 0],
    ['Address or postcode', values.postcode, 0],
    ['Preferred date', formatDate(values.date), 1],
    ['Preferred time', values.time, 1],
    ['Frequency', values.frequency, 1],
    ['Extras', values.extras?.length ? values.extras.join(', ') : 'None', 1],
    ['Name', values.name, 2],
    ['Email', values.email, 2],
    ['Phone', values.phone, 2],
    ['Notes', values.notes || 'None', 2],
  ]
  return (
    <div>
      <StepHeading title="Check your request" sub="Nothing is booked until we confirm availability with you." />
      <dl className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {rows.map(([label, value, stepIndex]) => (
          <div key={label} className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-start gap-4 px-4 py-3 text-sm sm:grid-cols-[11rem_1fr_auto] sm:px-5">
            <dt className="text-stone">{label}</dt>
            <dd className="font-semibold break-words text-ink">{value}</dd>
            <button
              type="button"
              onClick={() => onEdit(stepIndex)}
              className="grid size-8 place-items-center rounded-full text-forest hover:bg-mist"
              aria-label={`Edit ${label.toLowerCase()}`}
            >
              <PencilLine className="size-4" aria-hidden />
            </button>
          </div>
        ))}
      </dl>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-forest)]"
          aria-invalid={!!errors.consent || undefined}
          {...register('consent')}
        />
        <span>
          I have read the{' '}
          <Link to="/privacy" target="_blank" className="font-semibold text-forest underline underline-offset-4">
            privacy notice
          </Link>{' '}
          and agree to Algorique Cleaners using these details to respond to my booking request.
        </span>
      </label>
      {errors.consent && <p className="field-error" role="alert">{errors.consent.message}</p>}
    </div>
  )
}

function Success({ name, waMessage, onReset }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div ref={ref} tabIndex={-1} className="px-6 py-16 text-center outline-none sm:px-12 sm:py-20" role="status">
      <motion.div
        className="mx-auto grid size-20 place-items-center rounded-full bg-lime"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
      >
        <svg viewBox="0 0 24 24" className="size-9" fill="none" aria-hidden>
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="var(--color-ink)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          />
        </svg>
      </motion.div>
      <h3 className="display mt-8 text-[clamp(1.8rem,3vw,2.6rem)] text-ink">Request received{name ? `, ${name.split(' ')[0]}` : ''}.</h3>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone">
        Thank you. Your preferred date and time are not confirmed yet. We will check availability and contact you by email or
        phone to confirm the details.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={onReset} className="btn btn-ink">
          Make another request
        </button>
        <ChatButton message={waMessage} className="btn btn-ghost-dark" label={{ whatsapp: 'Follow up on WhatsApp' }} />
      </div>
    </div>
  )
}
