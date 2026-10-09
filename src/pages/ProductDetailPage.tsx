import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ShieldCheck, ChevronRight, Package, Truck, ArrowLeft } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = PRODUCTS.find(p => p.id === id)

  const [quantity, setQuantity] = useState(product?.minQty || 1)
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id)
  
  const { addItem } = useCartStore()

  if (!product) {
    return (
      <div className="container-curio section-py" style={{ textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!product) return
    const variant = product.variants?.find(v => v.id === selectedVariantId)
    addItem(product, quantity, variant)
  }

  return (
    <div className="product-page">
      <div className="container-curio">
        
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <button onClick={() => navigate(-1)} className="breadcrumbs__back" aria-label="Go back">
            <ArrowLeft size={16} /> Back
          </button>
          <span className="breadcrumbs__sep">|</span>
          <Link to="/shop" className="breadcrumbs__link">Shop</Link>
          <ChevronRight size={14} className="breadcrumbs__icon" />
          <Link to={`/shop/${product.category.toLowerCase().replace(' ', '-')}`} className="breadcrumbs__link">
            {product.category}
          </Link>
          <ChevronRight size={14} className="breadcrumbs__icon" />
          <span className="breadcrumbs__current" aria-current="page">{product.name}</span>
        </nav>

        <div className="product-layout">
          
          {/* Left: Images */}
          <div className="product-gallery">
            <div className="product-gallery__main">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="product-gallery__img" />
              ) : (
                <div className="product-gallery__placeholder">
                  <span>Image Preview</span>
                </div>
              )}
              {product.badge && (
                <span className="badge badge-accent product-gallery__badge">{product.badge}</span>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="product-details">
            <div className="product-meta">
              <span className="product-brand">{product.brand}</span>
              <div className="product-rating">
                <Star size={14} fill="currentColor" className="product-rating-icon" />
                <span>{product.rating}</span>
                <span className="product-rating-count">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="product-original-price">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="product-tax-note">excl. GST</span>
            </div>

            <p className="product-desc">{product.description}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="product-options">
                <h4 className="product-options-label">Select Color</h4>
                <div className="product-variants">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      className={`product-variant-btn ${selectedVariantId === v.id ? 'product-variant-btn--active' : ''}`}
                      onClick={() => setSelectedVariantId(v.id)}
                      aria-label={v.color}
                      title={v.color}
                    >
                      <span 
                        className="product-variant-color" 
                        style={{ backgroundColor: v.colorCode }} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="divider" style={{ margin: '2rem 0' }} />

            {/* Add to Cart Area */}
            <div className="product-actions">
              <div className="product-quantity">
                <label htmlFor="qty" className="product-options-label">Quantity</label>
                <div className="qty-control">
                  <button 
                    type="button" 
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(product.minQty, quantity - 1))}
                    disabled={quantity <= product.minQty}
                  >
                    -
                  </button>
                  <input 
                    id="qty"
                    type="number" 
                    className="qty-input" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minQty, parseInt(e.target.value) || product.minQty))}
                    min={product.minQty}
                  />
                  <button 
                    type="button" 
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="product-moq-note">Min. order: {product.minQty} units</span>
              </div>

              <button 
                className="btn btn-primary btn-lg product-add-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Info Badges */}
            <div className="product-trust">
              <div className="product-trust-item">
                <ShieldCheck size={18} className="product-trust-icon" />
                <div>
                  <strong>Authentic Product</strong>
                  <p>Sourced directly from {product.brand}</p>
                </div>
              </div>
              {product.customizable && (
                <div className="product-trust-item">
                  <Package size={18} className="product-trust-icon" />
                  <div>
                    <strong>Custom Branding</strong>
                    <p>Logo printing available on bulk orders</p>
                  </div>
                </div>
              )}
              <div className="product-trust-item">
                <Truck size={18} className="product-trust-icon" />
                <div>
                  <strong>Pan-India Delivery</strong>
                  <p>Dispatches within 48-72 hours</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Specifications */}
        <div className="product-bottom">
          <div className="product-specs-card">
            <h3>Specifications</h3>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key}</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-features-card">
            <h3>Key Features</h3>
            <ul className="features-list">
              {product.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
      <style>{detailStyles}</style>
    </div>
  )
}

