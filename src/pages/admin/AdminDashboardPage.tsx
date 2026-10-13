import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Package,
  ClipboardList,
  Users,
  IndianRupee,
  ArrowUpRight,
  ArrowRight,
  Circle,
} from 'lucide-react'
import { PRODUCTS } from '@/data/products'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const KPI_CARDS = [
  {
    label: 'Revenue (MTD)',
    value: '₹12,40,500',
    delta: '+18.4%',
    positive: true,
    icon: <IndianRupee size={22} />,
    color: '#6C63FF',
  },
  {
    label: 'Orders This Month',
    value: '347',
    delta: '+23 vs last month',
    positive: true,
    icon: <Package size={22} />,
    color: '#22C55E',
  },
  {
    label: 'Quote Requests',
    value: '89',
    delta: '+12 pending review',
    positive: true,
    icon: <ClipboardList size={22} />,
    color: '#F59E0B',
  },
  {
    label: 'Active Customers',
    value: '512',
    delta: '+34 this month',
    positive: true,
    icon: <Users size={22} />,
    color: '#0EA5E9',
  },
]

const RECENT_ORDERS = [
  { id: 'ORD-2410-112', customer: 'Riya Singh', company: 'Razorpay', product: 'Executive Welcome Kit × 25', total: 124750, status: 'Processing', statusColor: '#F59E0B' },
  { id: 'ORD-2410-111', customer: 'Arjun Mehra', company: 'Swiggy', product: 'Insulated Flask × 100', total: 129900, status: 'Shipped', statusColor: '#0EA5E9' },
  { id: 'ORD-2410-110', customer: 'Priya Nair', company: 'CRED', product: 'Premium Notebook × 50', total: 44950, status: 'Delivered', statusColor: '#22C55E' },
  { id: 'ORD-2410-109', customer: 'Siddharth K', company: 'Zepto', product: 'Corporate Fleece Jacket × 30', total: 65970, status: 'Delivered', statusColor: '#22C55E' },
  { id: 'ORD-2410-108', customer: 'Meera Joshi', company: 'Freshworks', product: 'Canvas Backpack × 20', total: 37980, status: 'Cancelled', statusColor: '#EF4444' },
]

// Revenue trend data — 6 months (relative %)
const REVENUE_BARS = [
  { month: 'May', pct: 48 },
  { month: 'Jun', pct: 55 },
  { month: 'Jul', pct: 42 },
  { month: 'Aug', pct: 70 },
  { month: 'Sep', pct: 83 },
  { month: 'Oct', pct: 100 },
]

const TOP_PRODUCTS = PRODUCTS.slice(0, 4).map((p, i) => ({
  ...p,
  sold: [312, 245, 198, 167][i],
  revenue: [p.price * 312, p.price * 245, p.price * 198, p.price * 167][i],
}))

