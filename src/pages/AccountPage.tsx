import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { User, Building2, Mail, Package, LogOut, ChevronRight, ShoppingBag, ClipboardList, Settings, Star, CheckCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useAdminStore } from '@/stores/adminStore'

const STATUS_COLORS: Record<string, string> = {
  Processing: '#f59e0b',
  Shipped: '#0ea5e9',
  Delivered: '#22c55e',
  Cancelled: '#ef4444',
}

type ActiveTab = 'overview' | 'orders' | 'settings'

export function AccountPage() {
  const { user, logout } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const allOrders = useAdminStore(s => s.orders)
  const navigate = useNavigate()
  const location = useLocation()
  const orderSuccess = (location.state as { orderSuccess?: string })?.orderSuccess
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')

  // Filter orders by active user email, or fallback to all active customer orders
  const customerOrders = allOrders.filter(
    o => !user?.email || o.customerEmail.toLowerCase() === user.email.toLowerCase() || user.role === 'admin'
  )
  const orders = customerOrders.length > 0 ? customerOrders : allOrders

  const totalSpent = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'


  return (
    <div className="account-page">
      <div className="container-curio">

        {/* Profile header */}
        <div className="account-hero">
          <div className="account-avatar">{initials}</div>
          <div className="account-hero__info">
            <h1 className="account-hero__name">{user?.name ?? 'Guest'}</h1>
            <p className="account-hero__email">
              <Mail size={14} /> {user?.email}
            </p>
            {user?.company && (
              <p className="account-hero__company">
                <Building2 size={14} /> {user.company}
              </p>
            )}
          </div>
          <button className="btn btn-ghost account-logout" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="account-tabs" role="tablist">
          {([
            { key: 'overview', label: 'Overview', icon: <User size={16} /> },
            { key: 'orders',   label: 'Orders',   icon: <Package size={16} /> },
            { key: 'settings', label: 'Settings',  icon: <Settings size={16} /> },
          ] as { key: ActiveTab; label: string; icon: React.ReactNode }[]).map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`account-tab ${activeTab === tab.key ? 'account-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Order success notification */}
        {orderSuccess && (
          <div style={{
            background: '#22c55e18',
            border: '1.5px solid #22c55e',
            color: '#15803d',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <CheckCircle size={22} color="#22c55e" />
            <div>
              <p style={{ fontWeight: 700, margin: 0 }}>Order Confirmed & Placed!</p>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>Reference <strong>{orderSuccess}</strong> has been created. Our fulfillment team has received your order and is processing dispatch.</p>
            </div>
          </div>
        )}

        {/* Tab content */}
        <div className="account-content">

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div className="account-overview">
              <div className="account-stats">
                <div className="account-stat-card">
                  <ShoppingBag size={24} className="account-stat-card__icon" />
                  <div>
                    <p className="account-stat-card__num">{orders.length}</p>
                    <p className="account-stat-card__label">Total Orders</p>
                  </div>
                </div>
                <div className="account-stat-card">
                  <Package size={24} className="account-stat-card__icon" />
                  <div>
                    <p className="account-stat-card__num">{getTotalItems()}</p>
                    <p className="account-stat-card__label">Items in Cart</p>
                  </div>
                </div>
                <div className="account-stat-card">
                  <Star size={24} className="account-stat-card__icon" />
                  <div>
                    <p className="account-stat-card__num">Gold</p>
                    <p className="account-stat-card__label">Account Tier</p>
                  </div>
                </div>
                <div className="account-stat-card">
                  <ClipboardList size={24} className="account-stat-card__icon" />
                  <div>
                    <p className="account-stat-card__num">₹{(totalSpent / 1000).toFixed(0)}K</p>
                    <p className="account-stat-card__label">Lifetime Value</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="account-card">
                <div className="account-card__header">
                  <h2>Recent Orders</h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('orders')}>View all</button>
                </div>
                <div className="order-list">
                  {orders.slice(0, 3).map(order => {
                    const statusColor = STATUS_COLORS[order.status] ?? '#6B7280'
                    return (
                      <div key={order.id} className="order-row">
                        <div className="order-row__info">
                          <p className="order-row__id">{order.orderNumber}</p>
                          <p className="order-row__items">
                            {order.items.map(i => `${i.name} × ${i.quantity}`).join(', ')}
                          </p>
                          <p className="order-row__date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div className="order-row__right">
                          <span className="order-status" style={{ background: `${statusColor}22`, color: statusColor, padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                            {order.status}
                          </span>
                          <p className="order-row__total">₹{order.total.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick links */}
              <div className="account-quick-links">
                <Link to="/shop" className="quick-link-card">
                  <ShoppingBag size={20} className="quick-link-card__icon" />
                  <span>Browse Catalogue</span>
                  <ChevronRight size={16} className="quick-link-card__arrow" />
                </Link>
                <Link to="/bulk-order" className="quick-link-card">
                  <ClipboardList size={20} className="quick-link-card__icon" />
                  <span>Raise a Quote</span>
                  <ChevronRight size={16} className="quick-link-card__arrow" />
                </Link>
                <Link to="/cart" className="quick-link-card">
                  <Package size={20} className="quick-link-card__icon" />
                  <span>View Cart</span>
                  <ChevronRight size={16} className="quick-link-card__arrow" />
                </Link>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === 'orders' && (
            <div className="account-card">
              <div className="account-card__header">
                <h2>Order History</h2>
              </div>
              {orders.length === 0 ? (
                <div className="orders-empty">
                  <ShoppingBag size={48} />
                  <p>No orders yet. <Link to="/shop">Start shopping</Link></p>
                </div>
              ) : (
                <div className="order-list">
                  {orders.map(order => {
                    const statusColor = STATUS_COLORS[order.status] ?? '#6B7280'
                    return (
                      <div key={order.id} className="order-row order-row--detailed">
                        <div className="order-row__info">
                          <p className="order-row__id">{order.orderNumber}</p>
                          <ul className="order-row__item-list">
                            {order.items.map(item => (
                              <li key={item.productId || item.name}>
                                {item.name} ({item.brand}) × {item.quantity} units {item.variantColor ? `· ${item.variantColor}` : ''}
                              </li>
                            ))}
                          </ul>
                          <p className="order-row__date" style={{ marginTop: '0.375rem' }}>
                            Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.paymentMethod}
                          </p>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                            Shipping to: {order.shippingAddress}
                          </p>
                        </div>
                        <div className="order-row__right">
                          <span className="order-status" style={{ background: `${statusColor}22`, color: statusColor, padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 600 }}>
                            {order.status}
                          </span>
                          <p className="order-row__total" style={{ marginTop: '0.5rem' }}>₹{order.total.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === 'settings' && (
            <div className="account-card">
              <div className="account-card__header">
                <h2>Profile Settings</h2>
              </div>
              <div className="settings-form">
                <div className="settings-field">
                  <label className="settings-label">Full Name</label>
                  <input type="text" className="form-input" defaultValue={user?.name ?? ''} readOnly />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Email Address</label>
                  <input type="email" className="form-input" defaultValue={user?.email ?? ''} readOnly />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Company</label>
                  <input type="text" className="form-input" defaultValue={user?.company ?? ''} placeholder="Your company name" readOnly />
                </div>
                <div className="settings-notice">
                  <p>Profile editing will be available in a future update. Contact <a href="mailto:support@curiogifts.in">support@curiogifts.in</a> for changes.</p>
                </div>
                <button className="btn btn-ghost" style={{ color: 'var(--color-error, #ef4444)' }} onClick={handleLogout}>
                  <LogOut size={16} /> Sign out of this device
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      <style>{accountStyles}</style>
    </div>
  )
}

const accountStyles = `
  .account-page {
    padding-block: 2rem 5rem;
  }

  /* Hero */
  .account-hero {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .account-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--color-accent-contrast, #fff);
    font-family: var(--font-display);
    font-size: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .account-hero__info {
    flex: 1;
  }

  .account-hero__name {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: 0.375rem;
  }

  .account-hero__email,
  .account-hero__company {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
  }

  .account-logout {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-left: auto;
  }

  /* Tabs */
  .account-tabs {
    display: flex;
    gap: 0.375rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 2rem;
    overflow-x: auto;
  }

  .account-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--transition-fast);
  }
  .account-tab:hover { color: var(--color-text-primary); }
  .account-tab--active {
    color: var(--color-accent-text);
    border-bottom-color: var(--color-accent);
    font-weight: 600;
  }

  /* Stats */
  .account-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    .account-stats { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 420px) {
    .account-stats { grid-template-columns: 1fr; }
  }

  .account-stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .account-stat-card__icon {
    color: var(--color-accent-text);
    flex-shrink: 0;
  }

  .account-stat-card__num {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .account-stat-card__label {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  /* Cards */
  .account-overview {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .account-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .account-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .account-card__header h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
  }

  /* Order list */
  .order-list {
    display: flex;
    flex-direction: column;
  }

  .order-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem 2rem;
    border-bottom: 1px solid var(--color-border-muted);
    transition: background var(--transition-fast);
  }
  .order-row:last-child { border-bottom: none; }
  .order-row:hover { background: var(--color-bg); }

  .order-row__id {
    font-weight: 700;
    font-size: 0.9375rem;
    font-family: monospace;
    margin-bottom: 0.375rem;
  }

  .order-row__items,
  .order-row__item-list {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    list-style: none;
    line-height: 1.6;
  }

  .order-row__date {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    margin-top: 0.375rem;
  }

  .order-row__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .order-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    background: color-mix(in srgb, var(--status-color) 15%, transparent);
    color: var(--status-color);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .order-row__total {
    font-size: 1rem;
    font-weight: 700;
  }

  /* Quick links */
  .account-quick-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 640px) {
    .account-quick-links { grid-template-columns: 1fr; }
  }

  .quick-link-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: var(--color-text-primary);
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all var(--transition-fast);
  }
  .quick-link-card:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
  }

  .quick-link-card__icon { color: var(--color-accent-text); flex-shrink: 0; }
  .quick-link-card__arrow { color: var(--color-text-muted); margin-left: auto; }

  /* Settings */
  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2rem;
  }

  .settings-field { display: flex; flex-direction: column; gap: 0.375rem; }

  .settings-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .settings-notice {
    padding: 1rem 1.25rem;
    background: color-mix(in srgb, var(--color-gold) 10%, var(--color-surface));
    border: 1px solid color-mix(in srgb, var(--color-gold) 30%, transparent);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
  .settings-notice a { color: var(--color-accent-text); }

  .orders-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    color: var(--color-text-muted);
    text-align: center;
  }

  /* Reuse form-input from BulkOrder */
  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: 0.9375rem;
    font-family: var(--font-body);
    box-sizing: border-box;
  }
`
