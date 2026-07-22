import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { answerQuestionAsync, type ChatAnswer } from '../chatbot/engine'
import { suggestedQuestions } from '../chatbot/knowledge'
import './Chatbot.css'

type Message = {
  id: string
  role: 'user' | 'bot'
  text: string
  links?: ChatAnswer['links']
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hei! Kysy jäsenyydestä, maksuista, kokouksista tai yhteystiedoista — vastaan napakasti sivuston tietojen pohjalta.',
      links: [
        { label: 'Jäsenyys', path: '/jasenyys' },
        { label: 'Yhteystiedot', path: '/yhteystiedot' },
      ],
    },
  ])

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    inputRef.current?.focus()
  }, [open, messages, busy])

  async function ask(question: string) {
    const q = question.trim()
    if (!q || busy) return

    setInput('')
    setMessages((prev) => [...prev, { id: uid(), role: 'user', text: q }])
    setBusy(true)

    try {
      const answer = await answerQuestionAsync(q)
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'bot',
          text: answer.text,
          links: answer.links,
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void ask(input)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className={`chatbot ${open ? 'is-open' : ''}`}>
      {open && (
        <section
          className="chatbot__panel"
          role="dialog"
          aria-label="KuLVI-assistentti"
          aria-modal="false"
        >
          <header className="chatbot__header">
            <div>
              <p className="chatbot__title">KuLVI-assistentti</p>
              <p className="chatbot__subtitle">Vastaa sivuston tietojen perusteella</p>
            </div>
            <button
              type="button"
              className="chatbot__icon-btn"
              aria-label="Sulje chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>

          <div className="chatbot__messages" ref={listRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chatbot__bubble chatbot__bubble--${m.role}`}>
                <p>{m.text}</p>
                {m.links && m.links.length > 0 && (
                  <div className="chatbot__links">
                    {m.links.map((link) => (
                      <Link
                        key={link.path + link.label}
                        to={link.path}
                        className="chatbot__link"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {busy && (
              <div className="chatbot__bubble chatbot__bubble--bot chatbot__bubble--typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="chatbot__suggestions">
              {suggestedQuestions.map((q) => (
                <button key={q} type="button" onClick={() => void ask(q)} disabled={busy}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot__form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="chatbot-input">
              Kirjoita kysymys
            </label>
            <input
              id="chatbot-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Kysy KuLVI:sta…"
              autoComplete="off"
              disabled={busy}
            />
            <button type="submit" className="chatbot__send" disabled={busy || !input.trim()}>
              Lähetä
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot__launcher"
        aria-label={open ? 'Sulje assistentti' : 'Avaa assistentti'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '✕' : '💬'}
        {!open && <span className="chatbot__launcher-label">Kysy</span>}
      </button>
    </div>
  )
}
