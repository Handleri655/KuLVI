import { knowledgeBase, type KnowledgeChunk } from './knowledge'

export type ChatAnswer = {
  text: string
  links: { label: string; path: string }[]
}

const STOP = new Set([
  'ja',
  'tai',
  'vai',
  'on',
  'ovat',
  'ole',
  'ei',
  'että',
  'kun',
  'jos',
  'mitä',
  'mikä',
  'missä',
  'kuka',
  'kenelle',
  'kuinka',
  'miten',
  'paljonko',
  'voi',
  'voidaan',
  'minä',
  'mä',
  'te',
  'se',
  'tämä',
  'tuo',
  'ne',
  'a',
  'the',
  'of',
  'in',
  'to',
  'for',
])

/** Napakat vastaukset aiheittain */
const SHORT: Record<string, ChatAnswer> = {
  greeting: {
    text: 'Hei! Kysy jäsenyydestä, maksuista, kokouksista tai yhteystiedoista.',
    links: [
      { label: 'Jäsenyys', path: '/jasenyys' },
      { label: 'Yhteystiedot', path: '/yhteystiedot' },
    ],
  },
  about: {
    text: 'KuLVI on Kuopion LVI-yhdistys ry — suunnittelijoiden, urakoitsijoiden ja kauppiaiden verkosto vuodesta 1959. Olemme SuLVI:n jäsenyhdistys.',
    links: [{ label: 'Etusivu', path: '/' }],
  },
  membership: {
    text: 'Jäsenyys tuo koulutukset, verkoston ja vaikuttamisen. Liittymällä KuLVI:in olet myös SuLVI:n jäsen.',
    links: [{ label: 'Jäsenyys', path: '/jasenyys' }],
  },
  join: {
    text: 'Liity SuLVI:n sivulla ja valitse Kuopion LVI-yhdistys. Linkki alla.',
    links: [{ label: 'Liity jäseneksi', path: '/jasenyys' }],
  },
  fees: {
    text: 'SuLVI:n osuus 2026: varsinainen jäsen 98 €, opiskelija 0 €. Paikallinen osuus lisää (yht. n. 98–133 €).',
    links: [{ label: 'Jäsenmaksut', path: '/jasenyys' }],
  },
  events: {
    text: 'Kuukausikokoukset yleensä Kuopion Klubilla. Syksyn 2026 ohjelma julkaistaan myöhemmin — kysy Jorma Kauppiselta.',
    links: [{ label: 'Tapahtumat', path: '/tapahtumat' }],
  },
  venue: {
    text: 'Kokouspaikka: Kuopion Klubi, Kuninkaankatu 10, Kuopio.',
    links: [{ label: 'Yhteystiedot', path: '/yhteystiedot' }],
  },
  contact: {
    text: 'Sihteeri Petteri Moilanen: 044 599 0788 · petteri.moilanen@deekaxair.fi',
    links: [{ label: 'Yhteystiedot', path: '/yhteystiedot' }],
  },
  chair: {
    text: 'Puheenjohtaja Jorma Kauppinen: 044 545 3158 · jorma.kauppinen@granlund.fi',
    links: [{ label: 'Hallitus', path: '/hallitus' }],
  },
  board: {
    text: 'Pj Jorma Kauppinen, vpj Jari Viiliäinen, sihteeri Petteri Moilanen. Muut: Virranta, Hyvärinen, Hänninen.',
    links: [{ label: 'Hallitus', path: '/hallitus' }],
  },
  training: {
    text: 'Järjestämme avoimia koulutuksia; jäsenille edullisemmat hinnat.',
    links: [{ label: 'Jäsenyys', path: '/jasenyys' }],
  },
  sulvi: {
    text: 'SuLVI on Suomen LVI-liitto. KuLVI:n jäsenenä olet automaattisesti myös SuLVI:n jäsen.',
    links: [{ label: 'Jäsenyys', path: '/jasenyys' }],
  },
  'members-area': {
    text: 'Jäsensivu vaatii kirjautumisen (/kirjaudu). Jäsen näkee jäsenaineistot; hallitus myös pöytäkirjat.',
    links: [{ label: 'Kirjaudu', path: '/kirjaudu' }],
  },
  'board-portal': {
    text: 'Hallituksen sivu on vain hallitustunnuksilla. Julkinen hallituslista: /hallitus.',
    links: [{ label: 'Kirjaudu', path: '/kirjaudu' }],
  },
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9åäö\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokens(text: string) {
  return normalize(text)
    .split(' ')
    .filter((t) => t.length > 1 && !STOP.has(t))
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  const hay = normalize(`${chunk.title} ${chunk.tags.join(' ')} ${chunk.text}`)
  const tagSet = new Set(chunk.tags.map((t) => normalize(t)))
  let score = 0

  for (const t of queryTokens) {
    if (tagSet.has(t) || [...tagSet].some((tag) => tag.includes(t) || t.includes(tag))) {
      score += 4
    }
    if (normalize(chunk.title).includes(t)) score += 3
    if (hay.includes(t)) score += 1.5
    const stem = t.replace(/(ssa|lla|lle|sta|ksi|ina|t|n|a|ä)$/u, '')
    if (stem.length > 3 && hay.includes(stem)) score += 1
  }

  return score
}

function detectIntent(q: string): string | null {
  const n = normalize(q)
  if (/(liity|liittym|miten.*jasen|kuinka.*jasen)/.test(n)) return 'join'
  if (/(jasenmaks|maksu|hinta|maksaa|euro|paljonko)/.test(n)) return 'fees'
  if (/(tapahtum|kokous|kalenter|milloin)/.test(n)) return 'events'
  if (/(osoite|klubi|missa|paikka|kartta|kuninkaankatu)/.test(n)) return 'venue'
  if (/(yhteys|sihteeri|soita|sahkopost|email|kontakti|ota yhteyt)/.test(n)) return 'contact'
  if (/(puheenjohtaja|jorma|kauppinen)/.test(n)) return 'chair'
  if (/(hallitus|kuka.*johtaa)/.test(n)) return 'board'
  if (/(koulutus|kurssi|patevyys)/.test(n)) return 'training'
  if (/(sulvi|liitto)/.test(n)) return 'sulvi'
  if (/(jasensivu|jasenille|kirjaudu)/.test(n)) return 'members-area'
  if (/(poytakirja|hallituksen sivu)/.test(n)) return 'board-portal'
  if (/(mika on|mita on|kuka olette|kulvi|yhdistys)/.test(n)) return 'about'
  if (/(jasen|edut)/.test(n)) return 'membership'
  if (/(moi|hei|terve|hello|hi)\b/.test(n) && n.split(' ').length <= 3) return 'greeting'
  return null
}

/** Enintään ~2 lausetta */
function shorten(text: string, maxSentences = 2): string {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  return sentences.slice(0, maxSentences).join(' ')
}

export function answerQuestion(question: string): ChatAnswer {
  const trimmed = question.trim()
  if (!trimmed) {
    return { text: 'Kirjoita lyhyt kysymys.', links: [] }
  }

  const intent = detectIntent(trimmed)
  if (intent && SHORT[intent]) {
    return SHORT[intent]
  }

  const qTokens = tokens(trimmed)
  const ranked = knowledgeBase
    .map((chunk) => ({
      chunk,
      score: scoreChunk(qTokens, chunk),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  if (!ranked.length) {
    return {
      text: 'En löytänyt vastausta. Kysy sihteeriltä: 044 599 0788.',
      links: [{ label: 'Yhteystiedot', path: '/yhteystiedot' }],
    }
  }

  const best = ranked[0].chunk
  return {
    text: shorten(best.text, 2),
    links: [{ label: best.title, path: best.path }],
  }
}

export async function answerQuestionAsync(question: string): Promise<ChatAnswer> {
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 150))
  return answerQuestion(question)
}
