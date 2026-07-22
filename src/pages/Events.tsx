import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import MiniMap from '../components/MiniMap'
import './Page.css'

const pastEvents = [
  {
    date: '26.11.2025',
    time: 'klo 19',
    title: 'Syyskokous',
    host: 'Isäntänä Koka Oy',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    date: '21.1.2026',
    time: 'klo 19',
    title: 'Tammikuun kuukausikokous',
    host: 'Isäntänä Paroc',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    date: '18.2.2026',
    time: 'klo 19',
    title: 'Helmikuun kuukausikokous',
    host: 'Isäntänä Vieser',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
]

export default function Events() {
  const ref = useReveal<HTMLDivElement>()
  usePageMeta({
    title: 'Tapahtumat',
    description:
      'Kuopion LVI-yhdistyksen kuukausikokoukset ja tilaisuudet. Kokouspaikka: Kuopion Klubi.',
    path: '/tapahtumat',
  })

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Tapahtumat</p>
          <h1>Kokoukset &amp; tilaisuudet</h1>
          <p>
            Kuukausikokoukset pidetään pääsääntöisesti Kuopion Klubilla. Mahdolliset
            paikkamuutokset ilmoitetaan kokouskutsussa.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container notice notice--with-map reveal">
          <div>
            <h2>Kokouspaikka</h2>
            <p>
              Kuopion Klubi, Kuninkaankatu 10, 70100 Kuopio. Syksyn 2026 kokousohjelma
              julkaistaan lähempänä kautta.
            </p>
          </div>
          <MiniMap
            query="Kuopion Klubi, Kuninkaankatu 10, Kuopio"
            title="Kartta: Kuopion Klubi"
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: '1.5rem' }}>
            <p className="eyebrow">Arkisto</p>
            <h2 className="section-title">Viimeisimmät kokoukset</h2>
          </div>
          <ul className="timeline">
            {pastEvents.map((event, i) => (
              <li key={event.title} className={`timeline__item reveal reveal-delay-${i + 1}`}>
                <div className="timeline__date">
                  <strong>{event.date}</strong>
                  <span>{event.time}</span>
                </div>
                <div className="timeline__content">
                  <h2>{event.title}</h2>
                  <p>{event.host}</p>
                  <p className="timeline__place">{event.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container contact-strip reveal">
          <div>
            <p className="eyebrow">Lisätiedot</p>
            <h2 className="section-title">Kysy tulevista tapahtumista</h2>
            <p className="section-lead">Puheenjohtaja Jorma Kauppinen</p>
          </div>
          <div className="contact-strip__actions">
            <a className="btn btn--primary" href="tel:+358445453158">
              044 545 3158
            </a>
            <a className="btn btn--outline" href="mailto:jorma.kauppinen@granlund.fi">
              jorma.kauppinen@granlund.fi
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
