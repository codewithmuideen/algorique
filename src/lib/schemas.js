// Shared by the browser forms and the serverless email endpoints, so both
// sides validate exactly the same rules.
import { z } from 'zod'
import { services, bookingOptions } from '../data/content.js'

const serviceIds = services.map((s) => s.id)
const trimmed = (max) => z.string().trim().max(max)
const phonePattern = /^[+()\-\s0-9]{7,20}$/

export const bookingSchema = z
  .object({
    service: z.string().refine((v) => serviceIds.includes(v), 'Please choose a service.'),
    propertyType: z.enum(bookingOptions.propertyTypes, { errorMap: () => ({ message: 'Please choose a property type.' }) }),
    bedrooms: trimmed(10).optional().default(''),
    bathrooms: trimmed(10).optional().default(''),
    postcode: trimmed(160).min(3, 'Please enter the property address or postcode.'),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a preferred date.')
      .refine((v) => {
        // One day of leeway so a visitor ahead of the server's timezone is not rejected.
        const earliest = new Date()
        earliest.setHours(0, 0, 0, 0)
        earliest.setDate(earliest.getDate() - 1)
        return new Date(`${v}T00:00:00`) >= earliest
      }, 'Please choose a date from today onwards.'),
    time: z.enum(bookingOptions.times, { errorMap: () => ({ message: 'Please choose a preferred time.' }) }),
    frequency: z.enum(bookingOptions.frequencies, { errorMap: () => ({ message: 'Please choose how often.' }) }),
    extras: z.array(z.enum(bookingOptions.extras)).max(bookingOptions.extras.length).optional().default([]),
    notes: trimmed(2000).optional().default(''),
    name: trimmed(120).min(2, 'Please enter your full name.'),
    email: z.string().trim().max(200).email('Please enter a valid email address.'),
    phone: z.string().trim().regex(phonePattern, 'Please enter a valid phone number.'),
    consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you have read the privacy notice.' }) }),
    website: z.string().max(0).optional().default(''), // honeypot: must stay empty
  })
  .superRefine((data, ctx) => {
    const residential = data.propertyType === 'Flat / apartment' || data.propertyType === 'House'
    if (residential && !data.bedrooms) {
      ctx.addIssue({ code: 'custom', path: ['bedrooms'], message: 'Please choose the number of bedrooms.' })
    }
    if (residential && !data.bathrooms) {
      ctx.addIssue({ code: 'custom', path: ['bathrooms'], message: 'Please choose the number of bathrooms.' })
    }
  })

export const bookingSteps = [
  { id: 'service', label: 'Service', fields: ['service', 'propertyType', 'bedrooms', 'bathrooms', 'postcode'] },
  { id: 'schedule', label: 'Schedule', fields: ['date', 'time', 'frequency', 'extras'] },
  { id: 'details', label: 'Your details', fields: ['name', 'email', 'phone', 'notes'] },
  { id: 'review', label: 'Review', fields: ['consent'] },
]

export const contactSubjects = ['General enquiry', 'Request a quote', 'Existing booking', 'Commercial cleaning', 'Something else']

export const contactSchema = z.object({
  name: trimmed(120).min(2, 'Please enter your name.'),
  email: z.string().trim().max(200).email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .refine((v) => v === '' || phonePattern.test(v), 'Please enter a valid phone number.')
    .optional()
    .default(''),
  subject: z.enum(contactSubjects, { errorMap: () => ({ message: 'Please choose a subject.' }) }),
  message: trimmed(4000).min(10, 'Please write a little more (at least 10 characters).'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you have read the privacy notice.' }) }),
  website: z.string().max(0).optional().default(''),
})

export const serviceTitle = (id) => services.find((s) => s.id === id)?.title ?? id
