import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import OrderPage from './pages/OrderPage'
import CateringPage from './pages/CateringPage'
import DonnyPage from './pages/DonnyPage'
import ContactPage from './pages/ContactPage'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/history"  element={<HistoryPage />} />
          <Route path="/order"    element={<OrderPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="/donny"    element={<DonnyPage />} />
          <Route path="/contact"  element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
