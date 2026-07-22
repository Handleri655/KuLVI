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
      <header className="page-hero page-hero--board">
        <div className="container">
          <p className="eyebrow">Sisäinen alue</p>
          <h1>Hallituksen sivu</h1>
          <p>
            Vain hallitustunnuksella. Täällä ovat pöytäkirjat ja sisäiset raportit — ei
            jäsentiedotteita.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container portal-layout">
          <aside className="portal-aside reveal">
            <div className="role-badge role-badge--board">Hallitustunnus</div>
            <p className="portal-aside__name">{fullName ?? 'Hallitus'}</p>
            <p className="portal-aside__hint">
              Tämä on erillinen sivu hallitukselle. Jäsentiedotteet löytyvät jäsensivulta.
            </p>
            <div className="portal-aside__actions">
              <Link to="/jasensivu" className="btn btn--outline">
                Avaa jäsensivu
              </Link>
              <button type="button" className="btn btn--outline" onClick={() => void signOut()}>
                Kirjaudu ulos
              </button>
            </div>
          </aside>

          <div className="portal-main">
            <div className="portal-callout portal-callout--board reveal">
              <strong>Luottamuksellista</strong>
              <p>
                Älä jaa pöytäkirjoja ulkopuolisille. Katso{' '}
                <Link to="/tietosuoja">tietosuojaseloste</Link>.
              </p>
            </div>

            <div className="reveal" style={{ marginBottom: '1.25rem' }}>
              <p className="eyebrow">1 · Hallitusaineistot</p>
              <h2 className="section-title">Pöytäkirjat &amp; raportit</h2>
              <p className="section-lead">Näkyvät vain hallitus-roolille.</p>
            </div>

            <ul className="doc-list reveal">
              {docs.map((doc) => (
                <li key={doc.id} className="doc-item doc-item--board">
                  <span className="doc-item__tag">Hallitus</span>
                  <h3>{doc.title}</h3>
                  {doc.description && <p>{doc.description}</p>}
                </li>
              ))}
            </ul>

            <div className="reveal" style={{ margin: '2.5rem 0 1.25rem' }}>
              <p className="eyebrow">2 · Julkinen sivu</p>
              <h2 className="section-title">Hallituksen nimet</h2>
              <p className="section-lead">
                Julkinen listaus (nimet ja tehtävät) on eri sivu kuin tämä sisäinen alue.
              </p>
            </div>

            <Link to="/hallitus" className="btn btn--outline reveal">
              Näytä julkinen hallitus <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
