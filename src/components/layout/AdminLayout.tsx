import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const ADMIN_NAV = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/admin/products', label: 'Products', icon: <Package size={18} />, end: false },
  { to: '/admin/orders', label: 'Orders & Quotes', icon: <ClipboardList size={18} />, end: false },
  { to: '/admin/customers', label: 'Customers', icon: <Users size={18} />, end: false },
]

export function AdminLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <ShieldCheck size={20} className="admin-sidebar__brand-icon" />
          <div>
            <p className="admin-sidebar__brand-name">Admin Panel</p>
            <p className="admin-sidebar__brand-sub">Curio & Co.</p>
          </div>
        </div>

        <nav className="admin-nav">
          {ADMIN_NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
              }
            >
              <span className="admin-nav__icon">{item.icon}</span>
              <span className="admin-nav__label">{item.label}</span>
              <ChevronRight size={14} className="admin-nav__arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {user?.name?.slice(0, 2).toUpperCase() ?? 'AD'}
            </div>
            <div className="admin-user-text">
              <p className="admin-user-name">{user?.name}</p>
              <p className="admin-user-role">Administrator</p>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout} title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>

      <style>{adminLayoutStyles}</style>
    </div>
  )
}

const adminLayoutStyles = `
  .admin-shell {
    display: grid;
    grid-template-columns: 260px 1fr;
    min-height: 100vh;
    background: var(--color-bg);
  }

  @media (max-width: 900px) {
    .admin-shell { grid-template-columns: 1fr; }
    .admin-sidebar { display: none; }
  }

  /* Sidebar */
  .admin-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .admin-sidebar__brand {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1.5rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  .admin-sidebar__brand-icon {
    color: var(--color-accent-text);
    flex-shrink: 0;
  }

  .admin-sidebar__brand-name {
    font-weight: 700;
    font-size: 0.9375rem;
    line-height: 1.2;
  }

  .admin-sidebar__brand-sub {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .admin-nav {
    flex: 1;
    padding: 1rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .admin-nav__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);
  }

  .admin-nav__item:hover {
    background: color-mix(in srgb, var(--color-accent) 8%, transparent);
    color: var(--color-text-primary);
  }

  .admin-nav__item--active {
    background: color-mix(in srgb, var(--color-accent) 14%, transparent);
    color: var(--color-accent-text);
    font-weight: 600;
  }

  .admin-nav__icon { flex-shrink: 0; }

  .admin-nav__arrow {
    margin-left: auto;
    color: var(--color-text-muted);
    opacity: 0;
    transition: opacity var(--transition-fast);
  }

  .admin-nav__item:hover .admin-nav__arrow,
  .admin-nav__item--active .admin-nav__arrow { opacity: 1; }

  .admin-sidebar__footer {
    padding: 1.25rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .admin-user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  .admin-user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .admin-user-text { min-width: 0; }

  .admin-user-name {
    font-size: 0.875rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-user-role {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .admin-logout-btn {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 0.375rem;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
    transition: color var(--transition-fast), background var(--transition-fast);
  }

  .admin-logout-btn:hover {
    color: var(--color-error, #ef4444);
    background: color-mix(in srgb, var(--color-error, #ef4444) 10%, transparent);
  }

  /* Main */
  .admin-main {
    min-height: 100vh;
    overflow-x: hidden;
  }
`
