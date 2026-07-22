import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Page.css'

const benefits = [
  {
    title: 'Ammatillinen kehitys',
    text: 'Pysyt ajan tasalla alan kehityksestä, säädöksistä ja ohjeista — sekä paikallisesti että SuLVI:n kautta.',
  },
  {
    title: 'Jäsenhintaiset koulutukset',
    text: 'Järjestämme avoimia koulutuksia jäsenistön ja pätevyystoiminnan tarpeisiin. Jäsenille kurssit ovat edullisempia.',
  },
  {
    title: 'Verkosto Kuopiossa',
    text: 'Kuukausikokoukset ja tapahtumat tuovat yhteen suunnittelijat, urakoitsijat ja kauppiaat.',
  },
  {
    title: 'SuLVI-jäsenyys',
    text: 'Paikallisen jäsenyyden kautta olet Suomen LVI-liiton jäsen — Talotekniikka-lehti, valtakunnallinen verkosto ja edut.',
  },
]

const fees = [
  { label: 'Varsinainen jäsen (SuLVI:n osuus)', amount: '98 €' },
  { label: 'Opiskelijajäsen', amount: '0 €' },
  { label: 'Puolijäsenmaksu', amount: '49 €' },
  { label: 'Perhejäsenmaksu', amount: '49 €' },
  { label: 'Yhteistoimintajäsen', amount: '980 €' },
  { label: 'Vakinaisen jäsenen lehtimaksu', amount: '58 €' },
]

export default function Membership() {
  const ref = useReveal<HTMLDivElement>()
  usePageMeta({
    title: 'Jäsenyys',
    description:
      'Liity Kuopion LVI-yhdistykseen. Jäsenedut, SuLVI-jäsenmaksut 2026 ja liittymisohjeet.',
    path: '/jasenyys',
  })

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Jäsenyys</p>
          <h1>Liity ammattilaisten joukkoon</h1>
          <p>
            KuLVI:n jäsenyys on tietoa, vaikuttamista ja verkostoitumista — sekä automaattinen
            jäsenyys Suomen LVI-liitossa.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container page-split">
          <div className="reveal">
            <h2 className="section-title">Kenelle jäsenyys sopii?</h2>
            <p className="section-lead">
              Yhdistys kokoaa LVI-suunnittelijat, urakoitsijat ja kauppiaat Kuopion seudulla.
            </p>
          </div>
          <div className="prose reveal reveal-delay-1">
            <p>
              Kun liityt Kuopion LVI-yhdistykseen, liityt samalla Suomen LVI-liitto SuLVI ry:n
              jäseneksi. Liittoon kuuluu 29 jäsenyhdistystä ja lähes 4&nbsp;000 henkilöjäsentä.
            </p>
            <p>
              Jäsenyys on henkilökohtainen. Liittyminen tapahtuu SuLVI:n kautta paikalliseen
              jäsenyhdistykseen.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="reveal" style={{ marginBottom: '2.5rem' }}>
            <p className="eyebrow">Edut</p>
            <h2 className="section-title">Miksi jäsenyys kannattaa</h2>
          </div>
          <div className="benefit-grid">
            {benefits.map((b, i) => (
              <article key={b.title} className={`benefit reveal reveal-delay-${(i % 3) + 1}`}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fees-head reveal">
            <div>
              <p className="eyebrow">Jäsenmaksut 2026</p>
              <h2 className="section-title">SuLVI:n jäsenmaksut</h2>
              <p className="section-lead">
                Varsinaisen jäsenen maksu muodostuu SuLVI:n osuudesta ja paikallisen yhdistyksen
                osuudesta (yhteensä noin 98–133&nbsp;€ yhdistyksestä riippuen).
              </p>
            </div>
            <a
              className="btn btn--outline"
              href="https://sulvi.fi/liity-jaseneksi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Katso SuLVI:ssa <span className="arrow">→</span>
            </a>
          </div>

          <ul className="fee-list reveal reveal-delay-1">
            {fees.map((fee) => (
              <li key={fee.label} className="fee-row">
                <span>{fee.label}</span>
                <strong>{fee.amount}</strong>
              </li>
            ))}
          </ul>

          <p className="fee-note reveal reveal-delay-2">
            Ajantasaiset hinnat, alennukset ja liittymisohjeet:{' '}
            <a href="https://sulvi.fi/liity-jaseneksi/" target="_blank" rel="noopener noreferrer">
              sulvi.fi/liity-jaseneksi
            </a>
            {' · '}
            <a
              href="https://sulvi.fi/jasenmaksut-ja-alennukset/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jäsenmaksut ja -alennukset
            </a>
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="reveal" style={{ marginBottom: '2.5rem' }}>
            <p className="eyebrow">Näin liityt</p>
            <h2 className="section-title">Kolme askelta jäseneksi</h2>
          </div>
          <ol className="steps">
            <li className="step reveal">
              <span className="step__num">1</span>
              <div>
                <h3>Avaa SuLVI:n liittymissivu</h3>
                <p>Siirry Suomen LVI-liiton liittymislomakkeeseen.</p>
              </div>
            </li>
            <li className="step reveal reveal-delay-1">
              <span className="step__num">2</span>
              <div>
                <h3>Valitse Kuopion LVI-yhdistys</h3>
                <p>
                  Liityt paikalliseen jäsenyhdistykseen — sen kautta olet myös SuLVI:n jäsen.
                </p>
              </div>
            </li>
            <li className="step reveal reveal-delay-2">
              <span className="step__num">3</span>
              <div>
                <h3>Tervetuloa mukaan</h3>
                <p>
                  Saat jäsenmaksulaskun ja pääsyn koulutuksiin, kokouksiin ja jäsenetuihin.
                  Kysyttävää? Ota yhteyttä sihteeriin.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container cta-inline reveal">
          <div>
            <h2>Valmis liittymään?</h2>
            <p className="text-muted">
              Liittyminen tapahtuu SuLVI:n kautta paikalliseen jäsenyhdistykseen. Voit myös
              kysyä meiltä lisätietoja.
            </p>
          </div>
          <div className="btn-group">
            <a
              className="btn btn--primary"
              href="https://sulvi.fi/liity-jaseneksi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Liity SuLVI:n sivulla <span className="arrow">→</span>
            </a>
            <Link to="/yhteystiedot" className="btn btn--outline">
              Kysy sihteeriltä
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
