import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Page.css'

const board = [
  {
    role: 'Puheenjohtaja',
    name: 'Jorma Kauppinen',
    photo: '/board/jorma-kauppinen.png',
  },
  { role: 'Varapuheenjohtaja', name: 'Jari Viiliäinen' },
  { role: 'Sihteeri', name: 'Petteri Moilanen' },
  { role: 'Taloudenhoitaja', name: 'Petteri Virranta' },
  { role: 'Koulutuspäällikkö', name: 'Tommi Hyvärinen' },
  { role: 'Tiedotuspäällikkö', name: 'Niilo Hänninen' },
  { role: 'Kerhomestari', name: 'Petteri Moilanen' },
]

export default function Board() {
  const ref = useReveal<HTMLDivElement>()
  usePageMeta({
    title: 'Hallitus',
    description: 'Kuopion LVI-yhdistyksen hallitus: puheenjohtaja, sihteeri ja muut vastuuhenkilöt.',
    path: '/hallitus',
  })

  const chair = board[0]
  const rest = board.slice(1)

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Hallitus</p>
          <h1>Kuopion LVI-yhdistyksen hallitus</h1>
          <p>Yhdistyksen toimintaa ohjaa hallitus, joka vastaa kokouksista, koulutuksesta ja tiedotuksesta.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <article className="chair-card reveal">
            <img
              src={chair.photo}
              alt={`${chair.name}, ${chair.role.toLowerCase()}`}
              className="chair-card__photo"
              width={280}
              height={280}
            />
            <div className="chair-card__body">
              <p className="board-card__role">{chair.role}</p>
              <h2 className="chair-card__name">{chair.name}</h2>
              <p className="text-muted">
                Kuopion LVI-yhdistyksen puheenjohtaja. Lisätietoja tapahtumista:{' '}
                <a href="tel:+358445453158">044 545 3158</a>
                {' · '}
                <a href="mailto:jorma.kauppinen@granlund.fi">jorma.kauppinen@granlund.fi</a>
              </p>
            </div>
          </article>

          <ul className="board-grid">
            {rest.map((member, i) => (
              <li
                key={`${member.role}-${member.name}`}
                className={`board-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <p className="board-card__role">{member.role}</p>
                <h2 className="board-card__name">{member.name}</h2>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
