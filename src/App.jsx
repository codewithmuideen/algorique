import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { BookingProvider } from './components/booking/BookingContext'
import Home from './pages/Home'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ProcessPage = lazy(() => import('./pages/ProcessPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Cookies = lazy(() => import('./pages/Cookies'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
