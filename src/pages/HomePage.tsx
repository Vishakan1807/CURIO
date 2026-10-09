import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Building2,
  Clock,
  Gift,
  Package,
  Star,
  Truck,
  Users,
  Zap,
} from 'lucide-react'

/* ============================================================
   HOME PAGE — Curio & Co.
   Sections: Hero → Stats → Categories → Featured Products →
             How It Works → Brands → Occasions → Testimonials
   ============================================================ */

const CATEGORIES = [
  { label: 'Drinkware', href: '/shop/drinkware', emoji: '☕', desc: 'Bottles, mugs & flasks' },
  { label: 'Technology', href: '/shop/technology', emoji: '⚡', desc: 'Gadgets & accessories' },
  { label: 'Bags & Travel', href: '/shop/bags-travel', emoji: '🎒', desc: 'Backpacks & travel gear' },
  { label: 'Stationery', href: '/shop/stationery', emoji: '✒️', desc: 'Notebooks & desk essentials' },
  { label: 'Apparel', href: '/shop/apparel', emoji: '👕', desc: 'T-shirts, polos & more' },
  { label: 'Gift Hampers', href: '/shop/gift-hampers', emoji: '🎁', desc: 'Curated gift collections' },
  { label: 'Eco-Friendly', href: '/shop/eco-friendly', emoji: '🌿', desc: 'Sustainable gifting' },
  { label: 'Executive', href: '/shop/executive', emoji: '💼', desc: 'Premium luxury gifts' },
]

const FEATURED_PRODUCTS = [
  {
    id: 'fp-1',
    name: 'Insulated Flask 750ml',
    brand: 'boAt',
    category: 'Drinkware',
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 218,
    badge: 'Bestseller',
    image: null,
    minQty: 25,
  },
  {
    id: 'fp-2',
    name: 'Premium Notebook Set',
    brand: 'Moleskine',
    category: 'Stationery',
    price: 899,
    originalPrice: null,
    rating: 4.9,
    reviews: 144,
    badge: 'New',
    image: null,
    minQty: 10,
  },
  {
    id: 'fp-3',
    name: 'Wireless Power Bank 10000mAh',
    brand: 'Anker',
    category: 'Technology',
    price: 2499,
    originalPrice: 3299,
    rating: 4.6,
    reviews: 392,
    badge: null,
    image: null,
    minQty: 15,
  },
  {
    id: 'fp-4',
    name: 'Executive Welcome Kit',
    brand: 'Curio',
    category: 'Welcome Kits',
    price: 4999,
    originalPrice: 6499,
    rating: 4.8,
    reviews: 87,
    badge: 'Curated',
    image: null,
    minQty: 5,
  },
]

const STATS = [
  { value: '50,000+', label: 'Gifts delivered', Icon: Gift },
  { value: '1,200+', label: 'Corporate clients', Icon: Building2 },
  { value: '48 hrs', label: 'Average dispatch', Icon: Clock },
  { value: '4.9★', label: 'Client rating', Icon: Star },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose & Customize',
    desc: 'Browse our catalogue, pick products, set your budget — and tell us if you need custom branding.',
    Icon: Gift,
  },
  {
    step: '02',
    title: 'Get a Quote',
    desc: 'Share your quantity and timeline. We send a detailed quotation within 24 hours.',
    Icon: Package,
  },
  {
    step: '03',
    title: 'We Handle the Rest',
    desc: 'From branding to packaging to last-mile delivery — we manage the entire fulfilment process.',
    Icon: Truck,
  },
]

const OCCASIONS = [
  { label: 'Employee Onboarding', href: '/solutions/onboarding', desc: 'Welcome kits that make day-one memorable' },
  { label: 'Diwali & Festive', href: '/solutions/festival', desc: 'Thoughtfully curated festive hampers' },
  { label: 'Client Appreciation', href: '/solutions/client-gifts', desc: 'Gifts that strengthen relationships' },
  { label: 'Conference & Events', href: '/solutions/events', desc: 'Branded merchandise for every audience' },
  { label: 'Work Anniversaries', href: '/solutions/appreciation', desc: 'Celebrate milestones that matter' },
  { label: 'Executive Gifting', href: '/shop/executive', desc: 'Premium gifts for leaders and partners' },
]

