import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, User, Mail, Phone, Package, Tag, Calendar, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'

interface QuoteForm {
  // Company
  companyName: string
  gstin: string
  industry: string
  // Contact
  contactName: string
  email: string
  phone: string
  // Order details
  selectedProducts: string[]
  totalUnits: string
  deliveryDate: string
  // Branding
  brandingType: string
  artworkReady: string
  // Notes
  notes: string
}

const INDUSTRIES = [
  'Technology & IT', 'BFSI (Banking, Finance, Insurance)', 'Healthcare & Pharma',
  'Manufacturing', 'Real Estate & Construction', 'Consulting & Professional Services',
  'FMCG & Retail', 'Hospitality & Tourism', 'Education', 'Other',
]

const BRANDING_TYPES = [
  'Screen Printing', 'Laser Engraving', 'Embroidery', 'Digital Print',
  'Debossing / Embossing', 'No Branding Required',
]

const INITIAL_FORM: QuoteForm = {
  companyName: '', gstin: '', industry: '',
  contactName: '', email: '', phone: '',
  selectedProducts: [], totalUnits: '',
  deliveryDate: '', brandingType: '', artworkReady: '',
  notes: '',
}

export function BulkOrderPage() {
  const [form, setForm] = useState<QuoteForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteForm, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const cartItems = useCartStore(s => s.items)

  const set = (field: keyof QuoteForm, value: string | string[]) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const toggleProduct = (id: string) => {
    const next = form.selectedProducts.includes(id)
      ? form.selectedProducts.filter(p => p !== id)
      : [...form.selectedProducts, id]
    set('selectedProducts', next)
  }

  const validate = () => {
    const e: Partial<Record<keyof QuoteForm, string>> = {}
    if (!form.companyName.trim()) e.companyName = 'Company name is required'
    if (!form.industry) e.industry = 'Please select your industry'
    if (!form.contactName.trim()) e.contactName = 'Contact name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone is required'
    if (form.selectedProducts.length === 0) e.selectedProducts = 'Please select at least one product'
    if (!form.totalUnits || isNaN(Number(form.totalUnits)) || Number(form.totalUnits) < 5) e.totalUnits = 'Minimum 5 units'
    if (!form.deliveryDate) e.deliveryDate = 'Delivery date is required'
    if (!form.brandingType) e.brandingType = 'Please select a branding type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Pre-populate products from cart if any
  const prefillFromCart = () => {
    const ids = cartItems.map(i => i.productId)
    set('selectedProducts', ids)
  }

  if (submitted) {
    return (
      <div className="quote-page">
        <div className="container-curio">
          <div className="quote-success">
            <CheckCircle2 size={72} className="quote-success__icon" />
            <h1>Quote Request Received!</h1>
            <p>Thank you, <strong>{form.contactName}</strong>! Our corporate gifting team will review your request for <strong>{form.companyName}</strong> and reach out to <strong>{form.email}</strong> within <strong>24 business hours</strong>.</p>
            <div className="quote-success__ref">Reference: QT-{Date.now().toString().slice(-6)}</div>
            <div className="quote-success__actions">
              <Link to="/shop" className="btn btn-primary btn-lg">Continue Browsing</Link>
              <Link to="/" className="btn btn-ghost btn-lg">Go Home</Link>
            </div>
          </div>
        </div>
        <style>{bulkStyles}</style>
      </div>
    )
  }

  return (
    <div className="quote-page">
      <div className="container-curio">

        {/* Hero */}
        <div className="quote-hero">
          <div className="quote-hero__badge">
            <Building2 size={14} /> Corporate Gifting
          </div>
          <h1 className="quote-hero__title">Request a Bulk Quote</h1>
          <p className="quote-hero__sub">
            Tell us about your requirement. Our account managers will get back with a personalised quote within 24 hours.
          </p>
          <div className="quote-hero__stats">
            <div className="quote-stat"><span className="quote-stat__num">500+</span><span>Brands Served</span></div>
            <div className="quote-stat-divider" />
            <div className="quote-stat"><span className="quote-stat__num">48hr</span><span>Avg. Turnaround</span></div>
            <div className="quote-stat-divider" />
            <div className="quote-stat"><span className="quote-stat__num">₹0</span><span>Consultation Fee</span></div>
          </div>
        </div>

        <form className="quote-form" onSubmit={handleSubmit} noValidate>

          {/* Section: Company Details */}
          <div className="quote-section">
            <div className="quote-section__head">
              <Building2 size={20} className="quote-section__icon" />
              <div>
                <h2 className="quote-section__title">Company Details</h2>
                <p className="quote-section__sub">Tell us about your organisation</p>
              </div>
            </div>
            <div className="quote-grid">
              <div className="form-group">
                <label htmlFor="companyName" className="form-label">Company Name *</label>
                <input
                  id="companyName"
                  type="text"
                  className={`form-input ${errors.companyName ? 'form-input--error' : ''}`}
                  placeholder="Acme Technologies Pvt. Ltd."
                  value={form.companyName}
                  onChange={e => set('companyName', e.target.value)}
                />
                {errors.companyName && <p className="form-error">{errors.companyName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="gstin" className="form-label">GSTIN <span className="form-label--optional">(optional)</span></label>
                <input
                  id="gstin"
                  type="text"
                  className="form-input"
                  placeholder="22AAAAA0000A1Z5"
                  value={form.gstin}
                  onChange={e => set('gstin', e.target.value.toUpperCase())}
                  maxLength={15}
                />
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="industry" className="form-label">Industry *</label>
                <div className="form-select-wrap">
                  <select
                    id="industry"
                    className={`form-select ${errors.industry ? 'form-input--error' : ''}`}
                    value={form.industry}
                    onChange={e => set('industry', e.target.value)}
                  >
                    <option value="">Select your industry…</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={16} className="form-select-icon" />
                </div>
                {errors.industry && <p className="form-error">{errors.industry}</p>}
              </div>
            </div>
          </div>

          {/* Section: Contact Person */}
          <div className="quote-section">
            <div className="quote-section__head">
              <User size={20} className="quote-section__icon" />
              <div>
                <h2 className="quote-section__title">Contact Person</h2>
                <p className="quote-section__sub">Who should we reach out to?</p>
              </div>
            </div>
            <div className="quote-grid">
              <div className="form-group">
                <label htmlFor="contactName" className="form-label">Full Name *</label>
                <input
                  id="contactName"
                  type="text"
                  className={`form-input ${errors.contactName ? 'form-input--error' : ''}`}
                  placeholder="Priya Sharma"
                  value={form.contactName}
                  onChange={e => set('contactName', e.target.value)}
                />
                {errors.contactName && <p className="form-error">{errors.contactName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Work Email *</label>
                <div className="form-input-icon-wrap">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email"
                    type="email"
                    className={`form-input form-input--with-icon ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="priya@acme.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                </div>
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Mobile Number *</label>
                <div className="form-input-icon-wrap">
                  <Phone size={16} className="form-input-icon" />
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input form-input--with-icon ${errors.phone ? 'form-input--error' : ''}`}
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    maxLength={10}
                  />
                </div>
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section: Products */}
          <div className="quote-section">
            <div className="quote-section__head">
              <Package size={20} className="quote-section__icon" />
              <div>
                <h2 className="quote-section__title">Products Required *</h2>
                <p className="quote-section__sub">Select all that apply</p>
              </div>
              {cartItems.length > 0 && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={prefillFromCart} style={{ marginLeft: 'auto' }}>
                  Import from Cart
                </button>
              )}
            </div>

            <div className="product-picker">
              {PRODUCTS.map(p => {
                const selected = form.selectedProducts.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`product-pick-btn ${selected ? 'product-pick-btn--active' : ''}`}
                    onClick={() => toggleProduct(p.id)}
                    aria-pressed={selected}
                  >
                    <div className="product-pick-thumb">
                      {p.images[0] ? <img src={p.images[0]} alt={p.name} /> : <Package size={20} />}
                    </div>
                    <div className="product-pick-info">
                      <span className="product-pick-name">{p.name}</span>
                      <span className="product-pick-brand">{p.brand}</span>
                    </div>
                    <div className={`product-pick-check ${selected ? 'product-pick-check--on' : ''}`} aria-hidden="true">
                      ✓
                    </div>
                  </button>
                )
              })}
            </div>
            {errors.selectedProducts && <p className="form-error" style={{ marginTop: '0.5rem' }}>{errors.selectedProducts}</p>}
          </div>

          {/* Section: Order Details */}
          <div className="quote-section">
            <div className="quote-section__head">
              <Tag size={20} className="quote-section__icon" />
              <div>
                <h2 className="quote-section__title">Order Details</h2>
                <p className="quote-section__sub">Quantities, branding, and timeline</p>
              </div>
            </div>
            <div className="quote-grid">
              <div className="form-group">
                <label htmlFor="totalUnits" className="form-label">Total Units Required *</label>
                <input
                  id="totalUnits"
                  type="number"
                  className={`form-input ${errors.totalUnits ? 'form-input--error' : ''}`}
                  placeholder="e.g. 250"
                  min={5}
                  value={form.totalUnits}
                  onChange={e => set('totalUnits', e.target.value)}
                />
                {errors.totalUnits && <p className="form-error">{errors.totalUnits}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="deliveryDate" className="form-label">
                  <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  Required by Date *
                </label>
                <input
                  id="deliveryDate"
                  type="date"
                  className={`form-input ${errors.deliveryDate ? 'form-input--error' : ''}`}
                  value={form.deliveryDate}
                  min={new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}
                  onChange={e => set('deliveryDate', e.target.value)}
                />
                {errors.deliveryDate && <p className="form-error">{errors.deliveryDate}</p>}
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="brandingType" className="form-label">Branding Type *</label>
                <div className="branding-pills">
                  {BRANDING_TYPES.map(b => (
                    <button
                      key={b}
                      type="button"
                      className={`branding-pill ${form.brandingType === b ? 'branding-pill--active' : ''}`}
                      onClick={() => set('brandingType', b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                {errors.brandingType && <p className="form-error">{errors.brandingType}</p>}
              </div>

              <div className="form-group form-group--full">
                <label className="form-label">Artwork / Logo Ready?</label>
                <div className="radio-group">
                  {['Yes, artwork is ready', 'No, I need design help', 'Not sure yet'].map(opt => (
                    <label key={opt} className={`radio-pill ${form.artworkReady === opt ? 'radio-pill--active' : ''}`}>
                      <input
                        type="radio"
                        name="artworkReady"
                        value={opt}
                        checked={form.artworkReady === opt}
                        onChange={() => set('artworkReady', opt)}
                        className="radio-pill__input"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="notes" className="form-label">Additional Notes <span className="form-label--optional">(optional)</span></label>
                <textarea
                  id="notes"
                  className="form-input form-textarea"
                  placeholder="Any special packaging requirements, event details, delivery addresses, or other requests…"
                  rows={4}
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="quote-submit">
            <button
              type="submit"
              className="btn btn-primary btn-lg quote-submit__btn"
              disabled={loading}
            >
              {loading ? (
                <span className="quote-submit__loading">
                  <span className="spinner" /> Submitting…
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Submit Quote Request <ArrowRight size={18} />
                </span>
              )}
            </button>
            <p className="quote-submit__note">
              By submitting, you agree to be contacted by our sales team. No payment required at this stage.
            </p>
          </div>

        </form>
      </div>
      <style>{bulkStyles}</style>
    </div>
  )
}

const bulkStyles = `
  .quote-page {
    padding-block: 2rem 5rem;
  }

  /* Success state */
  .quote-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 60vh;
    justify-content: center;
    gap: 1rem;
  }

  .quote-success__icon {
    color: var(--color-success, #22c55e);
    margin-bottom: 1rem;
  }

  .quote-success h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .quote-success p {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    max-width: 540px;
    line-height: 1.65;
  }

  .quote-success__ref {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-family: monospace;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin-top: 0.5rem;
  }

  .quote-success__actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* Hero */
  .quote-hero {
    text-align: center;
    padding-block: 2rem 3rem;
    max-width: 640px;
    margin-inline: auto;
  }

  .quote-hero__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    color: var(--color-accent-text);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.4rem 1rem;
    border-radius: var(--radius-full);
    margin-bottom: 1rem;
  }

  .quote-hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .quote-hero__sub {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
    margin-bottom: 2rem;
  }

  .quote-hero__stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .quote-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .quote-stat__num {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-accent-text);
  }

  .quote-stat span:last-child {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .quote-stat-divider {
    width: 1px;
    height: 40px;
    background: var(--color-border);
  }

  /* Form layout */
  .quote-form {
    max-width: 820px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .quote-section {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .quote-section__head {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
    margin-bottom: 1.75rem;
  }

  .quote-section__icon {
    color: var(--color-accent-text);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .quote-section__title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .quote-section__sub {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .quote-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    .quote-grid { grid-template-columns: 1fr; }
  }

  .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
  .form-group--full { grid-column: 1 / -1; }

  .form-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .form-label--optional {
    font-weight: 400;
    color: var(--color-text-muted);
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

  .form-input-icon-wrap {
    position: relative;
  }

  .form-input-icon {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted);
    pointer-events: none;
  }

  .form-input--with-icon {
    padding-left: 2.5rem;
  }

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
    transition: border-color var(--transition-fast);
    box-sizing: border-box;
  }
  .form-select:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent);
  }

  .form-select-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text-muted);
  }

  .form-textarea { resize: vertical; min-height: 100px; }

  .form-error {
    font-size: 0.8125rem;
    color: var(--color-error, #ef4444);
  }

  /* Product picker */
  .product-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0.75rem;
  }

  .product-pick-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--color-bg);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    transition: border-color var(--transition-fast), background var(--transition-fast);
    position: relative;
  }
  .product-pick-btn:hover {
    border-color: var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
  }
  .product-pick-btn--active {
    border-color: var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg));
  }

  .product-pick-thumb {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--color-surface);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
  }
  .product-pick-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-pick-info {
    flex: 1;
    min-width: 0;
  }

  .product-pick-name {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .product-pick-brand {
    display: block;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 0.125rem;
  }

  .product-pick-check {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: transparent;
    flex-shrink: 0;
    transition: all var(--transition-fast);
  }
  .product-pick-check--on {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }

  /* Branding pills */
  .branding-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
  }

  .branding-pill {
    padding: 0.5rem 1rem;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-full);
    background: none;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .branding-pill:hover {
    border-color: var(--color-accent);
    color: var(--color-text-primary);
  }
  .branding-pill--active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-accent-contrast, #fff);
    font-weight: 600;
  }

  /* Radio pills */
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
  }

  .radio-pill {
    padding: 0.5rem 1rem;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
  }
  .radio-pill:hover {
    border-color: var(--color-accent);
    color: var(--color-text-primary);
  }
  .radio-pill--active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-accent-contrast, #fff);
    font-weight: 600;
  }

  .radio-pill__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* Submit */
  .quote-submit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-block: 1rem 2rem;
  }

  .quote-submit__btn {
    min-width: 280px;
    height: 3.25rem;
    font-size: 1.0625rem;
  }

  .quote-submit__note {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    text-align: center;
    max-width: 420px;
    line-height: 1.5;
  }

  .quote-submit__loading {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

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
