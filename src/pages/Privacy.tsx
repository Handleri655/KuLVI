import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Page.css'

export default function Privacy() {
  const ref = useReveal<HTMLDivElement>()
  usePageMeta({
    title: 'Tietosuojaseloste',
    description: 'Kuopion LVI-yhdistys ry:n tietosuojaseloste jäsen- ja hallitusalueesta.',
    path: '/tietosuoja',
  })

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Tietosuoja</p>
          <h1>Tietosuojaseloste</h1>
          <p>
            Tämä seloste kuvaa, miten Kuopion LVI-yhdistys ry käsittelee henkilötietoja
            verkkosivuillaan, erityisesti kirjautumisen takana olevilla jäsen- ja hallitusalueilla.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container prose reveal" style={{ maxWidth: '42rem' }}>
          <h2>Rekisterinpitäjä</h2>
          <p>
            Kuopion LVI-yhdistys ry (KuLVI)
            <br />
            Yhteyshenkilö: sihteeri Petteri Moilanen
            <br />
            <a href="mailto:petteri.moilanen@deekaxair.fi">petteri.moilanen@deekaxair.fi</a> ·{' '}
            <a href="tel:+358445990788">044 599 0788</a>
          </p>

          <h2>Mitä tietoja käsittelemme</h2>
          <p>
            Kirjautumisessa: sähköposti, salasana (hashattuna palveluntarjoajalla), rooli
            (jäsen/hallitus), istuntotiedot. Aineistoissa voi olla pöytäkirjoja ja tiedotteita, joissa
            esiintyy jäsenten tai hallituksen jäsenten nimiä ja yhteystietoja.
          </p>

          <h2>Miksi käsittelemme tietoja</h2>
          <p>
            Yhdistyksen toiminnan hoitaminen: jäsenviestintä, kokousaineistot ja hallituksen
            päätöksenteko. Oikeusperusteena on tyypillisesti oikeutettu etu ja/tai sopimus
            (jäsenyys) sekä tarvittaessa lakisääteiset velvoitteet.
          </p>

          <h2>Kenelle tiedot luovutetaan</h2>
          <p>
            Kirjautumis- ja tietokantapalveluna käytetään Supabasea (käsittelijä). Tietoja ei myydä.
            Hallitusaineistot näkyvät vain hallitus-roolin tunnuksilla; jäsenaineistot kirjautuneille
            jäsenille.
          </p>

          <h2>Säilytysaika</h2>
          <p>
            Käyttäjätilit säilytetään jäsenyyden ajan. Pöytäkirjojen säilytys määräytyy yhdistyksen
            arkistointikäytännön mukaan. Vanhat tunnukset poistetaan, kun niitä ei enää tarvita.
          </p>

          <h2>Suojaus</h2>
          <p>
            Yhteys on HTTPS. Pääsy rajataan rooleilla (RLS). Älä jaa tunnuksia. Tuotannossa suositellaan
            henkilökohtaisia tunnuksia ja tarvittaessa monivaiheista tunnistautumista.
          </p>

          <h2>Oikeutesi</h2>
          <p>
            Voit pyytää pääsyä tietoihisi, oikaisua tai poistamista siltä osin kuin laki sen sallii.
            Ota yhteyttä sihteeriin. Voit myös tehdä valituksen tietosuojavaltuutetulle.
          </p>

          <h2>Evästeet</h2>
          <p>
            Kirjautuminen käyttää istunnon ylläpitoon välttämättömiä evästeitä / paikallista
            tallennusta. Analytiikkaevästeitä ei ole käytössä oletuksena.
          </p>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/kirjaudu" className="btn btn--outline">
              Takaisin kirjautumiseen
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
