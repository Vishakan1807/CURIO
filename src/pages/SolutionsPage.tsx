import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Users, Gift, Briefcase, Heart, GraduationCap, Landmark } from 'lucide-react'

const SOLUTIONS = [
  {
    id: 'onboarding',
    icon: <Users size={32} />,
    title: 'Employee Onboarding Kits',
    headline: 'Make every first day unforgettable',
    description: 'Set the tone from Day 1. Our onboarding kits are carefully curated to reflect your company\'s culture — premium, personalised, and ready to impress your newest team members.',
    features: [
      'Custom-branded box with magnetic closure',
      'Personalized welcome card with employee name',
      'Choose from 50+ products across 8 categories',
      'Delivered directly to employee home addresses',
      'Dashboard to track all dispatches',
    ],
    usedBy: ['Razorpay', 'Zepto', 'CRED', 'Swiggy'],
    color: '#6C63FF',
    startingFrom: '₹1,499',
  },
  {
    id: 'festive',
    icon: <Gift size={32} />,
    title: 'Festive Gifting',
    headline: 'Celebrate every season at scale',
    description: 'Diwali, Christmas, Eid, New Year — every festival is an opportunity to strengthen relationships. We handle the curation, branding, and pan-India delivery so you can focus on the celebration.',
    features: [
      'Festival-specific curated collections',
      'Bulk discounts from 50+ units',
      'Real-time tracking for all shipments',
      'Hamper boxes with eco-friendly packaging',
      'Artwork and design support included',
    ],
    usedBy: ['HDFC Bank', 'Infosys', 'Tata Group', 'Bajaj'],
    color: '#F59E0B',
    startingFrom: '₹799',
  },
  {
    id: 'executive',
    icon: <Briefcase size={32} />,
    title: 'Executive & Leadership Gifting',
    headline: 'Premium gifts for your most important relationships',
    description: 'For C-suite, board members, key clients, and VIP partners — our executive gifting service delivers a white-glove experience from curation to doorstep. Every detail is personalised.',
    features: [
      'Hand-selected premium product range',
      'Luxury presentation boxes',
      'Handwritten (or printed) personal notes',
      'Individual packaging per recipient',
      'Dedicated relationship manager',
    ],
    usedBy: ['Goldman Sachs', 'McKinsey', 'Accenture', 'KPMG'],
    color: '#C0A060',
    startingFrom: '₹4,999',
  },
  {
    id: 'wellness',
    icon: <Heart size={32} />,
    title: 'Employee Wellness Kits',
    headline: 'Show your team you care',
    description: 'Burnout is real. Wellness gifting is a tangible signal that your company prioritises people. Our wellness kits are doctor-approved, thoughtfully assembled, and deeply appreciated.',
    features: [
      'Curated wellness products — teas, journals, desk plants',
      'Eco-friendly packaging',
      'Mental health resource card included',
      'Available for remote-first teams',
      'Custom messaging per kit',
    ],
    usedBy: ['Atlassian', 'Freshworks', 'Zoho', 'BrowserStack'],
    color: '#22C55E',
    startingFrom: '₹999',
  },
  {
    id: 'education',
    icon: <GraduationCap size={32} />,
    title: 'Campus & Intern Gifting',
    headline: 'Win hearts before they even join',
    description: 'Interns and campus hires are your future. Send branded kits to your shortlisted candidates or campus joiners — and watch your employer brand soar on LinkedIn.',
    features: [
      'Campus-specific product curation',
      'College branding + company branding',
      'Delivered across 500+ college campuses',
      'Bulk pricing for 100+ units',
      'Digital offer letter inserts available',
    ],
    usedBy: ['Deloitte', 'EY', 'Capgemini', 'IBM'],
    color: '#0EA5E9',
    startingFrom: '₹699',
  },
  {
    id: 'government',
    icon: <Landmark size={32} />,
    title: 'Government & PSU Gifting',
    headline: 'Compliant, credible, and memorable',
    description: 'Navigate the unique requirements of government procurement with confidence. Our team is experienced in GeM portal compliance, rate contracts, and large-scale PSU gifting mandates.',
    features: [
      'GeM-compliant product catalogue',
      'Rate contract expertise',
      'Pan-India delivery to government offices',
      'Itemized invoicing for audit trails',
      'CSR gifting options available',
    ],
    usedBy: ['ONGC', 'BHEL', 'SBI', 'IRCTC'],
    color: '#8B5CF6',
    startingFrom: '₹299',
  },
]

