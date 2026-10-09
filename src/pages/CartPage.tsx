import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Package, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore()
  const navigate = useNavigate()

  const subtotal = getSubtotal()
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container-curio">
          <div className="cart-empty-page">
            <ShoppingBag size={72} className="cart-empty-page__icon" />
            <h1>Your cart is empty</h1>
            <p>Browse our curated catalogue and add products to get started.</p>
            <Link to="/shop" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>
              Browse Catalogue
            </Link>
          </div>
        </div>
        <style>{cartPageStyles}</style>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container-curio">

        {/* Header */}
        <div className="cart-page__header">
          <button className="cart-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Continue Shopping
          </button>
          <h1 className="cart-page__title">Your Cart <span className="cart-page__count">({items.length} {items.length === 1 ? 'item' : 'items'})</span></h1>
          <button className="cart-clear-btn" onClick={clearCart}>Clear all</button>
        </div>

        <div className="cart-page__body">

          {/* Items Column */}
          <div className="cart-page__items">
            {items.map(item => {
              const displayImage = item.variant?.image ?? item.product.images?.[0]
              return (
                <div key={item.id} className="cart-page-item">
                  {/* Thumbnail */}
                  <div className="cart-page-item__thumb">
                    {displayImage ? (
                      <img src={displayImage} alt={item.product.name} />
                    ) : (
                      <div className="cart-page-item__thumb-placeholder">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="cart-page-item__info">
                    <div className="cart-page-item__top">
                      <div>
                        <p className="cart-page-item__brand">{item.product.brand}</p>
                        <Link to={`/product/${item.productId}`} className="cart-page-item__name">
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="cart-page-item__variant">
                            <span className="variant-dot" style={{ background: item.variant.colorCode }} />
                            {item.variant.color}
                          </p>
                        )}
                        <p className="cart-page-item__moq">Min. order: {item.product.minQty} units</p>
                      </div>
                      <button
                        className="cart-page-item__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-page-item__bottom">
                      {/* Qty Control */}
                      <div className="qty-control qty-control--sm">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= item.product.minQty}
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          className="qty-input"
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, parseInt(e.target.value) || item.product.minQty)}
                        />
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.variant ? item.quantity >= item.variant.stock : false}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="cart-page-item__line-total">
                        <span className="cart-page-item__unit-price">₹{item.product.price.toLocaleString('en-IN')} / unit</span>
                        <span className="cart-page-item__total">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Branding / Customisation note */}
            <div className="cart-branding-note">
              <Package size={20} className="cart-branding-note__icon" />
              <div>
                <strong>Custom Branding Available</strong>
                <p>Need your logo printed on these products? Raise a bulk quote and our team will get in touch within 24 hours.</p>
                <Link to="/bulk-order" className="cart-branding-note__link">
                  Raise a Quote <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-page__summary">
            <div className="order-summary-card">
              <h2 className="order-summary-card__title">Order Summary</h2>

              <div className="order-summary-rows">
                <div className="order-summary-row">
                  <span>Subtotal (excl. GST)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="order-summary-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="order-summary-row order-summary-row--shipping">
                  <span>Shipping</span>
                  <span className="order-summary-free">Calculated at checkout</span>
                </div>
              </div>

              <div className="order-summary-divider" />

              <div className="order-summary-total">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <div className="order-summary-gst-note">
                <Tag size={12} /> GST included in total
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1.5rem' }}
                onClick={() => navigate('/bulk-order')}
              >
                Proceed to Checkout
              </button>

              <Link to="/bulk-order" className="order-summary-quote-link">
                Or raise a formal quote &rarr;
              </Link>

              {/* Trust items */}
              <ul className="order-summary-trust">
                <li>✓ Secure payments</li>
                <li>✓ Pan-India delivery</li>
                <li>✓ Dedicated account manager</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <style>{cartPageStyles}</style>
    </div>
  )
}

