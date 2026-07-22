import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { supabase } from '../lib/supabase'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Page.css'
import './Auth.css'

type Doc = {
  id: string
  title: string
  description: string | null
  audience: 'jasen' | 'hallitus'
  published_at: string
}

const fallbackMemberDocs: Doc[] = [
  {
    id: '1',
    title: 'Jäsentiedote kevät 2026',
    description: 'Yhteenveto kevään toiminnasta ja tulevista kokouksista.',
    audience: 'jasen',
    published_at: '2026-03-01',
  },
  {
    id: '2',
    title: 'Kuukausikokouskutsu (malli)',
    description: 'Esimerkkikutsu jäsenille.',
    audience: 'jasen',
    published_at: '2026-02-01',
  },
]

export default function Members() {
  const ref = useReveal<HTMLDivElement>()
  const { fullName, role, isBoard, signOut } = useAuth()
  const [docs, setDocs] = useState<Doc[]>(fallbackMemberDocs)

  usePageMeta({
    title: 'Jäsensivu',
    description: 'Kirjautuneiden jäsenten aineistot ja linkit.',
    path: '/jasensivu',
  })

  useEffect(() => {
    if (!supabase) return
    void supabase
      .from('documents')
      .select('id, title, description, audience, published_at')
      .eq('audience', 'jasen')
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data?.length) setDocs(data as Doc[])
      })
  }, [])

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Jäsenalue</p>
          <h1>Jäsensivu</h1>
          <p>Kirjautuneille jäsenille tarkoitetut tiedotteet ja linkit.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="portal-bar reveal">
            <p className="portal-bar__meta">
              Kirjautunut: <strong>{fullName ?? 'Käyttäjä'}</strong>
              {role ? ` · rooli: ${role === 'hallitus' ? 'hallitus' : 'jäsen'}` : ''}
            </p>
            <div className="btn-group">
              {isBoard && (
                <Link to="/hallituksen-sivu" className="btn btn--outline">
                  Hallituksen sivu
                </Link>
              )}
              <button type="button" className="btn btn--outline" onClick={() => void signOut()}>
                Kirjaudu ulos
              </button>
            </div>
          </div>

          <div className="notice reveal" style={{ marginBottom: '2rem' }}>
            <h2>Henkilötiedot ja aineistot</h2>
            <p>
              Tätä aluetta saa käyttää vain omalla tunnuksella. Älä jaa salasanaa. Lue{' '}
              <Link to="/tietosuoja">tietosuojaseloste</Link>.
            </p>
          </div>

          <div className="reveal" style={{ marginBottom: '1.25rem' }}>
            <p className="eyebrow">Aineistot</p>
            <h2 className="section-title">Jäsenille</h2>
          </div>

          <ul className="doc-list reveal">
            {docs.map((doc) => (
              <li key={doc.id} className="doc-item">
                <span className="doc-item__tag">Jäsen</span>
                <h3>{doc.title}</h3>
                {doc.description && <p>{doc.description}</p>}
              </li>
            ))}
          </ul>

          <div className="benefit-grid" style={{ marginTop: '2.5rem' }}>
            <a
              href="https://sulvi.fi/liity-jaseneksi/"
              target="_blank"
              rel="noopener noreferrer"
              className="benefit benefit--link reveal"
            >
              <h3>Päivitä jäsentiedot (SuLVI)</h3>
              <p>Yhteystiedot ja laskutus SuLVI:n jäsensivuilla.</p>
            </a>
            <Link to="/tapahtumat" className="benefit benefit--link reveal reveal-delay-1">
              <h3>Tapahtumat</h3>
              <p>Kuukausikokoukset ja tilaisuudet.</p>
            </Link>
            <Link to="/yhteystiedot" className="benefit benefit--link reveal reveal-delay-2">
              <h3>Yhteystiedot</h3>
              <p>Sihteeri ja kokouspaikka.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
