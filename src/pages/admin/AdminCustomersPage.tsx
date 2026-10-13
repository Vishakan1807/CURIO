import { Mail, Building2, Phone } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'

const TIER_COLORS: Record<string, string> = {
  Silver: '#94A3B8',
  Gold: '#F59E0B',
  Platinum: '#8B5CF6',
}

export function AdminCustomersPage() {
  const { customers, orders } = useAdminStore()

  // Calculate dynamic spend and order count for each customer from real orders
  const customerStats = customers.map(c => {
    const cOrders = orders.filter(
      o => o.customerEmail.toLowerCase() === c.email.toLowerCase() && o.status !== 'Cancelled'
    )
    const spent = cOrders.reduce((sum, o) => sum + o.total, 0)
    const orderCount = cOrders.length

    let tier: 'Silver' | 'Gold' | 'Platinum' = 'Silver'
    if (spent >= 300000 || orderCount >= 3) tier = 'Platinum'
    else if (spent >= 100000 || orderCount >= 1) tier = 'Gold'

    return {
      ...c,
      orderCount,
      spent,
      tier,
    }
  })

  const totalSpentAll = customerStats.reduce((sum, c) => sum + c.spent, 0)
  const avgOrderValue = orders.length > 0 ? Math.round(totalSpentAll / orders.length) : 0

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Corporate Customers</h1>
          <p className="admin-page-sub">{customers.length} registered corporate client organizations</p>
        </div>
      </div>

      <div className="admin-kpi-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { label: 'Active Corporate Clients', value: customers.length.toString(), color: '#6C63FF' },
          { label: 'Avg Order Value', value: `₹${avgOrderValue.toLocaleString('en-IN')}`, color: '#22C55E' },
          { label: 'Total Client Spend', value: `₹${totalSpentAll.toLocaleString('en-IN')}`, color: '#F59E0B' },
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
                <th>Contact Details</th>
                <th>Orders Placed</th>
                <th>Total Spent</th>
                <th>Tier</th>
              </tr>
            </thead>
            <tbody>
              {customerStats.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--color-text-muted)' }}>
                    No customer records found.
                  </td>
                </tr>
              ) : customerStats.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="admin-user-avatar">
                        {c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
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
                  <td style={{ fontWeight: 700 }}>{c.orderCount} orders</td>
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
          font-size: 0.8125rem;
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