export function SolutionsPage() {
  const [activeId, setActiveId] = useState<string>('onboarding')
  const active = SOLUTIONS.find(s => s.id === activeId)!

  return (
    <div className="solutions-page">

      {/* Hero */}
      <div className="solutions-hero">
        <div className="container-curio">
          <div className="solutions-hero__inner">
            <span className="solutions-hero__eyebrow">Corporate Solutions</span>
            <h1 className="solutions-hero__title">The right gift for every occasion</h1>
            <p className="solutions-hero__sub">
              From 10-unit onboarding kits to 10,000-unit festive campaigns — Curio scales with your organisation. 
              Explore tailored gifting solutions for every use case.
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Tabs + Detail */}
      <div className="container-curio solutions-body">

        {/* Sidebar tabs */}
        <div className="solutions-tabs" role="tablist">
          {SOLUTIONS.map(s => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeId === s.id}
              className={`solutions-tab ${activeId === s.id ? 'solutions-tab--active' : ''}`}
              onClick={() => setActiveId(s.id)}
              style={{ '--sol-color': s.color } as React.CSSProperties}
            >
              <span className="solutions-tab__icon" style={{ color: s.color }}>{s.icon}</span>
              <span>{s.title}</span>
              <ArrowRight size={16} className="solutions-tab__arrow" />
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="solutions-detail" key={active.id}>
          <div className="solutions-detail__header" style={{ '--sol-color': active.color } as React.CSSProperties}>
            <div className="solutions-detail__icon-wrap" style={{ background: `${active.color}22`, color: active.color }}>
              {active.icon}
            </div>
            <div>
              <p className="solutions-detail__category">{active.title}</p>
              <h2 className="solutions-detail__headline">{active.headline}</h2>
            </div>
          </div>

          <p className="solutions-detail__desc">{active.description}</p>

          <div className="solutions-detail__features">
            <h3>What's Included</h3>
            <ul className="solutions-features-list">
              {active.features.map(f => (
                <li key={f}>
                  <CheckCircle size={16} className="solutions-feature-check" style={{ color: active.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="solutions-detail__footer">
            <div className="solutions-used-by">
              <p className="solutions-used-by__label">Trusted by</p>
              <div className="solutions-used-by__logos">
                {active.usedBy.map(brand => (
                  <span key={brand} className="solutions-brand-pill">{brand}</span>
                ))}
              </div>
            </div>

            <div className="solutions-cta">
              <div className="solutions-starting">
                Starting from <strong>{active.startingFrom}</strong> / unit
              </div>
              <div className="solutions-cta__actions">
                <Link to="/bulk-order" className="btn btn-primary btn-lg">
                  Get a Quote <ArrowRight size={18} />
                </Link>
                <Link to="/shop" className="btn btn-ghost btn-lg">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="solutions-bottom-cta">
        <div className="container-curio">
          <div className="solutions-bottom-cta__inner">
            <h2>Can't find what you're looking for?</h2>
            <p>Our corporate gifting experts will put together a fully bespoke solution — just tell us your brief.</p>
            <div className="solutions-bottom-cta__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Talk to an Expert</Link>
              <Link to="/shop" className="btn btn-ghost btn-lg">Explore Catalogue</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{solutionsStyles}</style>
    </div>
  )
}

const solutionsStyles = `
  .solutions-page { padding-bottom: 0; }

  /* Hero */
  .solutions-hero {
    padding-block: 4.5rem 3.5rem;
    border-bottom: 1px solid var(--color-border);
    background: radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent);
    margin-bottom: 3rem;
  }

  .solutions-hero__inner {
    max-width: 640px;
    margin-inline: auto;
    text-align: center;
  }

  .solutions-hero__eyebrow {
    display: inline-block;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent-text);
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    padding: 0.375rem 1rem;
    border-radius: var(--radius-full);
    margin-bottom: 1.25rem;
  }

  .solutions-hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.1;
    margin-bottom: 1.25rem;
  }

  .solutions-hero__sub {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
  }

  /* Body */
  .solutions-body {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2.5rem;
    align-items: start;
    padding-bottom: 5rem;
  }

  @media (max-width: 900px) {
    .solutions-body { grid-template-columns: 1fr; }
  }

  /* Tabs */
  .solutions-tabs {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    position: sticky;
    top: 6rem;
  }

  @media (max-width: 900px) {
    .solutions-tabs {
      flex-direction: row;
      overflow-x: auto;
      position: static;
      padding-bottom: 0.5rem;
    }
  }

  .solutions-tab {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: none;
    border: 1.5px solid transparent;
    border-radius: var(--radius-lg);
    cursor: pointer;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .solutions-tab:hover {
    background: var(--color-surface);
    color: var(--color-text-primary);
    border-color: var(--color-border);
  }

  .solutions-tab--active {
    background: var(--color-surface);
    color: var(--color-text-primary);
    border-color: var(--sol-color, var(--color-accent));
    font-weight: 600;
  }

  .solutions-tab__icon { flex-shrink: 0; }
  .solutions-tab__icon svg { display: block; width: 20px; height: 20px; }

  .solutions-tab__arrow {
    margin-left: auto;
    color: var(--color-text-muted);
    flex-shrink: 0;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  .solutions-tab--active .solutions-tab__arrow,
  .solutions-tab:hover .solutions-tab__arrow { opacity: 1; }

  @media (max-width: 900px) {
    .solutions-tab__arrow { display: none; }
  }

  /* Detail panel */
  .solutions-detail {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 2.5rem;
    animation: fadeInUp 0.3s ease;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .solutions-detail__header {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .solutions-detail__icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .solutions-detail__category {
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted);
    margin-bottom: 0.375rem;
  }

  .solutions-detail__headline {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    line-height: 1.2;
  }

  .solutions-detail__desc {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .solutions-detail__features h3 {
    font-family: var(--font-display);
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  .solutions-features-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .solutions-features-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .solutions-feature-check { flex-shrink: 0; margin-top: 2px; }

  /* Footer */
  .solutions-detail__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .solutions-used-by__label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted);
    margin-bottom: 0.625rem;
  }

  .solutions-used-by__logos {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .solutions-brand-pill {
    padding: 0.3rem 0.75rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .solutions-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }

  .solutions-starting {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    text-align: right;
  }
  .solutions-starting strong { color: var(--color-accent-text); font-size: 1.125rem; }

  .solutions-cta__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  /* Bottom CTA */
  .solutions-bottom-cta {
    padding-block: 5rem;
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
  }

  .solutions-bottom-cta__inner {
    max-width: 540px;
    margin-inline: auto;
    text-align: center;
  }

  .solutions-bottom-cta__inner h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    margin-bottom: 1rem;
  }

  .solutions-bottom-cta__inner p {
    color: var(--color-text-secondary);
    font-size: 1.0625rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .solutions-bottom-cta__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
`
