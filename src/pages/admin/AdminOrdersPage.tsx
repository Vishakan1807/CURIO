import { useState } from 'react'
import { Search, Filter, Trash2 } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import type { OrderStatus } from '@/stores/adminStore'

type FilterStatus = 'All' | OrderStatus
type TabType = 'orders' | 'quotes'

const STATUS_COLORS: Record<string, string> = {
  Processing: '#F59E0B',
  Shipped: '#0EA5E9',
  Delivered: '#22C55E',
  Cancelled: '#EF4444',
}

const STATUS_OPTIONS: FilterStatus[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export function AdminOrdersPage() {
  const { orders, quotes, updateOrderStatus, updateQuoteStatus, deleteOrder, deleteQuote } = useAdminStore()
  const [tab, setTab] = useState<TabType>('orders')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All')

  const filteredOrders = orders.filter(o => {
    const matchSearch =
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerCompany.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const filteredQuotes = quotes.filter(q => {
    const matchSearch =
      q.contactName.toLowerCase().includes(search.toLowerCase()) ||
      q.companyName.toLowerCase().includes(search.toLowerCase()) ||
      q.quoteNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || q.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Live Orders & Quotes</h1>
          <p className="admin-page-sub">Manage real customer purchases and B2B corporate quotation requests</p>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="admin-tab-bar">
        <button
          className={`admin-tab ${tab === 'orders' ? 'admin-tab--active' : ''}`}
          onClick={() => setTab('orders')}
        >
          Customer Orders
          <span className="admin-tab-count">{orders.length}</span>
        </button>
        <button
          className={`admin-tab ${tab === 'quotes' ? 'admin-tab--active' : ''}`}
          onClick={() => setTab('quotes')}
        >
          Quote Requests
          <span className="admin-tab-count">{quotes.length}</span>
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

        {/* Orders Table */}
        {tab === 'orders' && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order No</th>
                  <th>Customer & Company</th>
                  <th>Items Details</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Live Status</th>
                  <th>Change Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--color-text-muted)' }}>
                      No orders matching your criteria.
                    </td>
                  </tr>
                ) : filteredOrders.map(order => {
                  const color = STATUS_COLORS[order.status] ?? '#6B7280'
                  return (
                    <tr key={order.id}>
                      <td className="admin-table__id">{order.orderNumber}</td>
                      <td>
                        <p className="admin-table__name">{order.customerName}</p>
                        <p className="admin-table__sub">{order.customerCompany} · {order.customerEmail}</p>
                      </td>
                      <td className="admin-table__product" style={{ maxWidth: 260 }}>
                        {order.items.map(i => `${i.name} × ${i.quantity}`).join(', ')}
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                          Ship to: {order.shippingAddress}
                        </p>
                      </td>
                      <td className="admin-table__amount">
                        ₹{order.total.toLocaleString('en-IN')}
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td>
                        <span
                          className="admin-status-pill"
                          style={{ background: `${color}22`, color }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="admin-status-select"
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          aria-label={`Change status for order ${order.orderNumber}`}
                        >
                          {Object.keys(STATUS_COLORS).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className="admin-action-btn admin-action-btn--danger"
                          title="Delete Order"
                          onClick={() => {
                            if (confirm(`Delete order ${order.orderNumber}?`)) {
                              deleteOrder(order.id)
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Quotes Table */}
        {tab === 'quotes' && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quote Ref</th>
                  <th>Client & Company</th>
                  <th>Requirements</th>
                  <th>Units</th>
                  <th>Est. Value</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Change Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--color-text-muted)' }}>
                      No quote requests matching your criteria.
                    </td>
                  </tr>
                ) : filteredQuotes.map(quote => {
                  const color = STATUS_COLORS[quote.status] ?? '#6B7280'
                  return (
                    <tr key={quote.id}>
                      <td className="admin-table__id">{quote.quoteNumber}</td>
                      <td>
                        <p className="admin-table__name">{quote.contactName}</p>
                        <p className="admin-table__sub">{quote.companyName} · {quote.phone}</p>
                      </td>
                      <td className="admin-table__product" style={{ maxWidth: 240 }}>
                        <p style={{ fontWeight: 600 }}>{quote.selectedProducts.map(p => p.name).join(', ')}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          Branding: {quote.brandingType} {quote.notes ? `· "${quote.notes}"` : ''}
                        </p>
                      </td>
                      <td style={{ fontWeight: 600 }}>{quote.totalUnits} units</td>
                      <td className="admin-table__amount">
                        {quote.estimatedTotal ? `₹${quote.estimatedTotal.toLocaleString('en-IN')}` : 'To Quote'}
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                        {quote.deliveryDate}
                      </td>
                      <td>
                        <span
                          className="admin-status-pill"
                          style={{ background: `${color}22`, color }}
                        >
                          {quote.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="admin-status-select"
                          value={quote.status}
                          onChange={e => updateQuoteStatus(quote.id, e.target.value as OrderStatus)}
                          aria-label={`Change status for quote ${quote.quoteNumber}`}
                        >
                          {Object.keys(STATUS_COLORS).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className="admin-action-btn admin-action-btn--danger"
                          title="Delete Quote"
                          onClick={() => {
                            if (confirm(`Delete quote ${quote.quoteNumber}?`)) {
                              deleteQuote(quote.id)
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary footer */}
        <div className="admin-table-footer">
          <span>
            Showing {tab === 'orders' ? filteredOrders.length : filteredQuotes.length} of{' '}
            {tab === 'orders' ? orders.length : quotes.length} records
          </span>
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
    padding: 0.35rem 0.625rem;
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

  .admin-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .admin-action-btn--danger:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: #ef444415;
  }

  .admin-table-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .admin-filters-bar {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .admin-search-wrap { position: relative; max-width: 360px; flex: 1; min-width: 240px; }

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
