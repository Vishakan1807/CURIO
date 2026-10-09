import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Gift, Loader2, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { PaletteDial } from '@/components/ui/PaletteDial'

type AuthMode = 'login' | 'signup'

export function AuthPage() {
  const { isAuthenticated, login, signup } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')

  // Already logged in
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const switchMode = (m: AuthMode) => {
    setMode(m)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email.trim(), password, undefined, company.trim() || undefined)
      } else {
        await signup(name.trim(), email.trim(), password, company.trim() || undefined)
      }
      navigate(from, { replace: true })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const BRAND_PERKS = [
    'Access 500+ curated gifting products',
    'Bulk pricing & corporate quotations',
    'Custom branding & logo printing',
    'Dedicated account manager',
    'Pan-India doorstep delivery',
  ]

  return (
    <div className="auth-page">
      {/* Left — Brand Panel */}
      <div className="auth-brand" aria-hidden="true">
        <div className="auth-brand__inner">
          {/* Logo */}
          <div className="auth-brand__logo">
            <span className="auth-brand__logo-mark">✦</span>
            <span className="auth-brand__logo-word">CURIO</span>
            <span className="auth-brand__logo-amp">&amp; CO.</span>
          </div>

          {/* Headline */}
          <div className="auth-brand__headline">
            <h1 className="auth-brand__h1">
              Gifting that<br />
              <em>speaks volumes.</em>
            </h1>
            <p className="auth-brand__sub">
              Premium corporate gifts, curated collections, and custom-branded merchandise — all in one place.
            </p>
          </div>

          {/* Perks */}
          <ul className="auth-brand__perks">
            {BRAND_PERKS.map(perk => (
              <li key={perk} className="auth-brand__perk">
                <Sparkles size={13} aria-hidden />
                {perk}
              </li>
            ))}
          </ul>

          {/* Decorative cards */}
          <div className="auth-brand__cards" aria-hidden="true">
            <div className="auth-brand__card auth-brand__card--1">
              <Gift size={18} />
              <span>Welcome Kit</span>
              <strong>₹2,499 / kit</strong>
            </div>
            <div className="auth-brand__card auth-brand__card--2">
              <Sparkles size={18} />
              <span>Festival Hamper</span>
              <strong>₹999+</strong>
            </div>
          </div>
        </div>

        {/* Theme switcher on brand panel */}
        <div className="auth-brand__theme">
          <span>Theme</span>
          <PaletteDial />
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-panel__inner">
          {/* Mobile logo */}
          <div className="auth-mobile-logo">
            <span className="auth-brand__logo-mark">✦</span>
            <span className="auth-brand__logo-word" style={{ fontSize: '1.25rem', letterSpacing: '0.1em' }}>CURIO</span>
          </div>

          {/* Mode tabs */}
          <div className="auth-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Create Account
            </button>
            <div
              className="auth-tabs__indicator"
              style={{ transform: mode === 'signup' ? 'translateX(100%)' : 'translateX(0)' }}
            />
          </div>

          {/* Heading */}
          <div className="auth-form-header">
            <h2 className="auth-form-title">
              {mode === 'login' ? 'Welcome back' : 'Start gifting smarter'}
            </h2>
            <p className="auth-form-subtitle">
              {mode === 'login'
                ? 'Sign in to access your account and orders.'
                : 'Join 1,200+ companies gifting with Curio.'}
            </p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-name">Full Name *</label>
                <input
                  id="auth-name"
                  type="text"
                  className="auth-input"
                  placeholder="Arjun Mehta"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                  disabled={loading}
                />
              </div>
            )}

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">Work Email *</label>
              <input
                id="auth-email"
                type="email"
                className="auth-input"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-company">Company Name</label>
              <input
                id="auth-company"
                type="text"
                className="auth-input"
                placeholder="Acme Technologies Pvt. Ltd."
                value={company}
                onChange={e => setCompany(e.target.value)}
                autoComplete="organization"
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-password">Password *</label>
              <div className="auth-input-wrap">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-input--password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? <><Loader2 size={16} className="auth-spinner" /> {mode === 'login' ? 'Signing in…' : 'Creating account…'}</>
                : mode === 'login' ? 'Sign In' : 'Create Account'
              }
            </button>

            {/* Forgot password (login only) */}
            {mode === 'login' && (
              <p className="auth-forgot">
                <a href="#" onClick={e => e.preventDefault()}>Forgot password?</a>
                &nbsp;(Coming soon)
              </p>
            )}
          </form>

          {/* Switch mode link */}
          <p className="auth-switch">
            {mode === 'login'
              ? <>Don't have an account? <button className="auth-switch-btn" onClick={() => switchMode('signup')}>Create one free</button></>
              : <>Already have an account? <button className="auth-switch-btn" onClick={() => switchMode('login')}>Sign in</button></>
            }
          </p>

          <p className="auth-legal">
            By continuing you agree to Curio's{' '}
            <a href="/terms" target="_blank">Terms of Service</a> and{' '}
            <a href="/privacy" target="_blank">Privacy Policy</a>.
          </p>
        </div>
      </div>

      <style>{authStyles}</style>
    </div>
  )
}

