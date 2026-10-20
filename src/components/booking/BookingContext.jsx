import { createContext, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingContext = createContext(null)

// Every "Book" / "Request this service" action goes to the booking page,
// preselecting the service through the URL (/book?service=deep).
export function BookingProvider({ children }) {
  const navigate = useNavigate()
  const openBooking = useCallback(
    (serviceId) => navigate(serviceId ? `/book?service=${encodeURIComponent(serviceId)}` : '/book'),
    [navigate],
  )
  return <BookingContext.Provider value={{ openBooking }}>{children}</BookingContext.Provider>
}

export const useBooking = () => useContext(BookingContext)