export function AdminDashboardPage() {
  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Welcome back. Here's what's happening at Curio today.</p>
        </div>
        <div className="admin-page-header__actions">
          <Link to="/admin/orders" className="btn btn-surface btn-sm">
            View All Orders <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        {KPI_CARDS.map(card => (
          <div key={card.label} className="admin-kpi-card">
            <div className="admin-kpi-card__top">
              <div className="admin-kpi-card__icon" style={{ background: `${card.color}22`, color: card.color }}>
                {card.icon}
              </div>
              <ArrowUpRight size={16} className="admin-kpi-card__trend-icon" style={{ color: card.positive ? '#22C55E' : '#EF4444' }} />
            </div>
            <p className="admin-kpi-card__value">{card.value}</p>
            <p className="admin-kpi-card__label">{card.label}</p>
            <p className="admin-kpi-card__delta" style={{ color: card.positive ? '#22C55E' : '#EF4444' }}>
              {card.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="admin-middle-row">
        {/* Revenue Chart */}
        <div className="admin-card admin-chart-card">
          <div className="admin-card__header">
            <h2 className="admin-card__title">Revenue Trend</h2>
            <span className="admin-badge admin-badge--green">
              <TrendingUp size={12} /> +18.4% MoM
            </span>
          </div>
          <div className="revenue-chart">
            {REVENUE_BARS.map(bar => (
              <div key={bar.month} className="revenue-bar-col">
                <div className="revenue-bar-track">
                  <div
                    className={`revenue-bar-fill ${bar.month === 'Oct' ? 'revenue-bar-fill--active' : ''}`}
                    style={{ height: `${bar.pct}%` }}
                  />
                </div>
                <span className="revenue-bar-label">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2 className="admin-card__title">Top Products</h2>
            <Link to="/admin/products" className="admin-card__link">View all</Link>
          </div>
          <div className="admin-top-products">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.id} className="admin-top-product-row">
                <span className="admin-top-product-rank">#{i + 1}</span>
                <div className="admin-top-product-thumb">
                  {p.images[0]
                    ? <img src={p.images[0]} alt={p.name} />
                    : <Circle size={16} />}
                </div>
                <div className="admin-top-product-info">
                  <p className="admin-top-product-name">{p.name}</p>
                  <p className="admin-top-product-brand">{p.brand}</p>
                </div>
                <div className="admin-top-product-stats">
                  <p className="admin-top-product-sold">{p.sold} sold</p>
                  <p className="admin-top-product-rev">₹{p.revenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Recent Orders</h2>
          <Link to="/admin/orders" className="admin-card__link">View all</Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map(order => (
                <tr key={order.id}>
                  <td className="admin-table__id">{order.id}</td>
                  <td>
                    <p className="admin-table__name">{order.customer}</p>
                    <p className="admin-table__sub">{order.company}</p>
                  </td>
                  <td className="admin-table__product">{order.product}</td>
                  <td className="admin-table__amount">₹{order.total.toLocaleString('en-IN')}</td>
                  <td>
                    <span
                      className="admin-status-pill"
                      style={{
                        background: `${order.statusColor}22`,
                        color: order.statusColor,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{dashStyles}</style>
    </div>
  )
}

const dashStyles = `
  .admin-page {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    max-width: 1280px;
  }

  /* Page header */
  .admin-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .admin-page-title {
    font-family: var(--font-display);
    font-size: 1.875rem;
    margin-bottom: 0.25rem;
  }

  .admin-page-sub {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
  }

  .admin-page-header__actions {
    display: flex;
    gap: 0.75rem;
  }

  /* KPI Cards */
  .admin-kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 1100px) { .admin-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .admin-kpi-grid { grid-template-columns: 1fr; } }

  .admin-kpi-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    transition: box-shadow var(--transition-fast), transform var(--transition-fast);
  }
  .admin-kpi-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  .admin-kpi-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .admin-kpi-card__icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .admin-kpi-card__value {
    font-family: var(--font-display);
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.375rem;
  }

  .admin-kpi-card__label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin-bottom: 0.375rem;
  }

  .admin-kpi-card__delta {
    font-size: 0.8125rem;
    font-weight: 600;
  }

  /* Middle row */
  .admin-middle-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 900px) { .admin-middle-row { grid-template-columns: 1fr; } }

  /* Generic card */
  .admin-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .admin-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .admin-card__title {
    font-family: var(--font-display);
    font-size: 1.0625rem;
  }

  .admin-card__link {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-accent-text);
    text-decoration: none;
  }

  /* Badges */
  .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-full);
  }

  .admin-badge--green {
    background: #22C55E22;
    color: #22C55E;
  }

  /* Revenue chart */
  .admin-chart-card { display: flex; flex-direction: column; }

  .revenue-chart {
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    padding: 1.5rem;
    height: 180px;
    flex: 1;
  }

  .revenue-bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
  }

  .revenue-bar-track {
    flex: 1;
    width: 100%;
    background: var(--color-bg);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .revenue-bar-fill {
    width: 100%;
    background: color-mix(in srgb, var(--color-accent) 40%, transparent);
    border-radius: var(--radius-sm);
    transition: height 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .revenue-bar-fill--active {
    background: var(--color-accent);
  }

  .revenue-bar-label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    flex-shrink: 0;
  }

  /* Top products */
  .admin-top-products {
    display: flex;
    flex-direction: column;
  }

  .admin-top-product-row {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border-muted);
    transition: background var(--transition-fast);
  }
  .admin-top-product-row:last-child { border-bottom: none; }
  .admin-top-product-row:hover { background: var(--color-bg); }

  .admin-top-product-rank {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-text-muted);
    width: 24px;
    flex-shrink: 0;
  }

  .admin-top-product-thumb {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
  }
  .admin-top-product-thumb img { width: 100%; height: 100%; object-fit: cover; }

  .admin-top-product-info { flex: 1; min-width: 0; }

  .admin-top-product-name {
    font-size: 0.875rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-top-product-brand {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .admin-top-product-stats { text-align: right; flex-shrink: 0; }

  .admin-top-product-sold { font-size: 0.8125rem; color: var(--color-text-secondary); }
  .admin-top-product-rev  { font-size: 0.875rem; font-weight: 700; }

  /* Table */
  .admin-table-wrap { overflow-x: auto; }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .admin-table thead {
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
  }

  .admin-table th {
    padding: 0.875rem 1.25rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-muted);
    white-space: nowrap;
  }

  .admin-table td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--color-border-muted);
    vertical-align: middle;
  }

  .admin-table tbody tr:last-child td { border-bottom: none; }

  .admin-table tbody tr:hover td { background: var(--color-bg); }

  .admin-table__id {
    font-family: monospace;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-accent-text);
    white-space: nowrap;
  }

  .admin-table__name { font-weight: 600; margin-bottom: 0.125rem; }
  .admin-table__sub  { font-size: 0.8125rem; color: var(--color-text-muted); }
  .admin-table__product { color: var(--color-text-secondary); font-size: 0.875rem; }
  .admin-table__amount { font-weight: 700; white-space: nowrap; }

  .admin-status-pill {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
`
