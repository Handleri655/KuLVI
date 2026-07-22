import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <p className="site-footer__name">KuLVI</p>
          <p className="site-footer__tagline">
            Kuopion LVI-yhdistys ry — suunnittelijoiden, urakoitsijoiden ja kauppiaiden
            ammattilaisverkosto vuodesta 1959.
          </p>
        </div>

        <div>
          <h3>Sivusto</h3>
          <ul>
            <li>
              <Link to="/jasenyys">Jäsenyys</Link>
            </li>
            <li>
              <Link to="/kirjaudu">Kirjaudu</Link>
            </li>
            <li>
              <Link to="/jasensivu">Jäsensivu</Link>
            </li>
            <li>
              <Link to="/tapahtumat">Tapahtumat</Link>
            </li>
            <li>
              <Link to="/hallitus">Hallitus</Link>
            </li>
            <li>
              <Link to="/yhteystiedot">Yhteystiedot</Link>
            </li>
            <li>
              <Link to="/tietosuoja">Tietosuoja</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Yhteys</h3>
          <ul>
            <li>
              <a href="mailto:petteri.moilanen@deekaxair.fi">petteri.moilanen@deekaxair.fi</a>
            </li>
            <li>
              <a href="tel:+358445990788">044 599 0788</a>
            </li>
            <li>Kuopion Klubi, Kuninkaankatu 10</li>
          </ul>
        </div>

        <div>
          <h3>SuLVI</h3>
          <ul>
            <li>
              <a href="https://sulvi.fi/" target="_blank" rel="noopener noreferrer">
                Suomen LVI-liitto
              </a>
            </li>
            <li>
              <a href="https://sulvi.fi/liity-jaseneksi/" target="_blank" rel="noopener noreferrer">
                Liity jäseneksi
              </a>
            </li>
            <li>
              <a href="https://sulvi.fi/tapahtumat/" target="_blank" rel="noopener noreferrer">
                SuLVI-tapahtumat
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} Kuopion LVI-yhdistys ry</p>
        <p>Jäsenyhdistys · Suomen LVI-liitto SuLVI ry</p>
      </div>
    </footer>
  )
}
