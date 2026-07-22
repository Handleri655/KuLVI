import { useMemo, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import MiniMap from '../components/MiniMap'
import EventCalendar from '../components/EventCalendar'
import {
  events,
  eventsOnDay,
  formatFiDate,
  splitEvents,
} from '../data/events'
import './Page.css'

export default function Events() {
  const ref = useReveal<HTMLDivElement>()
  const { upcoming, past } = useMemo(() => splitEvents(events), [])
  const [selectedDate, setSelectedDate] = useState<string | null>(
    upcoming[0]?.date ?? null,
  )

  const selectedEvents = selectedDate ? eventsOnDay(selectedDate, events) : []
  const listToShow =
    selectedDate && selectedEvents.length
      ? selectedEvents
      : upcoming

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
            Kuukausikokoukset pidetään pääsääntöisesti Kuopion Klubilla. Valitse päivä
            kalenterista tai selaa tulevia tapahtumia.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: '1.5rem' }}>
            <p className="eyebrow">Kalenteri</p>
            <h2 className="section-title">Tulevat tapahtumat</h2>
            <p className="section-lead">
              Klikkaa merkittyä päivää nähdäksesi illan ohjelman.
            </p>
          </div>

          <div className="events-cal-layout">
            <div className="reveal">
              <EventCalendar
                events={events}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            <div className="reveal reveal-delay-1">
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                  {selectedDate && selectedEvents.length
                    ? formatFiDate(selectedDate)
                    : 'Seuraavat kokoukset'}
                </h3>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                  {selectedDate && selectedEvents.length
                    ? 'Valitun päivän tapahtumat'
                    : `${upcoming.length} tulevaa tapahtumaa`}
                </p>
              </div>

              {listToShow.length === 0 ? (
                <div className="events-empty">
                  Ei tulevia tapahtumia kalenterissa. Kysy puheenjohtajalta ajantasaiset
                  tiedot.
                </div>
              ) : (
                <ul className="events-upcoming-list">
                  {listToShow.map((event) => (
                    <li
                      key={event.id}
                      className={`event-card ${
                        selectedDate === event.date ? 'is-active' : ''
                      }`}
                    >
                      <p className="event-card__date">
                        {formatFiDate(event.date)} · {event.time}
                      </p>
                      <h3>{event.title}</h3>
                      <p>{event.host}</p>
                      <p className="event-card__place">{event.place}</p>
                    </li>
                  ))}
                </ul>
              )}

              {selectedDate && (
                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ marginTop: '1rem' }}
                  onClick={() => setSelectedDate(null)}
                >
                  Näytä kaikki tulevat
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container notice notice--with-map reveal">
          <div>
            <h2>Kokouspaikka</h2>
            <p>Kuopion Klubi, Kuninkaankatu 10, 70100 Kuopio.</p>
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
            {past.map((event, i) => (
              <li key={event.id} className={`timeline__item reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="timeline__date">
                  <strong>{formatFiDate(event.date)}</strong>
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
