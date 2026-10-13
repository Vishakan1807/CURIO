import { Mail, Building2, Phone } from 'lucide-react'

const CUSTOMERS = [
  { id: 'C-001', name: 'Riya Singh', email: 'riya@razorpay.com', company: 'Razorpay', phone: '9876543210', orders: 4, spent: 412500, tier: 'Gold' },
  { id: 'C-002', name: 'Arjun Mehra', email: 'arjun@swiggy.in', company: 'Swiggy', phone: '9123456789', orders: 7, spent: 892300, tier: 'Platinum' },
  { id: 'C-003', name: 'Priya Nair', email: 'priya@cred.club', company: 'CRED', phone: '9988776655', orders: 2, spent: 89900, tier: 'Silver' },
  { id: 'C-004', name: 'Siddharth K', email: 'sid@zepto.com', company: 'Zepto', phone: '9012345678', orders: 3, spent: 198500, tier: 'Gold' },
  { id: 'C-005', name: 'Meera Joshi', email: 'meera@freshworks.com', company: 'Freshworks', phone: '9765432109', orders: 5, spent: 345000, tier: 'Gold' },
  { id: 'C-006', name: 'Vikram Patel', email: 'vikram@hdfcbank.com', company: 'HDFC Bank', phone: '9234567890', orders: 12, spent: 1240000, tier: 'Platinum' },
]

const TIER_COLORS: Record<string, string> = {
  Silver: '#94A3B8',
  Gold: '#F59E0B',
  Platinum: '#8B5CF6',
}

export function AdminCustomersPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Customers</h1>
          <p className="admin-page-sub">{CUSTOMERS.length} registered corporate accounts</p>
        </div>
      </div>

      <div className="admin-kpi-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { label: 'Total Customers', value: '512', color: '#6C63FF' },
          { label: 'Avg Order Value', value: '₹58,400', color: '#22C55E' },
          { label: 'Repeat Rate', value: '74%', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="admin-kpi-card">
            <p className="admin-kpi-card__value" style={{ color: s.color }}>{s.value}</p>
            <p className="admin-kpi-card__label">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Tier</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="admin-user-avatar" style={{ width: 36, height: 36, fontSize: '0.875rem' }}>
                        {c.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="admin-table__name">{c.name}</p>
                        <p className="admin-table__sub">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                      <Building2 size={14} /> {c.company}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                        <Mail size={12} /> {c.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                        <Phone size={12} /> {c.phone}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{c.orders}</td>
                  <td className="admin-table__amount">₹{c.spent.toLocaleString('en-IN')}</td>
                  <td>
                    <span
                      className="admin-status-pill"
                      style={{ background: `${TIER_COLORS[c.tier]}22`, color: TIER_COLORS[c.tier] }}
                    >
                      ★ {c.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  )
}
