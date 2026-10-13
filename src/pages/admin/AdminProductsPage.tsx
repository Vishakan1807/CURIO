import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Package } from 'lucide-react'
import { PRODUCTS } from '@/data/products'

export function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category))).sort()]

  const filtered = PRODUCTS.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const getStockTotal = (p: typeof PRODUCTS[number]) =>
    p.variants ? p.variants.reduce((sum, v) => sum + v.stock, 0) : 999

  const getStockBadge = (stock: number) => {
    if (stock > 100) return { label: 'In Stock', color: '#22C55E' }
    if (stock > 20)  return { label: 'Low Stock', color: '#F59E0B' }
    return { label: 'Critical', color: '#EF4444' }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">{PRODUCTS.length} products in catalogue</p>
        </div>
        <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="admin-filters-bar">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="search"
              className="admin-search-input"
              placeholder="Search products or brands…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="admin-cat-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`admin-cat-pill ${categoryFilter === cat ? 'admin-cat-pill--active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Min Qty</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    No products match your search.
                  </td>
                </tr>
              ) : filtered.map(p => {
                const stock = getStockTotal(p)
                const badge = getStockBadge(stock)
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="admin-product-cell">
                        <div className="admin-product-thumb">
                          {p.images[0]
                            ? <img src={p.images[0]} alt={p.name} />
                            : <Package size={16} />}
                        </div>
                        <div>
                          <p className="admin-table__name">{p.name}</p>
                          <p className="admin-table__sub">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-cat-tag">{p.category}</span>
                    </td>
                    <td className="admin-table__amount">₹{p.price.toLocaleString('en-IN')}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{p.minQty} units</td>
                    <td>
                      <span
                        className="admin-status-pill"
                        style={{ background: `${badge.color}22`, color: badge.color }}
                      >
                        {badge.label}
                        {p.variants ? ` (${stock})` : ''}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.875rem' }}>
                          ★ {p.rating}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                          ({p.reviews})
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.375rem' }}>
                        <button
                          className="admin-action-btn"
                          title="Edit product"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="admin-action-btn admin-action-btn--danger"
                          title="Delete product"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{productsStyles}</style>
    </div>
  )
}

const productsStyles = `
  .admin-filters-bar {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .admin-search-wrap {
    position: relative;
    max-width: 360px;
  }

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

  .admin-cat-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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

  .admin-product-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .admin-product-thumb {
    width: 48px;
    height: 48px;
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
  .admin-product-thumb img { width: 100%; height: 100%; object-fit: cover; }

  .admin-cat-tag {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent-text);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .admin-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .admin-action-btn:hover {
    background: var(--color-surface-2);
    border-color: var(--color-accent);
    color: var(--color-accent-text);
  }
  .admin-action-btn--danger:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: #ef444412;
  }
`
