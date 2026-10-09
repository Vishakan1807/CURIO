import { Link } from 'react-router-dom'
import { Star, Gift } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="product-card__img"
            loading="lazy"
          />
        ) : (
          <div className="product-card__image-placeholder" aria-hidden>
            <Gift size={32} />
          </div>
        )}
        {product.badge && (
          <span className="product-card__badge badge badge-accent">{product.badge}</span>
        )}
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          <span className="product-card__category">{product.category}</span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__rating">
          <Star size={12} fill="currentColor" aria-hidden />
          <span>{product.rating}</span>
          <span className="product-card__rating-count">({product.reviews})</span>
        </div>
        <div className="product-card__pricing">
          <span className="product-card__price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="product-card__original-price">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <p className="product-card__moq">
          Min. order: {product.minQty} units
        </p>
      </div>
      <div className="product-card__hover-action">
        <span className="btn btn-primary" style={{ width: '100%', fontSize: '0.8125rem' }}>
          View Product
        </span>
      </div>
    </Link>
  )
}
