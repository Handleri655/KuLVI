import { useMemo, useState } from 'react'
import {
  buildMonthGrid,
  eventsOnDay,
  formatFiDate,
  monthLabel,
  splitEvents,
  todayISO,
  type KulviEvent,
} from '../data/events'
import './EventCalendar.css'

type Props = {
  events: KulviEvent[]
  onSelectDate?: (iso: string | null) => void
  selectedDate?: string | null
}

export default function EventCalendar({ events, onSelectDate, selectedDate }: Props) {
  const today = todayISO()
  const initial = useMemo(() => {
    const { upcoming } = splitEvents(events)
    if (upcoming[0]) {
      const [y, m] = upcoming[0].date.split('-').map(Number)
      return { year: y, month: m - 1 }
    }
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  }, [events])

  const [year, setYear] = useState(initial.year)
  const [month, setMonth] = useState(initial.month)

  const { weekdays, cells } = buildMonthGrid(year, month)
  const eventDates = useMemo(() => new Set(events.map((e) => e.date)), [events])

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else setMonth((m) => m - 1)
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else setMonth((m) => m + 1)
  }

  function goToday() {
    const now = new Date()
    setYear(now.getFullYear())
    setMonth(now.getMonth())
    onSelectDate?.(today)
  }

  return (
    <div className="cal">
      <div className="cal__toolbar">
        <button type="button" className="cal__nav" onClick={prevMonth} aria-label="Edellinen kuukausi">
          ←
        </button>
        <div className="cal__title-wrap">
          <h3 className="cal__title">{monthLabel(year, month)}</h3>
          <button type="button" className="cal__today" onClick={goToday}>
            Tänään
          </button>
        </div>
        <button type="button" className="cal__nav" onClick={nextMonth} aria-label="Seuraava kuukausi">
          →
        </button>
      </div>

      <div className="cal__weekdays">
        {weekdays.map((d) => (
          <div key={d} className="cal__weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="cal__grid">
        {cells.map((cell, i) => {
          if (!cell.day || !cell.iso) {
            return <div key={`e-${i}`} className="cal__cell cal__cell--empty" />
          }
          const hasEvent = eventDates.has(cell.iso)
          const dayEvents = hasEvent ? eventsOnDay(cell.iso, events) : []
          const isToday = cell.iso === today
          const isSelected = cell.iso === selectedDate
          const isPast = cell.iso < today

          return (
            <button
              key={cell.iso}
              type="button"
              className={[
                'cal__cell',
                hasEvent ? 'cal__cell--event' : '',
                isToday ? 'cal__cell--today' : '',
                isSelected ? 'cal__cell--selected' : '',
                isPast && hasEvent ? 'cal__cell--past' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelectDate?.(hasEvent ? cell.iso : null)}
              disabled={!hasEvent}
              title={
                hasEvent
                  ? dayEvents.map((e) => `${formatFiDate(e.date)} · ${e.title}`).join(', ')
                  : undefined
              }
            >
              <span className="cal__day">{cell.day}</span>
              {hasEvent && <span className="cal__dot" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      <p className="cal__legend">
        <span className="cal__legend-item">
          <span className="cal__dot" /> Tapahtumapäivä
        </span>
        <span className="cal__legend-item cal__legend-item--today">Tänään</span>
      </p>
    </div>
  )
}
