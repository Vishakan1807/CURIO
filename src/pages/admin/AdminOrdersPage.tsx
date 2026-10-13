import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

type OrderStatus = 'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
type TabType = 'orders' | 'quotes'

const ALL_ORDERS = [
  { id: 'ORD-2410-112', customer: 'Riya Singh', company: 'Razorpay', items: 'Executive Welcome Kit × 25', total: 124750, status: 'Processing' as const, date: '2024-10-08', type: 'orders' },
  { id: 'ORD-2410-111', customer: 'Arjun Mehra', company: 'Swiggy', items: 'Insulated Flask × 100', total: 129900, status: 'Shipped' as const, date: '2024-10-07', type: 'orders' },
  { id: 'ORD-2410-110', customer: 'Priya Nair', company: 'CRED', items: 'Premium Notebook × 50', total: 44950, status: 'Delivered' as const, date: '2024-10-05', type: 'orders' },
  { id: 'ORD-2410-109', customer: 'Siddharth K', company: 'Zepto', items: 'Corporate Fleece Jacket × 30', total: 65970, status: 'Delivered' as const, date: '2024-10-03', type: 'orders' },
  { id: 'ORD-2410-108', customer: 'Meera Joshi', company: 'Freshworks', items: 'Canvas Backpack × 20', total: 37980, status: 'Cancelled' as const, date: '2024-10-01', type: 'orders' },
  { id: 'ORD-2409-099', customer: 'Vikram Patel', company: 'HDFC Bank', items: 'Wireless Power Bank × 75', total: 187425, status: 'Delivered' as const, date: '2024-09-28', type: 'orders' },
  { id: 'ORD-2409-088', customer: 'Kavya Rao', company: 'Infosys', items: 'Eco Bamboo Tumbler × 200', total: 189800, status: 'Delivered' as const, date: '2024-09-20', type: 'orders' },
]

const ALL_QUOTES = [
  { id: 'QT-924501', customer: 'Neha Gupta', company: 'Deloitte', items: 'Onboarding Kits for 150 hires', total: null, status: 'Processing' as const, date: '2024-10-09', type: 'quotes' },
  { id: 'QT-924500', customer: 'Rohan Das', company: 'Goldman Sachs', items: 'Executive kits × 50 + branding', total: null, status: 'Processing' as const, date: '2024-10-08', type: 'quotes' },
  { id: 'QT-924499', customer: 'Ananya Sen', company: 'EY', items: 'Festive Diwali hampers × 300', total: 450000, status: 'Shipped' as const, date: '2024-10-05', type: 'quotes' },
  { id: 'QT-924498', customer: 'Karan Mehta', company: 'Accenture', items: 'Laptop bags + pen sets × 200', total: 539800, status: 'Delivered' as const, date: '2024-09-30', type: 'quotes' },
  { id: 'QT-924497', customer: 'Divya Pillai', company: 'Wipro', items: 'Wellness kits × 500', total: 699500, status: 'Delivered' as const, date: '2024-09-22', type: 'quotes' },
]

const STATUS_COLORS: Record<string, string> = {
  Processing: '#F59E0B',
  Shipped: '#0EA5E9',
  Delivered: '#22C55E',
  Cancelled: '#EF4444',
}

const STATUS_OPTIONS: OrderStatus[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export function AdminOrdersPage() {
  const [tab, setTab] = useState<TabType>('orders')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('All')
  const [statusMap, setStatusMap] = useState<Record<string, string>>({})

  const data = tab === 'orders' ? ALL_ORDERS : ALL_QUOTES

  const filtered = data.filter(o => {
    const currentStatus = statusMap[o.id] ?? o.status
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.company.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || currentStatus === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, newStatus: string) => {
    setStatusMap(prev => ({ ...prev, [id]: newStatus }))
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders & Quotes</h1>
          <p className="admin-page-sub">Manage all customer orders and corporate quote requests</p>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="admin-tab-bar">
        <button
          className={`admin-tab ${tab === 'orders' ? 'admin-tab--active' : ''}`}
          onClick={() => setTab('orders')}
        >
          Customer Orders
          <span className="admin-tab-count">{ALL_ORDERS.length}</span>
        </button>
        <button
          className={`admin-tab ${tab === 'quotes' ? 'admin-tab--active' : ''}`}
          onClick={() => setTab('quotes')}
        >
          Quote Requests
          <span className="admin-tab-count">{ALL_QUOTES.length}</span>
        </button>
      </div>

      <div className="admin-card">
        {/* Filters */}
        <div className="admin-filters-bar">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="search"
              className="admin-search-input"
              placeholder="Search by ID, name, or company…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Filter size={14} style={{ color: 'var(--color-text-muted)' }} />
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                className={`admin-cat-pill ${statusFilter === s ? 'admin-cat-pill--active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    No results found.
                  </td>
                </tr>
              ) : filtered.map(order => {
                const currentStatus = statusMap[order.id] ?? order.status
                const color = STATUS_COLORS[currentStatus] ?? '#6B7280'
                return (
                  <tr key={order.id}>
                    <td className="admin-table__id">{order.id}</td>
                    <td>
                      <p className="admin-table__name">{order.customer}</p>
                      <p className="admin-table__sub">{order.company}</p>
                    </td>
                    <td className="admin-table__product" style={{ maxWidth: 200 }}>
                      {order.items}
                    </td>
                    <td className="admin-table__amount">
                      {order.total ? `₹${order.total.toLocaleString('en-IN')}` : (
                        <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>Pending</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                      {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <span
                        className="admin-status-pill"
                        style={{ background: `${color}22`, color }}
                      >
                        {currentStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        className="admin-status-select"
                        value={currentStatus}
                        onChange={e => updateStatus(order.id, e.target.value)}
                      >
                        {Object.keys(STATUS_COLORS).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary footer */}
        <div className="admin-table-footer">
          <span>Showing {filtered.length} of {data.length} records</span>
        </div>
      </div>

      <style>{ordersStyles}</style>
    </div>
  )
}

const ordersStyles = `
  .admin-tab-bar {
    display: flex;
    gap: 0;
    border-bottom: 2px solid var(--color-border);
    margin-bottom: 0;
  }

  .admin-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .admin-tab:hover { color: var(--color-text-primary); }

  .admin-tab--active {
    color: var(--color-accent-text);
    border-bottom-color: var(--color-accent);
    font-weight: 600;
  }

  .admin-tab-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-text-muted);
  }

  .admin-tab--active .admin-tab-count {
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent-text);
    border-color: transparent;
  }

  .admin-status-select {
    padding: 0.3rem 0.625rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: 0.8125rem;
    font-family: var(--font-body);
    cursor: pointer;
  }

  .admin-status-select:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .admin-table-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  /* Reuse from products page */
  .admin-filters-bar {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .admin-search-wrap { position: relative; max-width: 360px; }

  .admin-search-icon {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted);
    pointer-events: none;
  }

  .admin-search-input {
    width: 100%;
    padding: 0.65rem 1rem 0.65rem 2.5rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: 0.9rem;
    font-family: var(--font-body);
    box-sizing: border-box;
  }
  .admin-search-input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
  }

  .admin-cat-pill {
    padding: 0.35rem 0.875rem;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-full);
    background: none;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }
  .admin-cat-pill:hover { border-color: var(--color-accent); color: var(--color-text-primary); }
  .admin-cat-pill--active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }
`
