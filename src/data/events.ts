export type KulviEvent = {
  id: string
  /** ISO date YYYY-MM-DD */
  date: string
  time: string
  title: string
  host: string
  place: string
}

/** Kuukausikokoukset — päivitä tätä listaa kauden mukaan */
export const events: KulviEvent[] = [
  // Menneet
  {
    id: '2025-11-26',
    date: '2025-11-26',
    time: 'klo 19',
    title: 'Syyskokous',
    host: 'Isäntänä Koka Oy',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    id: '2026-01-21',
    date: '2026-01-21',
    time: 'klo 19',
    title: 'Tammikuun kuukausikokous',
    host: 'Isäntänä Paroc',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    id: '2026-02-18',
    date: '2026-02-18',
    time: 'klo 19',
    title: 'Helmikuun kuukausikokous',
    host: 'Isäntänä Vieser',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  // Tulevat (syksy 2026)
  {
    id: '2026-09-16',
    date: '2026-09-16',
    time: 'klo 19',
    title: 'Syyskuun kuukausikokous',
    host: 'Isäntä ilmoitetaan myöhemmin',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    id: '2026-10-21',
    date: '2026-10-21',
    time: 'klo 19',
    title: 'Lokakuun kuukausikokous',
    host: 'Isäntä ilmoitetaan myöhemmin',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    id: '2026-11-18',
    date: '2026-11-18',
    time: 'klo 19',
    title: 'Marraskuun kuukausikokous',
    host: 'Isäntä ilmoitetaan myöhemmin',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
  {
    id: '2026-11-25',
    date: '2026-11-25',
    time: 'klo 19',
    title: 'Syyskokous 2026',
    host: 'Isäntä ilmoitetaan myöhemmin',
    place: 'Kuopion Klubi, Kuninkaankatu 10',
  },
]

export function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function splitEvents(list: KulviEvent[] = events) {
  const today = todayISO()
  const upcoming = list
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = list
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
  return { upcoming, past }
}

export function formatFiDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}.${m}.${y}`
}

const WEEKDAYS = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'] as const

export function monthLabel(year: number, monthIndex: string | number) {
  const m = typeof monthIndex === 'string' ? Number(monthIndex) : monthIndex
  return new Date(year, m, 1).toLocaleDateString('fi-FI', {
    month: 'long',
    year: 'numeric',
  })
}

/** Calendar grid: Mon-first weeks */
export function buildMonthGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  // JS: 0=Sun..6=Sat → Mon-first offset
  const startOffset = (first.getDay() + 6) % 7
  const cells: Array<{ day: number | null; iso: string | null }> = []

  for (let i = 0; i < startOffset; i++) {
    cells.push({ day: null, iso: null })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    cells.push({ day, iso })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, iso: null })
  }

  return { weekdays: WEEKDAYS, cells }
}

export function eventsOnDay(iso: string, list: KulviEvent[] = events) {
  return list.filter((e) => e.date === iso)
}
