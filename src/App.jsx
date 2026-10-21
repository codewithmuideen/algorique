import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { BookingProvider } from './components/booking/BookingContext'
import Home from './pages/Home'

// Page code is split per route. The same loaders are used to preload the
// first page before the splash screen is removed (see main.jsx).
const loaders = {
  '/about': () => import('./pages/AboutPage'),
  '/services': () => import('./pages/ServicesPage'),
  '/process': () => import('./pages/ProcessPage'),
  '/reviews': () => import('./pages/ReviewsPage'),
  '/contact': () => import('./pages/ContactPage'),
  '/book': () => import('./pages/BookPage'),
  '/faq': () => import('./pages/FaqPage'),
  '/privacy': () => import('./pages/Privacy'),
  '/terms': () => import('./pages/Terms'),
  '/cookies': () => import('./pages/Cookies'),
}
const notFoundLoader = () => import('./pages/NotFound')

export const preloadRoute = (pathname) => {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return Promise.resolve()
  return (loaders[path] ?? notFoundLoader)()
}

const AboutPage = lazy(loaders['/about'])
const ServicesPage = lazy(loaders['/services'])
const ProcessPage = lazy(loaders['/process'])
const ReviewsPage = lazy(loaders['/reviews'])
const ContactPage = lazy(loaders['/contact'])
const BookPage = lazy(loaders['/book'])
const FaqPage = lazy(loaders['/faq'])
const Privacy = lazy(loaders['/privacy'])
const Terms = lazy(loaders['/terms'])
const Cookies = lazy(loaders['/cookies'])
const NotFound = lazy(notFoundLoader)

export default function App() {
  return (
    // "user": transform and layout animations are skipped for visitors who
    // ask their system for reduced motion; opacity fades still run.
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<Lazy page={AboutPage} />} />
            <Route path="services" element={<Lazy page={ServicesPage} />} />
            <Route path="process" element={<Lazy page={ProcessPage} />} />
            <Route path="reviews" element={<Lazy page={ReviewsPage} />} />
            <Route path="contact" element={<Lazy page={ContactPage} />} />
            <Route path="book" element={<Lazy page={BookPage} />} />
            <Route path="faq" element={<Lazy page={FaqPage} />} />
            <Route path="privacy" element={<Lazy page={Privacy} />} />
            <Route path="terms" element={<Lazy page={Terms} />} />
            <Route path="cookies" element={<Lazy page={Cookies} />} />
            <Route path="*" element={<Lazy page={NotFound} />} />
          </Route>
        </Routes>
      </BookingProvider>
    </MotionConfig>
  )
}

// Keeps the header and footer on screen while a page's code loads.
function Lazy({ page: Page }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <Page />
    </Suspense>
  )
}
