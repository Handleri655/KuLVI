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

const fallbackBoardDocs: Doc[] = [
  {
    id: 'b1',
    title: 'Hallituksen pöytäkirja (malli) 2/2026',
    description: 'Vain hallitukselle. Korvaa oikealla PDF:llä Storageen.',
    audience: 'hallitus',
    published_at: '2026-02-15',
  },
  {
    id: 'b2',
    title: 'Talouden seurantaraportti (malli)',
    description: 'Sisäinen raportti hallitukselle.',
    audience: 'hallitus',
    published_at: '2026-01-20',
  },
]

export default function BoardPortal() {
  const ref = useReveal<HTMLDivElement>()
  const { fullName, signOut } = useAuth()
  const [docs, setDocs] = useState<Doc[]>(fallbackBoardDocs)

  usePageMeta({
    title: 'Hallituksen sivu',
    description: 'Hallituksen pöytäkirjat ja sisäiset aineistot.',
    path: '/hallituksen-sivu',
  })

  useEffect(() => {
    if (!supabase) return
    void supabase
      .from('documents')
      .select('id, title, description, audience, published_at')
      .eq('audience', 'hallitus')
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data?.length) setDocs(data as Doc[])
      })
  }, [])

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Hallitus</p>
          <h1>Hallituksen sivu</h1>
          <p>Pöytäkirjat ja sisäiset aineistot — vain hallituksen tunnuksilla.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="portal-bar reveal">
            <p className="portal-bar__meta">
              Kirjautunut: <strong>{fullName ?? 'Hallitus'}</strong> · rooli: hallitus
            </p>
            <div className="btn-group">
              <Link to="/jasensivu" className="btn btn--outline">
                Jäsensivu
              </Link>
              <button type="button" className="btn btn--outline" onClick={() => void signOut()}>
                Kirjaudu ulos
              </button>
            </div>
          </div>

          <div className="notice reveal" style={{ marginBottom: '2rem' }}>
            <h2>Luottamuksellinen aineisto</h2>
            <p>
              Pöytäkirjat voivat sisältää henkilötietoja. Älä lataa tai jaa aineistoa ulkopuolisille.
              Säilytys ja käyttö: katso <Link to="/tietosuoja">tietosuojaseloste</Link>.
            </p>
          </div>

          <div className="reveal" style={{ marginBottom: '1.25rem' }}>
            <p className="eyebrow">Dokumentit</p>
            <h2 className="section-title">Pöytäkirjat &amp; raportit</h2>
          </div>

          <ul className="doc-list reveal">
            {docs.map((doc) => (
              <li key={doc.id} className="doc-item">
                <span className="doc-item__tag">Hallitus</span>
                <h3>{doc.title}</h3>
                {doc.description && <p>{doc.description}</p>}
              </li>
            ))}
          </ul>

          <div className="cta-inline reveal" style={{ marginTop: '2.5rem' }}>
            <div>
              <h2>Julkinen hallitussivu</h2>
              <p className="text-muted">Henkilöiden nimet ja roolit ovat julkisella sivulla.</p>
            </div>
            <Link to="/hallitus" className="btn btn--outline">
              Näytä julkinen hallitus
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