const authStyles = `
  .auth-page {
    min-height: 100dvh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--color-bg);
  }

  @media (max-width: 900px) {
    .auth-page {
      grid-template-columns: 1fr;
    }
  }

  /* ── Brand Panel ── */
  .auth-brand {
    background-color: var(--color-accent);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem;
    min-height: 100dvh;
  }

  @media (max-width: 900px) {
    .auth-brand { display: none; }
  }

  /* Decorative background shape */
  .auth-brand::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -20%;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    pointer-events: none;
  }

  .auth-brand::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgba(0,0,0,0.08);
    pointer-events: none;
  }

  .auth-brand__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    flex: 1;
  }

  /* Logo in brand panel */
  .auth-brand__logo {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
  }

  .auth-brand__logo-mark {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.7);
  }

  .auth-brand__logo-word {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: #fff;
  }

  .auth-brand__logo-amp {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  /* Headline */
  .auth-brand__h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 0.875rem;
  }

  .auth-brand__h1 em {
    font-style: italic;
    color: rgba(255,255,255,0.75);
  }

  .auth-brand__sub {
    font-size: 0.9375rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.65;
  }

  /* Perks list */
  .auth-brand__perks {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .auth-brand__perk {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: rgba(255,255,255,0.85);
    font-weight: 500;
  }

  .auth-brand__perk svg {
    color: rgba(255,255,255,0.55);
    flex-shrink: 0;
  }

  /* Decorative product cards */
  .auth-brand__cards {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .auth-brand__card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-lg);
    padding: 1rem 1.25rem;
    backdrop-filter: blur(8px);
    color: #fff;
  }

  .auth-brand__card svg {
    opacity: 0.7;
  }

  .auth-brand__card span {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.65);
  }

  .auth-brand__card strong {
    font-size: 1rem;
    font-weight: 700;
  }

  /* Theme switcher in brand panel */
  .auth-brand__theme {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .auth-brand__theme span {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* Override palette dial colors on brand panel for contrast */
  .auth-brand .palette-dial__gems {
    background-color: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
  }

  .auth-brand .palette-dial__tooltip {
    background-color: var(--color-surface);
    border-color: var(--color-border);
  }

  /* ── Form Panel ── */
  .auth-form-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1.5rem;
    min-height: 100dvh;
    background-color: var(--color-bg);
  }

  .auth-form-panel__inner {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Mobile logo */
  .auth-mobile-logo {
    display: none;
    align-items: baseline;
    gap: 0.3rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 900px) {
    .auth-mobile-logo { display: flex; }
  }

  /* Mode tabs */
  .auth-tabs {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 4px;
    gap: 0;
  }

  .auth-tab {
    position: relative;
    z-index: 1;
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: color var(--transition-fast);
    color: var(--color-text-muted);
  }

  .auth-tab--active {
    color: var(--color-text-primary);
  }

  .auth-tabs__indicator {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-base);
    pointer-events: none;
  }

  /* Form header */
  .auth-form-title {
    font-family: var(--font-display);
    font-size: 1.875rem;
    font-weight: 400;
    color: var(--color-text-primary);
    line-height: 1.2;
    margin-bottom: 0.375rem;
  }

  .auth-form-subtitle {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
  }

  /* Fields */
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .auth-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    letter-spacing: 0.01em;
  }

  .auth-input {
    width: 100%;
    padding: 0.65rem 0.875rem;
    background-color: var(--color-surface);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: 0.9375rem;
    font-family: var(--font-body);
    color: var(--color-text-primary);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
    outline: none;
  }

  .auth-input::placeholder { color: var(--color-text-muted); }

  .auth-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-muted);
  }

  .auth-input:disabled { opacity: 0.6; cursor: not-allowed; }

  .auth-input-wrap {
    position: relative;
  }

  .auth-input--password {
    padding-right: 2.75rem;
  }

  .auth-input-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color var(--transition-fast);
  }

  .auth-input-toggle:hover { color: var(--color-text-primary); }

  /* Error */
  .auth-error {
    padding: 0.625rem 0.875rem;
    background-color: var(--color-error-muted);
    border: 1px solid var(--color-error);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--color-error);
    font-weight: 500;
  }

  /* Submit button */
  .auth-submit {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.9375rem;
    border-radius: var(--radius-lg);
    margin-top: 0.25rem;
  }

  /* Spinner animation */
  .auth-spinner {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .auth-spinner { animation: none; }
  }

  .auth-forgot {
    text-align: center;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .auth-forgot a {
    color: var(--color-accent);
    text-decoration: none;
  }

  /* Switch mode */
  .auth-switch {
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    padding-top: 0.5rem;
    border-top: 1px solid var(--color-border-muted);
  }

  .auth-switch-btn {
    background: none;
    border: none;
    color: var(--color-accent);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .auth-switch-btn:hover { color: var(--color-accent-hover); }

  /* Legal */
  .auth-legal {
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .auth-legal a {
    color: var(--color-text-secondary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`
