import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './auth/AuthContext'
import RequireAuth from './auth/RequireAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import Membership from './pages/Membership'
import Events from './pages/Events'
import Board from './pages/Board'
import Contact from './pages/Contact'
import Members from './pages/Members'
import BoardPortal from './pages/BoardPortal'
import Login from './pages/Login'
import Privacy from './pages/Privacy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function RedirectHandler() {
  useEffect(() => {
    const redirect = sessionStorage.redirect as string | undefined
    delete sessionStorage.redirect
    if (redirect && redirect !== window.location.href) {
      const url = new URL(redirect)
      if (url.pathname !== window.location.pathname) {
        window.history.replaceState(null, '', url.pathname + url.search + url.hash)
      }
    }
  }, [])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <RedirectHandler />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jasenyys" element={<Membership />} />
          <Route path="/tapahtumat" element={<Events />} />
          <Route path="/hallitus" element={<Board />} />
          <Route path="/yhteystiedot" element={<Contact />} />
          <Route path="/kirjaudu" element={<Login />} />
          <Route path="/tietosuoja" element={<Privacy />} />
          <Route
            path="/jasensivu"
            element={
              <RequireAuth roles={['jasen', 'hallitus']}>
                <Members />
              </RequireAuth>
            }
          />
          <Route
            path="/hallituksen-sivu"
            element={
              <RequireAuth roles={['hallitus']}>
                <BoardPortal />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
