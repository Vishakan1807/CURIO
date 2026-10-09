import { Link } from 'react-router-dom'
import { ArrowUpRight, Globe, MessageCircle, Send } from 'lucide-react'

const FOOTER_LINKS = {
  shop: {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Gift Hampers', href: '/shop/gift-hampers' },
      { label: 'Executive Gifts', href: '/shop/executive' },
      { label: 'Employee Kits', href: '/solutions/onboarding' },
      { label: 'Eco-Friendly', href: '/shop/eco-friendly' },
    ],
  },
  solutions: {
    title: 'Solutions',
    links: [
      { label: 'Bulk Orders', href: '/bulk-order' },
      { label: 'Corporate Gifting', href: '/solutions' },
      { label: 'Festival Gifting', href: '/solutions/festival' },
      { label: 'Event Merchandise', href: '/solutions/events' },
      { label: 'Custom Branding', href: '/bulk-order' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Curio', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Returns & Refunds', href: '/returns' },
    ],
  },
}

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: Globe },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: MessageCircle },
  { label: 'Twitter / X', href: 'https://x.com', Icon: Send },
]

export function Footer() {
  return (
    <footer className="curio-footer">
      {/* CTA Band */}
      <div className="curio-footer__cta-band">
        <div className="container-curio curio-footer__cta-inner">
          <div className="curio-footer__cta-text">
            <h3>Ready to gift with intention?</h3>
            <p>Tell us your budget, team size, and occasion — we'll handle the rest.</p>
          </div>
          <div className="curio-footer__cta-actions">
            <Link to="/bulk-order" className="btn btn-primary btn-lg">
              Request a Quote
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="curio-footer__main">
        <div className="container-curio">
          {/* Top row: brand + links */}
          <div className="curio-footer__grid">
            {/* Brand column */}
            <div className="curio-footer__brand">
              <Link to="/" className="curio-logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                <span className="curio-logo__mark" style={{ fontSize: '1.1rem' }}>✦</span>
                <span className="curio-logo__wordmark" style={{ fontSize: '1.5rem' }}>CURIO</span>
                <span className="curio-logo__amp">&amp; CO.</span>
              </Link>
              <p className="curio-footer__tagline">
                The art of giving,<br />made extraordinary.
              </p>
              <p className="curio-footer__desc">
                Premium corporate gifting solutions for teams, clients, and occasions that matter.
                Based in India. Shipping nationwide.
              </p>
              {/* Social links */}
              <div className="curio-footer__social">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="curio-footer__social-link"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.values(FOOTER_LINKS).map(column => (
              <div key={column.title} className="curio-footer__col">
                <h6 className="curio-footer__col-title">{column.title}</h6>
                <ul className="curio-footer__col-list">
                  {column.links.map(link => (
                    <li key={link.href}>
                      <Link to={link.href} className="curio-footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="curio-footer__bottom">
            <p className="curio-footer__copyright">
              © {new Date().getFullYear()} Curio & Co. All rights reserved.
            </p>
            <p className="curio-footer__made-in">
              Crafted with care &bull; Made in India
            </p>
          </div>
        </div>
      </div>

      <style>{footerStyles}</style>
    </footer>
  )
}

const footerStyles = `
  .curio-footer {
    margin-top: auto;
  }

  /* CTA Band */
  .curio-footer__cta-band {
    background-color: var(--color-accent);
    padding-block: 3rem;
  }

  .curio-footer__cta-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .curio-footer__cta-text h3 {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.375rem;
  }

  .curio-footer__cta-text p {
    color: rgba(255,255,255,0.75);
    font-size: 0.9375rem;
  }

  .curio-footer__cta-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .curio-footer__cta-band .btn-primary {
    background-color: #fff;
    color: var(--color-accent);
    border-color: #fff;
  }

  .curio-footer__cta-band .btn-primary:hover {
    background-color: rgba(255,255,255,0.9);
    border-color: rgba(255,255,255,0.9);
  }

  .curio-footer__cta-band .btn-secondary {
    color: #fff;
    border-color: rgba(255,255,255,0.5);
  }

  .curio-footer__cta-band .btn-secondary:hover {
    background-color: rgba(255,255,255,0.1);
    border-color: #fff;
  }

  /* Main footer */
  .curio-footer__main {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding-block: 3.5rem 2rem;
  }

  .curio-footer__grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 1024px) {
    .curio-footer__grid {
      grid-template-columns: 1fr 1fr;
    }
    .curio-footer__brand {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 640px) {
    .curio-footer__grid {
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    .curio-footer__brand {
      grid-column: 1 / -1;
    }
  }

  .curio-footer__brand {}

  .curio-footer__tagline {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--color-text-primary);
    line-height: 1.4;
    margin-bottom: 0.75rem;
    font-style: italic;
  }

  .curio-footer__desc {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 1.25rem;
    max-width: 280px;
  }

  .curio-footer__social {
    display: flex;
    gap: 0.5rem;
  }

  .curio-footer__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: var(--radius-md);
    background-color: var(--color-surface-2);
    color: var(--color-text-secondary);
    text-decoration: none;
    border: 1px solid var(--color-border);
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast),
      border-color var(--transition-fast);
  }

  .curio-footer__social-link:hover {
    color: var(--color-accent);
    background-color: var(--color-accent-muted);
    border-color: var(--color-accent-subtle);
  }

  /* Link columns */
  .curio-footer__col-title {
    font-family: var(--font-body);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: 1rem;
  }

  .curio-footer__col-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .curio-footer__link {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .curio-footer__link:hover {
    color: var(--color-text-primary);
  }

  /* Bottom bar */
  .curio-footer__bottom {
    border-top: 1px solid var(--color-border-muted);
    padding-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .curio-footer__copyright,
  .curio-footer__made-in {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }
`
