import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import './Header.css'

const links = [
  { to: '/', label: 'Etusivu', end: true },
  { to: '/jasenyys', label: 'Jäsenyys' },
  { to: '/jasensivu', label: 'Jäsensivu' },
  { to: '/tapahtumat', label: 'Tapahtumat' },
  { to: '/hallitus', label: 'Hallitus' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
]

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [open, setOpen] = useState(false)
  const { user, isBoard, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(!isHome || window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="KuLVI-logo"
            width={40}
            height={40}
            className="brand__mark"
          />
          <span className="brand__text">
            <span className="brand__name">KuLVI</span>
            <span className="brand__sub">Kuopion LVI-yhdistys</span>
          </span>
        </Link>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Päävalikko">
          <ul className="nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {isBoard && (
              <li>
                <NavLink
                  to="/hallituksen-sivu"
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  Hallituksen sivu
                </NavLink>
              </li>
            )}
          </ul>

          {user ? (
            <button
              type="button"
              className="nav__cta"
              onClick={() => {
                setOpen(false)
                void signOut()
              }}
            >
              Kirjaudu ulos
            </button>
          ) : (
            <Link to="/kirjaudu" className="nav__cta" onClick={() => setOpen(false)}>
              Kirjaudu
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