const cartPageStyles = `
  .cart-page {
    padding-block: 2rem 5rem;
  }

  /* Empty state */
  .cart-empty-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 60vh;
    color: var(--color-text-secondary);
  }

  .cart-empty-page__icon {
    color: var(--color-border);
    margin-bottom: 2rem;
  }

  .cart-empty-page h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.75rem;
    color: var(--color-text-primary);
  }

  /* Page header */
  .cart-page__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  .cart-back-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    transition: color var(--transition-fast);
  }
  .cart-back-btn:hover { color: var(--color-text-primary); }

  .cart-page__title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    flex: 1;
    text-align: center;
  }

  .cart-page__count {
    font-size: 1.125rem;
    color: var(--color-text-muted);
    font-weight: 400;
  }

  .cart-clear-btn {
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    transition: color var(--transition-fast);
  }
  .cart-clear-btn:hover { color: var(--color-error); }

  /* Body layout */
  .cart-page__body {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 3rem;
    align-items: start;
  }

  @media (max-width: 960px) {
    .cart-page__body {
      grid-template-columns: 1fr;
    }
    .cart-page__summary {
      order: -1;
    }
  }

  /* Items list */
  .cart-page__items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cart-page-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: box-shadow var(--transition-fast);
  }
  .cart-page-item:hover {
    box-shadow: var(--shadow-md);
  }

  .cart-page-item__thumb {
    width: 100px;
    height: 100px;
    border-radius: var(--radius-md);
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-border);
    overflow: hidden;
    flex-shrink: 0;
  }
  .cart-page-item__thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cart-page-item__thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
  }

  .cart-page-item__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cart-page-item__top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .cart-page-item__brand {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-accent-text);
    margin-bottom: 0.25rem;
  }

  .cart-page-item__name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-primary);
    text-decoration: none;
    line-height: 1.3;
  }
  .cart-page-item__name:hover { color: var(--color-accent); }

  .cart-page-item__variant {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
  }

  .variant-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.15);
    flex-shrink: 0;
  }

  .cart-page-item__moq {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 0.25rem;
  }

  .cart-page-item__remove {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 0.25rem;
    flex-shrink: 0;
    transition: color var(--transition-fast);
  }
  .cart-page-item__remove:hover { color: var(--color-error); }

  .cart-page-item__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cart-page-item__line-total {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.125rem;
  }

  .cart-page-item__unit-price {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .cart-page-item__total {
    font-size: 1.0625rem;
    font-weight: 700;
  }

  /* Branding note */
  .cart-branding-note {
    display: flex;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 4%, var(--color-surface)));
    border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
    border-radius: var(--radius-lg);
    align-items: flex-start;
  }

  .cart-branding-note__icon {
    color: var(--color-accent);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .cart-branding-note strong {
    display: block;
    font-size: 0.9375rem;
    margin-bottom: 0.375rem;
  }

  .cart-branding-note p {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .cart-branding-note__link {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
    color: var(--color-accent-text);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    margin-top: 0.5rem;
    transition: gap var(--transition-fast);
  }
  .cart-branding-note__link:hover { gap: 0.375rem; }

  /* Order summary card */
  .order-summary-card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 2rem;
    position: sticky;
    top: 6rem;
  }

  .order-summary-card__title {
    font-family: var(--font-display);
    font-size: 1.375rem;
    margin-bottom: 1.5rem;
  }

  .order-summary-rows {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .order-summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
  }

  .order-summary-free {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .order-summary-divider {
    height: 1px;
    background: var(--color-border);
    margin-block: 1.25rem;
  }

  .order-summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.1875rem;
    font-weight: 700;
  }

  .order-summary-gst-note {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 0.5rem;
  }

  .order-summary-quote-link {
    display: block;
    text-align: center;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    text-decoration: none;
    margin-top: 1rem;
    transition: color var(--transition-fast);
  }
  .order-summary-quote-link:hover { color: var(--color-accent-text); }

  .order-summary-trust {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border-muted);
  }

  .order-summary-trust li {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }
`