const detailStyles = `
  .product-page {
    padding-block: 2rem 5rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    margin-bottom: 2rem;
  }

  .breadcrumbs__back {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-weight: 500;
    cursor: pointer;
    padding: 0;
  }
  .breadcrumbs__back:hover { color: var(--color-text-primary); }

  .breadcrumbs__sep { color: var(--color-border); margin-inline: 0.25rem; }
  
  .breadcrumbs__link {
    color: var(--color-text-secondary);
    text-decoration: none;
  }
  .breadcrumbs__link:hover { color: var(--color-text-primary); }
  
  .breadcrumbs__current {
    color: var(--color-text-primary);
    font-weight: 500;
  }

  /* Layout */
  .product-layout {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  @media (max-width: 900px) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  /* Gallery */
  .product-gallery__main {
    position: relative;
    aspect-ratio: 4/3;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .product-gallery__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-gallery__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-family: var(--font-display);
    font-size: 1.5rem;
  }

  .product-gallery__badge {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    font-size: 0.8125rem;
    padding: 0.4rem 0.875rem;
  }

  /* Details */
  .product-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .product-brand {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent-text);
  }

  .product-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .product-rating-icon { color: var(--color-gold); }
  .product-rating-count { color: var(--color-text-muted); font-weight: 400; }

  .product-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .product-pricing {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .product-price {
    font-size: 1.75rem;
    font-weight: 700;
  }

  .product-original-price {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    text-decoration: line-through;
  }

  .product-tax-note {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .product-desc {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  /* Options */
  .product-options-label {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    margin-bottom: 0.75rem;
    display: block;
  }

  .product-variants {
    display: flex;
    gap: 0.75rem;
  }

  .product-variant-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 2px;
    background: transparent;
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color var(--transition-fast);
  }

  .product-variant-btn--active {
    border-color: var(--color-accent);
  }

  .product-variant-color {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);
  }

  /* Actions */
  .product-actions {
    display: flex;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    .product-actions {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .qty-control {
    display: inline-flex;
    align-items: center;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    height: 3rem;
  }

  .qty-btn {
    background: none;
    border: none;
    width: 3rem;
    height: 100%;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--color-text-secondary);
  }
  .qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .qty-btn:hover:not(:disabled) { background-color: var(--color-surface-2); color: var(--color-text-primary); }

  .qty-input {
    width: 3rem;
    height: 100%;
    border: none;
    border-left: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    background: transparent;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-primary);
    -moz-appearance: textfield;
  }
  .qty-input::-webkit-outer-spin-button,
  .qty-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .product-moq-note {
    display: block;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 0.5rem;
  }

  .product-add-btn {
    flex: 1;
    height: 3rem;
  }

  .btn-success {
    background-color: var(--color-success);
    color: #fff;
    border-color: var(--color-success);
  }

  /* Trust Badges */
  .product-trust {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem;
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
  }

  .product-trust-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .product-trust-icon {
    color: var(--color-accent);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .product-trust-item strong {
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.125rem;
  }

  .product-trust-item p {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  /* Bottom specs area */
  .product-bottom {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    margin-top: 4rem;
    padding-top: 4rem;
    border-top: 1px solid var(--color-border);
  }

  @media (max-width: 900px) {
    .product-bottom {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      margin-top: 2.5rem;
      padding-top: 2.5rem;
    }
  }

  .product-specs-card h3,
  .product-features-card h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .specs-grid {
    display: flex;
    flex-direction: column;
  }

  .spec-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    padding-block: 1rem;
    border-bottom: 1px solid var(--color-border-muted);
    font-size: 0.9375rem;
  }

  .spec-row:last-child {
    border-bottom: none;
  }

  .spec-key {
    color: var(--color-text-muted);
  }

  .spec-val {
    font-weight: 500;
  }

  .features-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .features-list li {
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
  }

  .features-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: bold;
  }
`
