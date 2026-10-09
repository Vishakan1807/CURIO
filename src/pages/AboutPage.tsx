import { Link } from 'react-router-dom'
import { Award, Users, Globe, Leaf, ArrowRight, Quote } from 'lucide-react'

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    bio: 'Former Head of Procurement at Infosys. Built Curio to fix what he experienced firsthand — slow, opaque corporate gifting.',
    initials: 'AM',
    color: '#6C63FF',
  },
  {
    name: 'Priya Nair',
    role: 'Chief Design Officer',
    bio: 'Ex-designer at Titan and Puma. Curates every product in the catalogue with an obsessive eye for detail and brand fit.',
    initials: 'PN',
    color: '#E85D9D',
  },
  {
    name: 'Rohan Desai',
    role: 'Head of Operations',
    bio: '10 years in supply chain at Flipkart. Runs vendor relationships and ensures every order ships on time, every time.',
    initials: 'RD',
    color: '#22C55E',
  },
]

const MILESTONES = [
  { year: '2019', text: 'Founded in Bengaluru with 3 people and a shared Google Sheet.' },
  { year: '2021', text: 'Crossed ₹1 Cr in GMV. Launched our first custom branding facility.' },
  { year: '2022', text: 'Expanded to 50+ enterprise clients including Razorpay and Swiggy.' },
  { year: '2024', text: 'Launched Curio 2.0 — fully digital, real-time catalogue with instant quotes.' },
]

const VALUES = [
  {
    icon: <Award size={28} />,
    title: 'Quality First',
    body: 'Every product is sampled, tested, and approved by our design team before listing. We stock only what we\'d give ourselves.',
  },
  {
    icon: <Users size={28} />,
    title: 'People-Centric',
    body: 'We believe gifts are relationships made tangible. Every product we curate is chosen to make the recipient feel valued.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Pan-India Reach',
    body: 'From Mumbai to Manipur — our logistics network reaches 19,000+ pin codes across India within 72 hours.',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Sustainably Minded',
    body: 'Our Eco-Friendly range is FSC-certified and plastic-free. We offset all last-mile delivery carbon through verified partners.',
  },
]