const TESTIMONIALS = [
  {
    quote: 'Curio handled our entire Diwali gifting programme for 800+ employees across four cities. Flawless execution, beautiful packaging.',
    name: 'Priya Sharma',
    title: 'Head of People Operations',
    company: 'NovaTech India',
  },
  {
    quote: 'We\'ve been ordering onboarding kits through Curio for two years. Their attention to detail and reliability is unmatched.',
    name: 'Arjun Mehta',
    title: 'Co-Founder',
    company: 'Stackwise Labs',
  },
  {
    quote: 'The quality of the products and the speed of delivery genuinely surprised us. Our clients loved the executive gift sets.',
    name: 'Kavitha Nair',
    title: 'Marketing Director',
    company: 'Helix Consulting',
  },
]

const BRANDS = ['boAt', 'Anker', 'Parker', 'JBL', 'American Tourister', 'Moleskine', 'DailyObjects', 'Kokuyo Camlin']

export function HomePage() {
  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero section">
        <div className="container-curio hero__inner">
          <div className="hero__content">
            <div className="badge badge-accent hero__badge">
              <Zap size={10} />
              Corporate Gifting &bull; Bulk Orders &bull; Custom Branding
            </div>
            <h1 className="hero__headline">
              Gifts that speak<br />
              <em>before you do.</em>
            </h1>
            <p className="hero__subline">
              Premium corporate gifting solutions for teams of 5 to 50,000.
              Curated products, custom branding, and white-glove delivery — all in one place.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn-primary btn-xl">
                Browse Catalogue
                <ArrowRight size={16} />
              </Link>
              <Link to="/bulk-order" className="btn btn-secondary btn-xl">
                Request a Quote
              </Link>
            </div>
            <div className="hero__trust">
              <span><Award size={13} /> Trusted by 1,200+ companies</span>
              <span><Truck size={13} /> Pan-India delivery</span>
              <span><Users size={13} /> Dedicated account managers</span>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-card hero__visual-card--1">
              <div className="hero__visual-label">Welcome Kit</div>
              <div className="hero__visual-detail">boAt + Moleskine + Curio Flask</div>
              <div className="hero__visual-price">From ₹2,499 / kit</div>
            </div>
            <div className="hero__visual-card hero__visual-card--2">
              <div className="hero__visual-label">Diwali Hamper</div>
              <div className="hero__visual-detail">Curated luxury collection</div>
              <div className="hero__visual-price">From ₹999 / hamper</div>
            </div>
            <div className="hero__visual-card hero__visual-card--3">
              <div className="hero__visual-label">Executive Gift</div>
              <div className="hero__visual-detail">Parker + DailyObjects</div>
              <div className="hero__visual-price">From ₹4,999 / set</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-band" aria-label="Key statistics">
        <div className="container-curio stats-band__grid">
          {STATS.map(({ value, label, Icon }) => (
            <div key={label} className="stat-item">
              <Icon size={20} className="stat-item__icon" aria-hidden />
              <span className="stat-item__value">{value}</span>
              <span className="stat-item__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section-py home-categories" aria-label="Product categories">
        <div className="container-curio">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <Link to="/shop" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.href} to={cat.href} className="category-card">
                <span className="category-card__emoji" aria-hidden="true">{cat.emoji}</span>
                <span className="category-card__label">{cat.label}</span>
                <span className="category-card__desc">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section-py home-products" aria-label="Featured products">
        <div className="container-curio">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/shop" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="product-grid">
            {FEATURED_PRODUCTS.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                {/* Image placeholder */}
                <div className="product-card__image-wrap">
                  <div className="product-card__image-placeholder" aria-hidden>
                    <Gift size={32} />
                  </div>
                  {product.badge && (
                    <span className="product-card__badge badge badge-accent">{product.badge}</span>
                  )}
                </div>
                <div className="product-card__body">
                  <div className="product-card__meta">
                    <span className="product-card__brand">{product.brand}</span>
                    <span className="product-card__category">{product.category}</span>
                  </div>
                  <h3 className="product-card__name">{product.name}</h3>
                  <div className="product-card__rating">
                    <Star size={12} fill="currentColor" aria-hidden />
                    <span>{product.rating}</span>
                    <span className="product-card__rating-count">({product.reviews})</span>
                  </div>
                  <div className="product-card__pricing">
                    <span className="product-card__price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="product-card__original-price">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="product-card__moq">
                    Min. order: {product.minQty} units
                  </p>
                </div>
                <div className="product-card__hover-action">
                  <span className="btn btn-primary" style={{ width: '100%', fontSize: '0.8125rem' }}>
                    View Product
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-py home-how" aria-label="How it works">
        <div className="container-curio">
          <div className="section-header section-header--centered">
            <h2>How it works</h2>
            <p>From inquiry to doorstep in three clear steps.</p>
          </div>
          <div className="how-grid">
            {HOW_IT_WORKS.map(({ step, title, desc, Icon }) => (
              <div key={step} className="how-card">
                <div className="how-card__icon-wrap">
                  <Icon size={22} aria-hidden />
                </div>
                <span className="how-card__step">{step}</span>
                <h4 className="how-card__title">{title}</h4>
                <p className="how-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="section-py-sm home-brands" aria-label="Featured brands">
        <div className="container-curio">
          <p className="brands-label">Brands we carry</p>
          <div className="brands-strip">
            {BRANDS.map(brand => (
              <span key={brand} className="brands-strip__item">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OCCASIONS ── */}
      <section className="section-py home-occasions" aria-label="Shop by occasion">
        <div className="container-curio">
          <div className="section-header">
            <h2>Shop by Occasion</h2>
            <Link to="/solutions" className="btn btn-ghost btn-sm">
              All solutions <ArrowRight size={14} />
            </Link>
          </div>
          <div className="occasion-grid">
            {OCCASIONS.map(occ => (
              <Link key={occ.href} to={occ.href} className="occasion-card">
                <h4 className="occasion-card__title">{occ.label}</h4>
                <p className="occasion-card__desc">{occ.desc}</p>
                <span className="occasion-card__arrow">
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-py home-testimonials" aria-label="Client testimonials">
        <div className="container-curio">
          <div className="section-header section-header--centered">
            <h2>Loved by companies across India</h2>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="testimonial-card">
                <div className="testimonial-card__stars" aria-label="5 stars">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={13} fill="currentColor" aria-hidden />
                  ))}
                </div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <footer className="testimonial-card__footer">
                  <span className="testimonial-card__name">{t.name}</span>
                  <span className="testimonial-card__role">{t.title}, {t.company}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <style>{homeStyles}</style>
    </div>
  )
}

const homeStyles = `
  /* ─────────────────── HERO ─────────────────── */
  .hero {
    padding-block: clamp(3.5rem, 10vw, 7rem);
    background-color: var(--color-bg);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--color-accent-muted) 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.6;
  }

  .hero__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  @media (max-width: 900px) {
    .hero__inner {
      grid-template-columns: 1fr;
    }
    .hero__visual { display: none; }
  }

  .hero__badge {
    margin-bottom: 1.5rem;
    display: inline-flex;
  }

  .hero__headline {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5.5vw, 4rem);
    font-weight: 400;
    color: var(--color-text-primary);
    line-height: 1.15;
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
  }

  .hero__headline em {
    font-style: italic;
    color: var(--color-accent);
  }

  .hero__subline {
    font-size: clamp(0.9375rem, 2vw, 1.125rem);
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 480px;
  }

  .hero__actions {
    display: flex;
    gap: 0.875rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .hero__trust {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  .hero__trust span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  /* Hero visual cards */
  .hero__visual {
    position: relative;
    height: 400px;
  }

  .hero__visual-card {
    position: absolute;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 200px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hero__visual-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  .hero__visual-card--1 {
    top: 0; left: 0;
    z-index: 3;
  }

  .hero__visual-card--2 {
    top: 40%; left: 25%;
    z-index: 2;
  }

  .hero__visual-card--3 {
    bottom: 0; right: 0;
    z-index: 1;
  }

  .hero__visual-label {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .hero__visual-detail {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  .hero__visual-price {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-accent);
    margin-top: 0.25rem;
  }

  /* ─────────────────── STATS BAND ─────────────────── */
  .stats-band {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    padding-block: 2rem;
  }

  .stats-band__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    text-align: center;
  }

  @media (max-width: 640px) {
    .stats-band__grid { grid-template-columns: repeat(2, 1fr); }
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding: 1rem;
  }

  .stat-item__icon {
    color: var(--color-accent);
    margin-bottom: 0.25rem;
  }

  .stat-item__value {
    font-family: var(--font-display);
    font-size: 1.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 1;
  }

  .stat-item__label {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  /* ─────────────────── SECTION HEADER ─────────────────── */
  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .section-header--centered {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section-header--centered p {
    font-size: 1.0625rem;
    max-width: 480px;
  }

  /* ─────────────────── CATEGORIES ─────────────────── */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    .category-grid { grid-template-columns: repeat(4, 1fr); }
  }

  @media (max-width: 768px) {
    .category-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 480px) {
    .category-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
    padding: 1.5rem 1rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      transform var(--transition-fast),
      background-color var(--transition-fast);
  }

  .category-card:hover {
    border-color: var(--color-accent-subtle);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    background-color: var(--color-accent-muted);
  }

  .category-card__emoji {
    font-size: 2rem;
    line-height: 1;
    display: block;
  }

  .category-card__label {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-primary);
    display: block;
  }

  .category-card__desc {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    display: block;
  }

  /* ─────────────────── PRODUCTS ─────────────────── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 1024px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 480px) {
    .product-grid { grid-template-columns: 1fr; }
  }

  .product-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    text-decoration: none;
    transition:
      box-shadow var(--transition-fast),
      transform var(--transition-fast),
      border-color var(--transition-fast);
    position: relative;
  }

  .product-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
    border-color: var(--color-accent-subtle);
  }

  .product-card__image-wrap {
    position: relative;
    aspect-ratio: 4/3;
    background-color: var(--color-surface-2);
    overflow: hidden;
  }

  .product-card__image-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-border);
  }

  .product-card__badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1;
  }

  .product-card__body {
    padding: 1rem 1.125rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .product-card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .product-card__brand {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-accent-text);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .product-card__category {
    font-size: 0.7rem;
    color: var(--color-text-muted);
  }

  .product-card__name {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-primary);
    line-height: 1.3;
    margin: 0;
  }

  .product-card__rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8125rem;
    color: var(--color-gold);
    font-weight: 500;
  }

  .product-card__rating-count {
    color: var(--color-text-muted);
    font-weight: 400;
  }

  .product-card__pricing {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-top: 0.125rem;
  }

  .product-card__price {
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .product-card__original-price {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-decoration: line-through;
  }

  .product-card__moq {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 0.125rem;
  }

  .product-card__hover-action {
    padding: 0.75rem 1.125rem;
    border-top: 1px solid var(--color-border-muted);
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast);
  }

  .product-card:hover .product-card__hover-action {
    opacity: 1;
    transform: translateY(0);
  }

  /* ─────────────────── HOW IT WORKS ─────────────────── */
  .home-how {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .how-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2.5rem;
  }

  @media (max-width: 768px) {
    .how-grid { grid-template-columns: 1fr; }
  }

  .how-card {
    text-align: center;
    padding: 2rem 1.5rem;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    position: relative;
  }

  .how-card__icon-wrap {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    background-color: var(--color-accent-muted);
    color: var(--color-accent);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .how-card__step {
    display: block;
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 300;
    color: var(--color-border);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .how-card__title {
    font-size: 1.0625rem;
    color: var(--color-text-primary);
    margin-bottom: 0.625rem;
    font-weight: 600;
    font-family: var(--font-body);
  }

  .how-card__desc {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  /* ─────────────────── BRANDS ─────────────────── */
  .home-brands { border-top: 1px solid var(--color-border-muted); }

  .brands-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: 1.25rem;
  }

  .brands-strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem 1.5rem;
  }

  .brands-strip__item {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-text-muted);
    letter-spacing: 0.04em;
    transition: color var(--transition-fast);
    cursor: default;
  }

  .brands-strip__item:hover { color: var(--color-text-secondary); }

  /* ─────────────────── OCCASIONS ─────────────────── */
  .occasion-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .occasion-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 480px) {
    .occasion-grid { grid-template-columns: 1fr; }
  }

  .occasion-card {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1.5rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    position: relative;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      background-color var(--transition-fast);
  }

  .occasion-card:hover {
    border-color: var(--color-accent-subtle);
    box-shadow: var(--shadow-md);
    background-color: var(--color-accent-muted);
  }

  .occasion-card__title {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .occasion-card__desc {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .occasion-card__arrow {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    color: var(--color-accent);
    opacity: 0;
    transform: translateX(-4px);
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast);
  }

  .occasion-card:hover .occasion-card__arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ─────────────────── TESTIMONIALS ─────────────────── */
  .home-testimonials {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 2rem;
  }

  @media (max-width: 900px) {
    .testimonial-grid { grid-template-columns: 1fr; }
  }

  .testimonial-card {
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .testimonial-card__stars {
    display: flex;
    gap: 2px;
    color: var(--color-gold);
  }

  .testimonial-card__quote {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    flex: 1;
    font-style: italic;
  }

  .testimonial-card__footer {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-top: 1px solid var(--color-border-muted);
    padding-top: 1rem;
  }

  .testimonial-card__name {
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--color-text-primary);
    display: block;
  }

  .testimonial-card__role {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    display: block;
  }
`
