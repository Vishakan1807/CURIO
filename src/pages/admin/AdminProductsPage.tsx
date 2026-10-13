import { useState } from 'react'
import { Search, Plus, Trash2, Package, X } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import type { Category } from '@/types/product'

const ALL_CATEGORIES: Category[] = [
  'Drinkware',
  'Technology',
  'Bags & Travel',
  'Stationery',
  'Apparel',
  'Gift Hampers',
  'Eco-Friendly',
  'Executive',
]

export function AdminProductsPage() {
  const { products, addProduct, deleteProduct } = useAdminStore()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Add Product modal state
  const [showAddModal, setShowAddModal] = useState(false)
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState<Category>('Drinkware')
  const [price, setPrice] = useState('1499')
  const [minQty, setMinQty] = useState('15')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')

  const categories = ['All', ...ALL_CATEGORIES]

  const filtered = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !brand.trim()) return

    addProduct({
      name: name.trim(),
      brand: brand.trim(),
      category,
      price: Number(price) || 999,
      minQty: Number(minQty) || 10,
      description: description.trim() || 'Premium corporate gifting product.',
      rating: 4.8,
      reviews: 1,
      badge: 'New',
      images: [
        imageUrl.trim() ||
          'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
      ],
      customizable: true,
      features: ['Corporate branding available', 'Premium packaging'],
      specifications: {
        Brand: brand.trim(),
        Category: category,
      },
    })

    // Reset & close
    setName('')
    setBrand('')
    setImageUrl('')
    setDescription('')
    setShowAddModal(false)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Live Product Catalogue</h1>
          <p className="admin-page-sub">{products.length} active products in live database</p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          onClick={() => setShowAddModal(true)}
        >
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
                <th>Unit Price</th>
                <th>Min MOQ</th>
                <th>Stock Status</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--color-text-muted)' }}>
                    No products match your search.
                  </td>
                </tr>
              ) : filtered.map(p => {
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="admin-product-cell">
                        <div className="admin-product-thumb">
                          {p.images[0] ? (
                            <img src={p.images[0]} alt={p.name} />
                          ) : (
                            <Package size={16} />
                          )}
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
                        style={{ background: '#22C55E22', color: '#22C55E' }}
                      >
                        In Stock
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
                      <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete product"
                        aria-label={`Delete ${p.name}`}
                        onClick={() => {
                          if (confirm(`Delete "${p.name}" from catalogue?`)) {
                            deleteProduct(p.id)
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
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="checkout-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <div className="checkout-modal__header">
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem' }}>Add New Product</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>Add a product directly to the live Curio catalogue</p>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="checkout-modal__form">
              <div className="checkout-grid-2">
                <div className="checkout-field">
                  <label className="checkout-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    className="checkout-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Titan Connected Smart Band"
                  />
                </div>
                <div className="checkout-field">
                  <label className="checkout-label">Brand Name *</label>
                  <input
                    type="text"
                    required
                    className="checkout-input"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="Titan"
                  />
                </div>
              </div>

              <div className="checkout-grid-2">
                <div className="checkout-field">
                  <label className="checkout-label">Category *</label>
                  <select
                    className="checkout-input"
                    value={category}
                    onChange={e => setCategory(e.target.value as Category)}
                  >
                    {ALL_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="checkout-field">
                  <label className="checkout-label">Unit Price (₹) *</label>
                  <input
                    type="number"
                    required
                    className="checkout-input"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="checkout-grid-2">
                <div className="checkout-field">
                  <label className="checkout-label">Minimum Order Qty (MOQ)</label>
                  <input
                    type="number"
                    required
                    className="checkout-input"
                    value={minQty}
                    onChange={e => setMinQty(e.target.value)}
                  />
                </div>
                <div className="checkout-field">
                  <label className="checkout-label">Image URL (Unsplash or direct)</label>
                  <input
                    type="url"
                    className="checkout-input"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div className="checkout-field">
                <label className="checkout-label">Description</label>
                <textarea
                  className="checkout-input"
                  style={{ minHeight: '75px', resize: 'vertical' }}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Short description for corporate clients..."
                />
              </div>

              <div className="checkout-footer">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
  .admin-action-btn--danger:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: #ef444412;
  }
`
