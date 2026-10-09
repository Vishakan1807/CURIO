import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    updateQuantity, 
    removeItem, 
    getSubtotal 
  } = useCartStore()
  
  const navigate = useNavigate()

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/cart')
  }

  return (
    <>
      <div 
        className="cart-overlay overlay" 
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping Cart">
        
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <ShoppingBag size={20} />
            Your Cart ({items.length})
          </h2>
          <button 
            className="btn btn-ghost btn-icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} className="cart-empty__icon" />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any products yet.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setIsOpen(false)
                  navigate('/shop')
                }}
                style={{ marginTop: '1.5rem' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__image-wrap">
                    {item.product.images?.[0] ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="cart-item__image" 
                      />
                    ) : (
                      <div className="cart-item__placeholder">
                        <ShoppingBag size={20} />
                      </div>
                    )}
                  </div>
                  
                  <div className="cart-item__details">
                    <div className="cart-item__header">
                      <h4 className="cart-item__name">
                        <Link to={`/product/${item.productId}`} onClick={() => setIsOpen(false)}>
                          {item.product.name}
                        </Link>
                      </h4>
                      <button 
                        className="cart-item__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    {item.variant && (
                      <div className="cart-item__variant">
                        Color: {item.variant.color}
                      </div>
                    )}
                    
                    <div className="cart-item__price">
                      ₹{item.product.price.toLocaleString('en-IN')} / unit
                    </div>
                    
                    <div className="cart-item__actions">
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
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || item.product.minQty)}
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.variant ? item.quantity >= item.variant.stock : false}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="cart-item__subtotal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                    
                    {item.quantity === item.product.minQty && (
                      <div className="cart-item__note">Minimum order quantity reached</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal (excl. GST)</span>
                <span className="cart-summary__value">₹{getSubtotal().toLocaleString('en-IN')}</span>
              </div>
              <p className="cart-summary__note">Taxes and shipping calculated at checkout</p>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
      <style>{cartStyles}</style>
    </>
  )
}

const cartStyles = `
  .cart-overlay {
    z-index: 1000;
  }

  .cart-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(440px, 100vw);
    background-color: var(--color-bg);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes slideInRight {
    to { transform: translateX(0); }
  }

  .cart-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface);
  }

  .cart-drawer__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 500;
  }

  .cart-drawer__body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  /* Empty State */
  .cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    color: var(--color-text-secondary);
  }

  .cart-empty__icon {
    color: var(--color-border);
    margin-bottom: 1.5rem;
  }

  .cart-empty h3 {
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  /* Items */
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cart-item {
    display: flex;
    gap: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border-muted);
  }
  .cart-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .cart-item__image-wrap {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    overflow: hidden;
    flex-shrink: 0;
  }

  .cart-item__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cart-item__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
  }

  .cart-item__details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .cart-item__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .cart-item__name {
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .cart-item__name a {
    color: var(--color-text-primary);
    text-decoration: none;
  }
  .cart-item__name a:hover {
    color: var(--color-accent);
  }

  .cart-item__remove {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 0.25rem;
    margin: -0.25rem;
    transition: color var(--transition-fast);
  }
  .cart-item__remove:hover {
    color: var(--color-error);
  }

  .cart-item__variant {
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
  }

  .cart-item__price {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-top: 0.25rem;
  }

  .cart-item__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .qty-control--sm {
    height: 2.25rem;
  }

  .qty-control--sm .qty-btn {
    width: 2.25rem;
  }

  .qty-control--sm .qty-input {
    width: 2.5rem;
    font-size: 0.875rem;
  }

  .cart-item__subtotal {
    font-weight: 600;
    font-size: 0.9375rem;
  }

  .cart-item__note {
    font-size: 0.75rem;
    color: var(--color-gold);
    margin-top: 0.5rem;
  }

  /* Footer */
  .cart-drawer__footer {
    padding: 1.5rem;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-surface);
  }

  .cart-summary {
    margin-bottom: 1.25rem;
  }

  .cart-summary__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .cart-summary__note {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    margin-top: 0.25rem;
  }
`
