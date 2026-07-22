import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import MiniMap from '../components/MiniMap'
import ContactForm from '../components/ContactForm'
import './Page.css'

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()
  usePageMeta({
    title: 'Yhteystiedot',
    description:
      'Ota yhteyttä Kuopion LVI-yhdistykseen. Sihteeri Petteri Moilanen, kokouspaikka Kuopion Klubi.',
    path: '/yhteystiedot',
  })

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Yhteystiedot</p>
          <h1>Ota yhteyttä</h1>
          <p>Sihteeri vastaa jäsenyyttä, kokouksia ja yhdistyksen asioita koskeviin kysymyksiin.</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <article className="contact-block reveal">
            <p className="eyebrow">Sihteeri</p>
            <h2>Petteri Moilanen</h2>
            <ul className="contact-details">
              <li>
                <span>Sähköposti</span>
                <a href="mailto:petteri.moilanen@deekaxair.fi">petteri.moilanen@deekaxair.fi</a>
              </li>
              <li>
                <span>Puhelin</span>
                <a href="tel:+358445990788">044 599 0788</a>
              </li>
              <li>
                <span>Postiosoite</span>
                <div className="address-with-map">
                  <address>
                    Petteri Moilanen
                    <br />
                    Pankkopolku 20 4A
                    <br />
                    70820 Kuopio
                  </address>
                  <MiniMap
                    query="Pankkopolku 20, 70820 Kuopio"
                    title="Kartta: Pankkopolku 20, Kuopio"
                  />
                </div>
              </li>
            </ul>
          </article>

          <article className="contact-block reveal reveal-delay-1">
            <p className="eyebrow">Kokouspaikka</p>
            <h2>Kuopion Klubi</h2>
            <p className="text-muted" style={{ marginBottom: '1.25rem' }}>
              Kuukausikokoukset pidetään pääsääntöisesti Kuopion Klubilla. Jos kokouspaikka
              muuttuu, siitä ilmoitetaan kokouskutsussa ja tapahtumakalenterissa.
            </p>
            <ul className="contact-details">
              <li>
                <span>Osoite</span>
                <div className="address-with-map">
                  <div>
                    <p>Kuninkaankatu 10, 70100 Kuopio</p>
                    <a
                      className="btn btn--outline"
                      style={{ marginTop: '1rem' }}
                      href="https://maps.google.com/?q=Kuopion+Klubi+Kuninkaankatu+10+Kuopio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Avaa kartalla <span className="arrow">→</span>
                    </a>
                  </div>
                  <MiniMap
                    query="Kuopion Klubi, Kuninkaankatu 10, Kuopio"
                    title="Kartta: Kuopion Klubi"
                  />
                </div>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container contact-form-layout">
          <div className="reveal">
            <p className="eyebrow">Viesti</p>
            <h2 className="section-title">Lähetä yhteydenotto</h2>
            <p className="section-lead">
              Kerro asiasi lomakkeella — viesti avautuu sähköpostissasi valmiina sihteerille.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
