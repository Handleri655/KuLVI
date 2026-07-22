import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

const pillars = [
  {
    title: 'Koulutus',
    text: 'Järjestämme kaikille avoimia koulutuksia yksin ja yhteistyössä oppilaitosten kanssa. Kurssit ovat jäsenille edullisempia.',
    to: '/jasenyys',
  },
  {
    title: 'Verkosto',
    text: 'Tutustu kollegoihin, asiakkaisiin ja kilpailijoihin. Kuukausikokoukset kokoavat alan ammattilaiset Kuopioon.',
    to: '/tapahtumat',
  },
  {
    title: 'Vaikuttaminen',
    text: 'Jäsenyyden kautta olet osa Suomen LVI-liittoa — vaikuttamassa alan säädäntöön, ohjeisiin ja kehitykseen.',
    to: '/jasenyys',
  },
]

const highlights = [
  {
    date: 'Kuukausittain',
    title: 'Kuukausikokoukset',
    host: 'Alan yritysten isännöimiä iltoja',
    place: 'Kuopion Klubi',
  },
  {
    date: 'Koulutus',
    title: 'Avoimet koulutukset',
    host: 'Jäsenille edullisemmat kurssit',
    place: 'Yhteistyössä oppilaitosten kanssa',
  },
  {
    date: 'SuLVI',
    title: 'Valtakunnallinen verkosto',
    host: 'Lähes 4 000 ammattilaista',
    place: '29 jäsenyhdistystä',
  },
]

export default function Home() {
  const ref = useReveal<HTMLDivElement>()
  usePageMeta({
    title: 'KuLVI – Kuopion LVI-yhdistys ry',
    description:
      'Kuopion LVI-yhdistys ry – alan ammattilaisten verkosto vuodesta 1959. Koulutus, jäsenyys ja tapahtumat.',
    path: '/',
  })

  return (
    <div ref={ref}>
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <img
            src="/hero.jpg"
            alt=""
            className="hero__img"
          />
          <div className="hero__shade" />
          <div className="hero__grain" />
        </div>

        <div className="container hero__content">
          <p className="hero__brand reveal is-visible">KuLVI</p>
          <h1 className="hero__title reveal is-visible reveal-delay-1">
            Kuopion LVI-yhdistys
          </h1>
          <p className="hero__lead reveal is-visible reveal-delay-2">
            Alan ammattilaisten yhteistyöverkosto vuodesta 1959 — suunnittelijoille,
            urakoitsijoille ja kauppiaille.
          </p>
          <div className="btn-group reveal is-visible reveal-delay-3">
            <Link to="/jasenyys" className="btn btn--primary">
              Tutustu jäsenyyteen <span className="arrow">→</span>
            </Link>
            <Link to="/tapahtumat" className="btn btn--ghost">
              Kokoukset &amp; tapahtumat
            </Link>
          </div>
        </div>

        <div className="hero__meta">
          <div className="container hero__meta-inner">
            <span>Perustettu 1959</span>
            <span className="hero__dot" aria-hidden="true" />
            <span>SuLVI-jäsenyhdistys</span>
            <span className="hero__dot" aria-hidden="true" />
            <span>Kuopio</span>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="container about__grid">
          <div className="reveal">
            <p className="eyebrow">Yhdistys</p>
            <h2 className="section-title">Me olemme alan ammattilaisia.</h2>
          </div>
          <div className="about__copy reveal reveal-delay-1">
            <p>
              Kuopion LVI-yhdistys on kuopiolainen LVI-suunnittelijoiden, urakoitsijoiden ja
              kauppiaiden yhdistys, joka on vuodesta 1959 hoitanut alan yhteistyökuvioita.
            </p>
            <p>
              KuLVI:n jäsenyys on tietoa oman alasi kehityksestä, vaikuttamista alan säädäntöön
              ja oppaisiin sekä verkostoitumista kollegoiden kanssa.
            </p>
            <div className="about__quote">
              <img
                src="/board/jorma-kauppinen.png"
                alt="Jorma Kauppinen, puheenjohtaja"
                className="about__quote-photo"
                width={56}
                height={56}
              />
              <span>— Puheenjohtaja Jorma Kauppinen</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section pillars">
        <div className="container">
          <div className="pillars__head reveal">
            <p className="eyebrow">Mitä tarjoamme</p>
            <h2 className="section-title">Osaamista, yhteyksiä ja vaikuttamista</h2>
          </div>
          <div className="pillars__grid">
            {pillars.map((item, i) => (
              <Link
                key={item.title}
                to={item.to}
                className={`pillar reveal reveal-delay-${i + 1}`}
              >
                <span className="pillar__num">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="pillar__link">
                  Lue lisää <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section events-preview">
        <div className="container">
          <div className="events-preview__head reveal">
            <div>
              <p className="eyebrow">Toiminta</p>
              <h2 className="section-title">Näin tapaamme</h2>
            </div>
            <Link to="/tapahtumat" className="btn btn--outline">
              Tapahtumat <span className="arrow">→</span>
            </Link>
          </div>

          <ul className="event-list">
            {highlights.map((event, i) => (
              <li key={event.title} className={`event-row reveal reveal-delay-${i + 1}`}>
                <span className="event-row__date">{event.date}</span>
                <div className="event-row__body">
                  <h3>{event.title}</h3>
                  <p>
                    {event.host} · {event.place}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section sulvi-band">
        <div className="container sulvi-band__inner reveal">
          <div>
            <p className="eyebrow">Suomen LVI-liitto</p>
            <h2 className="section-title">Osa valtakunnallista verkostoa</h2>
            <p className="section-lead">
              Liittymällä KuLVI:in olet myös SuLVI:n jäsen. Saat jäsenhintaiset koulutukset,
              Talotekniikka-lehden ja pääsyn lähes 4&nbsp;000 ammattilaisen verkostoon.
            </p>
          </div>
          <a
            className="btn btn--primary"
            href="https://sulvi.fi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tutustu SuLVI:in <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <section className="section cta">
        <div className="container cta__panel reveal">
          <h2>Tule mukaan Kuopion LVI-ammattilaisten joukkoon</h2>
          <p>
            Jäsenyys avaa koulutukset, kuukausikokoukset ja SuLVI:n edut. Liity paikalliseen
            yhdistykseen — olet samalla Suomen LVI-liiton jäsen.
          </p>
          <div className="btn-group">
            <a
              className="btn btn--primary"
              href="https://sulvi.fi/liity-jaseneksi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Liity jäseneksi
            </a>
            <Link to="/yhteystiedot" className="btn btn--outline">
              Ota yhteyttä
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
