import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Siirry sisältöön
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
