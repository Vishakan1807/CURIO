import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react'

type ContactTopic = 'general' | 'bulk' | 'support' | 'press' | 'careers'

const TOPICS: { value: ContactTopic; label: string }[] = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'bulk', label: 'Bulk / Corporate Order' },
  { value: 'support', label: 'Order Support' },
  { value: 'press', label: 'Press & Media' },
  { value: 'careers', label: 'Careers' },
]

const OFFICES = [
  {
    city: 'Bengaluru (HQ)',
    address: '4th Floor, BHIVE Workspace, 112/A, AKR Tech Park, Krishnarajapuram, Bengaluru — 560036',
    phone: '+91 80 4123 5678',
    hours: 'Mon–Fri, 9am–7pm IST',
  },
  {
    city: 'Mumbai',
    address: 'WeWork BKC, C-20, G Block, Bandra Kurla Complex, Mumbai — 400051',
    phone: '+91 22 6892 1100',
    hours: 'Mon–Fri, 9am–7pm IST',
  },
]

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Minimum order quantities vary by product — typically 5 units for premium kits and up to 50 units for stationery. Each product page shows the MOQ clearly.',
  },
  {
    q: 'How long does custom branding take?',
    a: 'Standard screen printing: 7–10 business days. Laser engraving: 5–7 days. Rush options available on request — contact us to discuss.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently we deliver across India (19,000+ pin codes). International shipping for select orders — raise a quote and our team will provide pricing.',
  },
  {
    q: 'Can I see samples before placing a bulk order?',
    a: 'Yes! Sample packs are available for ₹499 (refundable on bulk order). Add a note when raising your quote.',
  },
]

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'general' as ContactTopic, message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const setField = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim() || form.message.trim().length < 15) e.message = 'Message must be at least 15 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="container-curio">
          <div className="contact-success">
            <CheckCircle2 size={72} className="contact-success__icon" />
            <h1>Message Received!</h1>
            <p>Thanks, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within one business day.</p>
            <button className="btn btn-primary btn-lg" onClick={() => setSubmitted(false)} style={{ marginTop: '2rem' }}>
              Send Another Message
            </button>
          </div>
        </div>
        <style>{contactStyles}</style>
      </div>
    )
  }

  return (
    <div className="contact-page">

      {/* Hero */}
      <div className="contact-hero">
        <div className="container-curio">
          <div className="contact-hero__inner">
            <span className="contact-hero__eyebrow">
              <MessageSquare size={14} /> Get in Touch
            </span>
            <h1 className="contact-hero__title">We'd love to hear from you</h1>
            <p className="contact-hero__sub">
              Whether it's a quick question or a full enterprise brief — we respond to every message within one business day.
            </p>
          </div>
        </div>
      </div>

      <div className="container-curio contact-body">

        {/* Left: Form */}
        <div className="contact-form-col">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2 className="contact-form__title">Send a Message</h2>

            <div className="contact-form-grid">
              <div className="form-group">
                <label htmlFor="c-name" className="form-label">Your Name *</label>
                <input
                  id="c-name"
                  type="text"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="c-email" className="form-label">Email Address *</label>
                <input
                  id="c-email"
                  type="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="priya@company.com"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="c-phone" className="form-label">Phone <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(optional)</span></label>
                <input
                  id="c-phone"
                  type="tel"
                  className="form-input"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={e => setField('phone', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-topic" className="form-label">Topic</label>
                <div className="form-select-wrap">
                  <select
                    id="c-topic"
                    className="form-select"
                    value={form.topic}
                    onChange={e => setField('topic', e.target.value)}
                  >
                    {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="form-select-icon" />
                </div>
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="c-message" className="form-label">Message *</label>
                <textarea
                  id="c-message"
                  className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  placeholder="Tell us what you need — more details help us respond faster…"
                  rows={5}
                  value={form.message}
                  onChange={e => setField('message', e.target.value)}
                />
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg contact-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="spinner" /> Sending…
                </span>
              ) : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="contact-info-col">

          {/* Offices */}
          <div className="contact-card">
            <h3 className="contact-card__title">Our Offices</h3>
            <div className="office-list">
              {OFFICES.map(office => (
                <div key={office.city} className="office-item">
                  <div className="office-item__city">{office.city}</div>
                  <div className="office-item__detail">
                    <MapPin size={14} />
                    <span>{office.address}</span>
                  </div>
                  <div className="office-item__detail">
                    <Phone size={14} />
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a>
                  </div>
                  <div className="office-item__detail">
                    <Clock size={14} />
                    <span>{office.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct contact */}
          <div className="contact-card">
            <h3 className="contact-card__title">Quick Contact</h3>
            <div className="quick-contact-list">
              <a href="mailto:hello@curiogifts.in" className="quick-contact-item">
                <Mail size={18} className="quick-contact-item__icon" />
                <div>
                  <strong>General</strong>
                  <span>hello@curiogifts.in</span>
                </div>
              </a>
              <a href="mailto:corporate@curiogifts.in" className="quick-contact-item">
                <Mail size={18} className="quick-contact-item__icon" />
                <div>
                  <strong>Corporate Sales</strong>
                  <span>corporate@curiogifts.in</span>
                </div>
              </a>
              <a href="tel:+918041235678" className="quick-contact-item">
                <Phone size={18} className="quick-contact-item__icon" />
                <div>
                  <strong>Sales Hotline</strong>
                  <span>+91 80 4123 5678</span>
                </div>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="contact-card">
            <h3 className="contact-card__title">Frequently Asked</h3>
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}>
                  <button
                    className="faq-item__question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {faq.q}
                    <ChevronDown size={16} className="faq-item__chevron" />
                  </button>
                  {openFaq === i && (
                    <p className="faq-item__answer">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{contactStyles}</style>
    </div>
  )
}

const contactStyles = `
  .contact-page { padding-bottom: 5rem; }

  /* Success */
  .contact-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    gap: 1rem;
    padding-top: 3rem;
  }

  .contact-success__icon { color: var(--color-success, #22c55e); margin-bottom: 1rem; }

  .contact-success h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .contact-success p {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    max-width: 480px;
    line-height: 1.65;
  }

  /* Hero */
  .contact-hero {
    padding-block: 4rem 3rem;
    background: radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 3rem;
  }

  .contact-hero__inner {
    max-width: 580px;
    margin-inline: auto;
    text-align: center;
  }

  .contact-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent-text);
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    padding: 0.375rem 1rem;
    border-radius: var(--radius-full);
    margin-bottom: 1.25rem;
  }

  .contact-hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .contact-hero__sub {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
  }

  /* Body layout */
  .contact-body {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 3rem;
    align-items: start;
  }

  @media (max-width: 960px) {
    .contact-body { grid-template-columns: 1fr; }
  }

  /* Form */
  .contact-form {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 2.5rem;
  }

  .contact-form__title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    margin-bottom: 1.75rem;
  }

  .contact-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 580px) {
    .contact-form-grid { grid-template-columns: 1fr; }
  }

  .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
  .form-group--full { grid-column: 1 / -1; }

  .form-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: 0.9375rem;
    font-family: var(--font-body);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    box-sizing: border-box;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent);
  }

  .form-input::placeholder { color: var(--color-text-muted); }
  .form-input--error { border-color: var(--color-error, #ef4444); }

  .form-select-wrap { position: relative; }
  .form-select {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: 0.9375rem;
    font-family: var(--font-body);
    appearance: none;
    cursor: pointer;
    box-sizing: border-box;
  }
  .form-select:focus { outline: none; border-color: var(--color-accent); }
  .form-select-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text-muted);
  }

  .form-textarea { resize: vertical; min-height: 120px; }
  .form-error { font-size: 0.8125rem; color: var(--color-error, #ef4444); }

  .contact-submit-btn { width: 100%; }

  /* Info cards */
  .contact-info-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .contact-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.75rem;
  }

  .contact-card__title {
    font-family: var(--font-display);
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }

  /* Offices */
  .office-list { display: flex; flex-direction: column; gap: 1.5rem; }

  .office-item:not(:last-child) {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border-muted);
  }

  .office-item__city {
    font-weight: 700;
    font-size: 0.9375rem;
    margin-bottom: 0.625rem;
  }

  .office-item__detail {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-top: 0.375rem;
    line-height: 1.5;
  }

  .office-item__detail svg { flex-shrink: 0; margin-top: 2px; color: var(--color-text-muted); }

  .office-item__detail a {
    color: var(--color-accent-text);
    text-decoration: none;
  }

  /* Quick contact */
  .quick-contact-list { display: flex; flex-direction: column; gap: 0.875rem; }

  .quick-contact-item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--color-text-primary);
    transition: background var(--transition-fast);
  }
  .quick-contact-item:hover { background: var(--color-bg); }

  .quick-contact-item__icon { color: var(--color-accent-text); flex-shrink: 0; }

  .quick-contact-item strong { display: block; font-size: 0.875rem; margin-bottom: 0.125rem; }
  .quick-contact-item span { font-size: 0.8125rem; color: var(--color-text-muted); }

  /* FAQ */
  .faq-list { display: flex; flex-direction: column; }

  .faq-item {
    border-bottom: 1px solid var(--color-border-muted);
  }
  .faq-item:last-child { border-bottom: none; }

  .faq-item__question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding-block: 1rem;
    background: none;
    border: none;
    color: var(--color-text-primary);
    font-size: 0.9rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: color var(--transition-fast);
  }
  .faq-item__question:hover { color: var(--color-accent-text); }

  .faq-item__chevron {
    flex-shrink: 0;
    color: var(--color-text-muted);
    transition: transform var(--transition-fast);
  }
  .faq-item--open .faq-item__chevron { transform: rotate(180deg); }

  .faq-item__answer {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
    padding-bottom: 1rem;
  }

  /* Spinner */
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`
