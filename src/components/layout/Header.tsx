import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import { PaletteDial } from '@/components/ui/PaletteDial'
import { useAuthStore } from '@/stores/authStore'

const NAV_CATEGORIES = [
  { label: 'Drinkware', href: '/shop/drinkware' },
  { label: 'Technology', href: '/shop/technology' },
  { label: 'Bags & Travel', href: '/shop/bags-travel' },
  { label: 'Stationery', href: '/shop/stationery' },
  { label: 'Apparel', href: '/shop/apparel' },
  { label: 'Gift Hampers', href: '/shop/gift-hampers' },
  { label: 'Eco-Friendly', href: '/shop/eco-friendly' },
  { label: 'Executive Gifts', href: '/shop/executive' },
]

const NAV_SOLUTIONS = [
  { label: 'Employee Welcome Kits', href: '/solutions/onboarding' },
  { label: 'Client Appreciation', href: '/solutions/client-gifts' },
  { label: 'Festival Gifting', href: '/solutions/festival' },
  { label: 'Event Merchandise', href: '/solutions/events' },
  { label: 'Bulk & Custom Orders', href: '/bulk-order' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
    setActiveDropdown(null)
  }

  // Scroll detection for header style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [searchOpen])

  // Close dropdown on outside click
  useEffect(() => {
    if (!activeDropdown) return
    const handle = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.nav-dropdown-trigger')) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [activeDropdown])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className={`curio-header ${scrolled ? 'curio-header--scrolled' : ''}`}>
        <div className="container-curio curio-header__inner">
          {/* Logo */}
          <Link to="/" className="curio-logo" aria-label="Curio — Home">
            <span className="curio-logo__mark">✦</span>
            <span className="curio-logo__wordmark">CURIO</span>
            <span className="curio-logo__amp">&amp; CO.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="curio-nav" aria-label="Main navigation">
            <ul className="curio-nav__list">
              <li>
                <NavLink to="/shop" className={({ isActive }) => `curio-nav__link ${isActive ? 'curio-nav__link--active' : ''}`}>
                  Shop All
                </NavLink>
              </li>

              {/* Categories dropdown */}
              <li className="nav-dropdown-trigger" style={{ position: 'relative' }}>
                <button
                  className={`curio-nav__link curio-nav__link--dropdown ${activeDropdown === 'categories' ? 'curio-nav__link--active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                  aria-expanded={activeDropdown === 'categories'}
                  aria-haspopup="true"
                >
                  Categories
                  <ChevronDown
                    size={14}
                    className="curio-nav__chevron"
                    style={{ transform: activeDropdown === 'categories' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {activeDropdown === 'categories' && (
                  <div className="curio-megamenu">
                    <div className="curio-megamenu__grid">
                      {NAV_CATEGORIES.map(item => (
                        <Link key={item.href} to={item.href} className="curio-megamenu__item">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {/* Solutions dropdown */}
              <li className="nav-dropdown-trigger" style={{ position: 'relative' }}>
                <button
                  className={`curio-nav__link curio-nav__link--dropdown ${activeDropdown === 'solutions' ? 'curio-nav__link--active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                  aria-expanded={activeDropdown === 'solutions'}
                  aria-haspopup="true"
                >
                  Solutions
                  <ChevronDown
                    size={14}
                    className="curio-nav__chevron"
                    style={{ transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="curio-megamenu">
                    <div className="curio-megamenu__grid">
                      {NAV_SOLUTIONS.map(item => (
                        <Link key={item.href} to={item.href} className="curio-megamenu__item">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li>
                <NavLink to="/bulk-order" className={({ isActive }) => `curio-nav__link ${isActive ? 'curio-nav__link--active' : ''}`}>
                  Bulk Order
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={({ isActive }) => `curio-nav__link ${isActive ? 'curio-nav__link--active' : ''}`}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="curio-header__actions">
            {/* Search */}
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Palette Dial */}
            <PaletteDial />

            {/* Cart */}
            <Link to="/cart" className="btn btn-ghost btn-icon curio-cart-btn" aria-label="Shopping cart">
              <ShoppingBag size={18} />
              <span className="curio-cart-badge" aria-label="0 items in cart">0</span>
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="nav-dropdown-trigger curio-account-menu" style={{ position: 'relative' }}>
                <button
                  className="btn btn-surface btn-sm"
                  onClick={() => setActiveDropdown(activeDropdown === 'account' ? null : 'account')}
                  aria-expanded={activeDropdown === 'account'}
                >
                  <User size={14} />
                  {user?.name?.split(' ')[0] || 'Account'}
                  <ChevronDown size={12} style={{ transform: activeDropdown === 'account' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                {activeDropdown === 'account' && (
                  <div className="curio-megamenu" style={{ right: 0, left: 'auto', minWidth: '200px' }}>
                    <div className="curio-megamenu__header">
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{user?.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{user?.email}</p>
                    </div>
                    <div className="divider" style={{ margin: '0.5rem -0.5rem' }} />
                    <Link to="/account" className="curio-megamenu__item">My Profile</Link>
                    <Link to="/account/orders" className="curio-megamenu__item">Order History</Link>
                    <div className="divider" style={{ margin: '0.5rem -0.5rem' }} />
                    <button 
                      onClick={handleLogout}
                      className="curio-megamenu__item" 
                      style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-error)' }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm curio-login-btn">
                Sign In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="btn btn-ghost btn-icon curio-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Expansion */}
        <div className={`curio-search-bar ${searchOpen ? 'curio-search-bar--open' : ''}`}>
          <div className="container-curio">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                }
              }}
              className="curio-search-bar__form"
            >
              <Search size={16} className="curio-search-bar__icon" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, brands…"
                className="curio-search-bar__input"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-ghost btn-icon"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="curio-mobile-overlay overlay" onClick={() => setMobileOpen(false)} aria-hidden />
      )}
      <nav
        className={`curio-mobile-drawer ${mobileOpen ? 'curio-mobile-drawer--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="curio-mobile-drawer__header">
          <Link to="/" className="curio-logo">
            <span className="curio-logo__mark">✦</span>
            <span className="curio-logo__wordmark">CURIO</span>
          </Link>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="curio-mobile-drawer__body">
          <Link to="/shop" className="curio-mobile-drawer__link">Shop All</Link>
          <div className="curio-mobile-drawer__section">
            <p className="curio-mobile-drawer__section-title">Categories</p>
            {NAV_CATEGORIES.map(item => (
              <Link key={item.href} to={item.href} className="curio-mobile-drawer__sublink">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="curio-mobile-drawer__section">
            <p className="curio-mobile-drawer__section-title">Solutions</p>
            {NAV_SOLUTIONS.map(item => (
              <Link key={item.href} to={item.href} className="curio-mobile-drawer__sublink">
                {item.label}
              </Link>
            ))}
          </div>
          <Link to="/bulk-order" className="curio-mobile-drawer__link">Bulk Order</Link>
          <Link to="/about" className="curio-mobile-drawer__link">About</Link>

          <div className="curio-mobile-drawer__footer">
            {isAuthenticated ? (
              <>
                <div style={{ padding: '0 0.5rem 1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{user?.name}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{user?.email}</p>
                </div>
                <Link to="/account" className="btn btn-surface" style={{ width: '100%', marginBottom: '0.5rem' }}>
                  <Package size={15} />
                  My Orders
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', color: 'var(--color-error)' }}>
                  <LogOut size={15} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                <User size={15} />
                Sign In
              </Link>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Theme</span>
              <PaletteDial />
            </div>
          </div>
        </div>
      </nav>

      <style>{headerStyles}</style>
    </>
  )
}

const headerStyles = `
  .curio-header {
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--nav-height);
    background-color: var(--color-bg);
    border-bottom: 1px solid transparent;
    transition:
      background-color var(--transition-theme),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .curio-header--scrolled {
    border-bottom-color: var(--color-border);
    box-shadow: var(--shadow-sm);
  }

  .curio-header__inner {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  /* Logo */
  .curio-logo {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
    text-decoration: none;
    flex-shrink: 0;
  }

  .curio-logo__mark {
    font-size: 1rem;
    color: var(--color-accent);
    line-height: 1;
    transition: color var(--transition-theme);
  }

  .curio-logo__wordmark {
    font-family: var(--font-display);
    font-size: 1.375rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: var(--color-text-primary);
    transition: color var(--transition-theme);
  }

  .curio-logo__amp {
    font-family: var(--font-body);
    font-size: 0.625rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    padding-bottom: 2px;
    transition: color var(--transition-theme);
  }

  .curio-logo:hover .curio-logo__wordmark { color: var(--color-accent); }
  .curio-logo:hover .curio-logo__amp { color: var(--color-text-secondary); }

  /* Desktop nav */
  .curio-nav {
    flex: 1;
    display: none;
  }

  @media (min-width: 1024px) {
    .curio-nav { display: block; }
  }

  .curio-nav__list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .curio-nav__link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.4rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    background: transparent;
    border: none;
    cursor: pointer;
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast);
  }

  .curio-nav__link:hover,
  .curio-nav__link--active {
    color: var(--color-text-primary);
    background-color: var(--color-surface);
  }

  .curio-nav__chevron {
    transition: transform var(--transition-fast);
  }

  /* Mega menu */
  .curio-megamenu {
    position: absolute;
    top: calc(100% + 8px);
    left: -1rem;
    min-width: 240px;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    padding: 0.5rem;
    z-index: 200;
    animation: menu-enter 150ms ease forwards;
  }

  @keyframes menu-enter {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .curio-megamenu__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
  }

  .curio-megamenu__item {
    display: block;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast);
  }

  .curio-megamenu__item:hover {
    color: var(--color-text-primary);
    background-color: var(--color-surface-2);
  }

  /* Header actions */
  .curio-header__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
  }

  /* Cart button */
  .curio-cart-btn {
    position: relative;
  }

  .curio-cart-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 16px;
    height: 16px;
    background-color: var(--color-accent);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    pointer-events: none;
  }

  /* Account button — hide on small screens */
  /* Account menu additions */
  .curio-megamenu__header {
    padding: 0.5rem 0.875rem;
  }

  @media (max-width: 767px) {
    .curio-account-menu, .curio-login-btn { display: none; }
  }

  /* Mobile toggle — hide on desktop */
  .curio-mobile-toggle { display: none; }

  @media (max-width: 1023px) {
    .curio-mobile-toggle { display: inline-flex; }
  }

  /* Search bar */
  .curio-search-bar {
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .curio-search-bar--open {
    max-height: 72px;
  }

  .curio-search-bar__form {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 0;
  }

  .curio-search-bar__icon {
    color: var(--color-text-muted);
    flex-shrink: 0;
  }

  .curio-search-bar__input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.9375rem;
    color: var(--color-text-primary);
    caret-color: var(--color-accent);
  }

  .curio-search-bar__input::placeholder {
    color: var(--color-text-muted);
  }

  /* Mobile drawer */
  .curio-mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(360px, 90vw);
    background-color: var(--color-bg);
    border-left: 1px solid var(--color-border);
    z-index: 200;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform var(--transition-base);
    overflow-y: auto;
  }

  .curio-mobile-drawer--open {
    transform: translateX(0);
  }

  .curio-mobile-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    height: var(--nav-height);
    flex-shrink: 0;
  }

  .curio-mobile-drawer__body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .curio-mobile-drawer__link {
    display: block;
    padding: 0.75rem 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border-muted);
    transition: color var(--transition-fast);
  }

  .curio-mobile-drawer__link:hover { color: var(--color-accent); }

  .curio-mobile-drawer__section {
    margin-block: 0.5rem;
  }

  .curio-mobile-drawer__section-title {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    padding: 0.75rem 0.5rem 0.375rem;
  }

  .curio-mobile-drawer__sublink {
    display: block;
    padding: 0.5rem 0.75rem;
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast);
  }

  .curio-mobile-drawer__sublink:hover {
    color: var(--color-text-primary);
    background-color: var(--color-surface);
  }

  .curio-mobile-drawer__footer {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`
