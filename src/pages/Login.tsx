import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePageMeta } from '../hooks/usePageMeta'
import type { UserRole } from '../lib/database.types'
import './Auth.css'

const DEMO_ACCOUNTS = [
  {
    label: 'Jäsen',
    email: 'jasen@kulvi.demo',
    password: 'KulviJasen2026!',
    goesTo: 'Avaa jäsensivun (tiedotteet jäsenille)',
  },
  {
    label: 'Hallitus',
    email: 'hallitus@kulvi.demo',
    password: 'KulviHallitus2026!',
    goesTo: 'Avaa hallituksen sivun (pöytäkirjat)',
  },
]

function homeForRole(role: UserRole | null, fallback: string) {
  if (role === 'hallitus') return '/hallituksen-sivu'
  if (role === 'jasen') return '/jasensivu'
  return fallback
}

export default function Login() {
  const { signIn, user, role, configured, ready } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from

  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email)
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  usePageMeta({
    title: 'Kirjaudu',
    description: 'Kirjaudu KuLVI:n jäsensivulle tai hallituksen sivulle.',
    path: '/kirjaudu',
  })

  if (ready && user) {
    const dest =
      from && from !== '/kirjaudu' ? from : homeForRole(role, '/jasensivu')
    return <Navigate to={dest} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await signIn(email.trim(), password)
    setLoading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    // Hallitus → hallituksen sivu; jäsen → jäsensivu
    // Jos tultiin suojatulta sivulta, kunnioita sitä
    const dest =
      from && from !== '/kirjaudu' ? from : homeForRole(result.role, '/jasensivu')
    navigate(dest, { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Kirjautuminen</p>
        <h1>Jäsen- ja hallitusalue</h1>
        <p className="auth-lead">
          <strong>Jäsentunnus</strong> vie jäsensivulle.
          <br />
          <strong>Hallitustunnus</strong> vie suoraan hallituksen sivulle (pöytäkirjat).
        </p>

        {!configured && (
          <div className="auth-alert" role="status">
            <strong>Supabase ei ole vielä kytketty.</strong>
            <p>
              Luo projekti, aja <code>supabase/schema.sql</code> ja täytä <code>.env</code>.
              Ohje: <code>supabase/DEMO.md</code>.
            </p>
          </div>
        )}

        <form className="auth-form" onSubmit={onSubmit}>
          <label htmlFor="login-email">
            Sähköposti
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="login-password">
            Salasana
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn--primary" disabled={loading || !configured}>
            {loading ? 'Kirjaudutaan…' : 'Kirjaudu'}
          </button>
        </form>

        <div className="auth-demo">
          <p className="auth-demo__title">Demotunnukset</p>
          <ul>
            {DEMO_ACCOUNTS.map((acc) => (
              <li key={acc.email}>
                <button
                  type="button"
                  className="auth-demo__fill"
                  onClick={() => {
                    setEmail(acc.email)
                    setPassword(acc.password)
                  }}
                >
                  Käytä: {acc.label}
                </button>
                <span>
                  {acc.email} · <code>{acc.password}</code>
                </span>
                <span className="auth-demo__hint">{acc.goesTo}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="auth-fineprint">
          <Link to="/tietosuoja">Tietosuojaseloste</Link>
        </p>
      </div>
    </div>
  )
}