export function AboutPage() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="container-curio">
          <div className="about-hero__inner">
            <span className="about-hero__eyebrow">Our Story</span>
            <h1 className="about-hero__title">We make gifting feel like you meant it</h1>
            <p className="about-hero__sub">
              Curio & Co. was born from a simple frustration: corporate gifting felt transactional, impersonal, and slow. 
              We set out to change that — building a platform where every gift is curated, every order is traceable, 
              and every brand interaction feels premium.
            </p>
            <div className="about-hero__cta">
              <Link to="/shop" className="btn btn-primary btn-lg">Browse Our Catalogue</Link>
              <Link to="/bulk-order" className="btn btn-ghost btn-lg">Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="about-stats-bar">
        <div className="container-curio">
          <div className="about-stats-grid">
            {[
              { num: '500+', label: 'Enterprise Clients' },
              { num: '2M+', label: 'Gifts Delivered' },
              { num: '19,000+', label: 'Pin Codes Reached' },
              { num: '98%', label: 'On-Time Delivery' },
            ].map(stat => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat__num">{stat.num}</span>
                <span className="about-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section container-curio">
        <div className="about-section__head">
          <h2>What We Stand For</h2>
          <p>Our values aren't posters on a wall — they show up in every order, every call, every product choice.</p>
        </div>
        <div className="values-grid">
          {VALUES.map(v => (
            <div key={v.title} className="value-card">
              <div className="value-card__icon">{v.icon}</div>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section container-curio">
        <div className="about-section__head">
          <h2>Our Journey</h2>
          <p>Five years of building something we're proud of.</p>
        </div>
        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
              <div className="timeline-item__dot" />
              <div className="timeline-item__card">
                <span className="timeline-item__year">{m.year}</span>
                <p className="timeline-item__text">{m.text}</p>
              </div>
            </div>
          ))}
          <div className="timeline__line" />
        </div>
      </section>

      {/* Team */}
      <section className="about-section container-curio">
        <div className="about-section__head">
          <h2>The People Behind Curio</h2>
          <p>A small, obsessed team that cares deeply about every detail.</p>
        </div>
        <div className="team-grid">
          {TEAM.map(m => (
            <div key={m.name} className="team-card">
              <div className="team-card__avatar" style={{ background: m.color }}>{m.initials}</div>
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
              <p className="team-card__bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="about-testimonial">
        <div className="container-curio">
          <div className="testimonial-card">
            <Quote size={40} className="testimonial-card__quote-icon" />
            <p className="testimonial-card__body">
              "Curio transformed our onboarding experience. The quality of the welcome kits, the speed of delivery, 
              and the white-glove account management — nothing else in the market comes close."
            </p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__author-avatar">RS</div>
              <div>
                <strong>Riya Singh</strong>
                <span>Head of People Experience, Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta container-curio">
        <div className="about-cta__inner">
          <h2>Ready to gift smarter?</h2>
          <p>Join 500+ companies that trust Curio for their most important gifting moments.</p>
          <Link to="/bulk-order" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>
            Get a Free Quote <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      </section>

      <style>{aboutStyles}</style>
    </div>
  )
}

const aboutStyles = `
  .about-page { overflow: hidden; }

  /* Hero */
  .about-hero {
    padding-block: 5rem 4rem;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent);
    border-bottom: 1px solid var(--color-border);
  }

  .about-hero__inner {
    max-width: 720px;
    margin-inline: auto;
    text-align: center;
  }

  .about-hero__eyebrow {
    display: inline-block;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent-text);
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    padding: 0.375rem 1rem;
    border-radius: var(--radius-full);
    margin-bottom: 1.5rem;
  }

  .about-hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.1;
    margin-bottom: 1.25rem;
  }

  .about-hero__sub {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-inline: auto;
  }

  .about-hero__cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Stats */
  .about-stats-bar {
    padding-block: 3rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .about-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
  }

  @media (max-width: 700px) {
    .about-stats-grid { grid-template-columns: 1fr 1fr; }
  }

  .about-stat { display: flex; flex-direction: column; gap: 0.375rem; }

  .about-stat__num {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-accent-text);
    line-height: 1;
  }

  .about-stat__label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  /* Section template */
  .about-section {
    padding-block: 5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .about-section__head {
    text-align: center;
    max-width: 560px;
    margin-inline: auto;
    margin-bottom: 3.5rem;
  }

  .about-section__head h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    margin-bottom: 0.875rem;
  }

  .about-section__head p {
    color: var(--color-text-secondary);
    font-size: 1.0625rem;
    line-height: 1.6;
  }

  /* Values */
  .values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 700px) {
    .values-grid { grid-template-columns: 1fr; }
  }

  .value-card {
    padding: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    transition: box-shadow var(--transition-base), transform var(--transition-base);
  }
  .value-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
  }

  .value-card__icon {
    color: var(--color-accent-text);
    margin-bottom: 1.25rem;
  }

  .value-card__title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .value-card__body {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  /* Timeline */
  .timeline {
    position: relative;
    max-width: 700px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .timeline__line {
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: var(--color-border);
    z-index: 0;
  }

  @media (max-width: 600px) {
    .timeline__line { left: 1rem; }
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    position: relative;
    z-index: 1;
  }

  .timeline-item--left { flex-direction: row; }
  .timeline-item--right { flex-direction: row-reverse; }

  @media (max-width: 600px) {
    .timeline-item--left,
    .timeline-item--right { flex-direction: row; padding-left: 2.5rem; }
  }

  .timeline-item__dot {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-accent);
    border: 3px solid var(--color-bg);
    box-shadow: 0 0 0 2px var(--color-accent);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.75rem;
  }

  @media (max-width: 600px) {
    .timeline-item__dot { left: 1rem; transform: none; }
  }

  .timeline-item__card {
    flex: 1;
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .timeline-item__year {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-accent-text);
    display: block;
    margin-bottom: 0.5rem;
  }

  .timeline-item__text {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  /* Team */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 700px) {
    .team-grid { grid-template-columns: 1fr; }
  }

  .team-card {
    padding: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    text-align: center;
    transition: box-shadow var(--transition-base);
  }
  .team-card:hover { box-shadow: var(--shadow-lg); }

  .team-card__avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin-inline: auto;
    margin-bottom: 1.25rem;
    font-family: var(--font-display);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .team-card__name {
    font-family: var(--font-display);
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  .team-card__role {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--color-accent-text);
    margin-bottom: 0.875rem;
  }

  .team-card__bio {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  /* Testimonial */
  .about-testimonial {
    padding-block: 5rem;
    background: var(--color-surface);
    border-block: 1px solid var(--color-border);
  }

  .testimonial-card {
    max-width: 720px;
    margin-inline: auto;
    text-align: center;
  }

  .testimonial-card__quote-icon {
    color: var(--color-accent);
    margin-bottom: 1.5rem;
  }

  .testimonial-card__body {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    line-height: 1.5;
    color: var(--color-text-primary);
    margin-bottom: 2rem;
  }

  .testimonial-card__author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .testimonial-card__author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    font-family: var(--font-display);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  .testimonial-card__author strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.125rem;
  }

  .testimonial-card__author span {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  /* CTA */
  .about-cta {
    padding-block: 6rem;
  }

  .about-cta__inner {
    max-width: 560px;
    margin-inline: auto;
    text-align: center;
  }

  .about-cta__inner h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1rem;
  }

  .about-cta__inner p {
    color: var(--color-text-secondary);
    font-size: 1.0625rem;
    line-height: 1.6;
  }
`
