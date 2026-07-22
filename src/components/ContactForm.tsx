import { useState, type FormEvent } from 'react'
import './ContactForm.css'

const SECRETARY_EMAIL = 'petteri.moilanen@deekaxair.fi'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Yhteydenotto KuLVI-sivuilta: ${name}`)
    const body = encodeURIComponent(
      [
        `Nimi: ${name}`,
        `Sähköposti: ${email}`,
        phone ? `Puhelin: ${phone}` : null,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    )
    window.location.href = `mailto:${SECRETARY_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="contact-form contact-form--done" role="status">
        <h3>Kiitos!</h3>
        <p>
          Sähköpostiohjelmasi pitäisi avautua valmiilla viestillä. Jos näin ei käynyt, lähetä
          viesti suoraan osoitteeseen{' '}
          <a href={`mailto:${SECRETARY_EMAIL}`}>{SECRETARY_EMAIL}</a>.
        </p>
        <button type="button" className="btn btn--outline" onClick={() => setSent(false)}>
          Lähetä uusi viesti
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <label htmlFor="cf-name">
          Nimi
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="cf-email">
          Sähköposti
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <label htmlFor="cf-phone">
        Puhelin <span className="optional">(valinnainen)</span>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label htmlFor="cf-message">
        Viesti
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn--primary">
        Avaa sähköposti <span className="arrow">→</span>
      </button>
      <p className="contact-form__hint">
        Lomake avaa sähköpostiohjelmasi — viesti lähtee suoraan sihteerille.
      </p>
    </form>
  )
}
