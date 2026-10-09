import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown, X, Gift } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { ProductCard } from '@/components/shop/ProductCard'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export function ShopPage() {
  const { category } = useParams<{ category: string }>()
  const [searchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // State for filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const query = searchParams.get('q') || ''

  // Derived data
  const allBrands = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map(p => p.brand))).sort()
  }, [])

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS

    // Category filter (from URL)
    if (category) {
      // Basic normalization to match URL params like 'bags-travel' to 'Bags & Travel'
      const normalizedCategory = category.replace('-', ' ').toLowerCase()
      result = result.filter(p => p.category.toLowerCase().includes(normalizedCategory) || normalizedCategory.includes(p.category.toLowerCase()))
    }

    // Search query
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        // Already loosely sorted by featured in data
        break
    }

    return result
  }, [category, query, selectedBrands, priceRange, sortBy])

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setPriceRange([0, 10000])
  }

  return (
    <div className="shop-page container-curio section-py">
      
      {/* Page Header */}
      <div className="shop-header">
        <h1 className="shop-title">
          {category ? category.replace('-', ' ') : query ? `Search: "${query}"` : 'All Products'}
        </h1>
        <p className="shop-subtitle">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      <div className="shop-layout">
        
        {/* Mobile Filter Toggle */}
        <div className="shop-mobile-controls">
          <button 
            className="btn btn-surface" 
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          
          <div className="shop-sort">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="shop-sort-select"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown size={14} className="shop-sort-icon" />
          </div>
        </div>

        {/* Filters Sidebar */}
        <aside className={`shop-sidebar ${isFilterOpen ? 'shop-sidebar--open' : ''}`}>
          <div className="shop-sidebar__header">
            <h3>Filters</h3>
            <button 
              className="btn btn-ghost btn-icon shop-sidebar__close"
              onClick={() => setIsFilterOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="shop-filter-group">
            <div className="shop-filter-group__header">
              <h4>Brands</h4>
            </div>
            <div className="shop-filter-options">
              {allBrands.map(brand => (
                <label key={brand} className="shop-filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="shop-filter-group">
            <div className="shop-filter-group__header">
              <h4>Price Range</h4>
            </div>
            <div className="price-slider-wrap">
              <div className="price-slider-labels">
                <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
              </div>
              <div className="price-slider-track-wrap">
                <div 
                  className="price-slider-fill"
                  style={{
                    left: `${(priceRange[0] / 10000) * 100}%`,
                    right: `${100 - (priceRange[1] / 10000) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange[0]}
                  onChange={e => {
                    const val = Number(e.target.value)
                    if (val < priceRange[1]) setPriceRange([val, priceRange[1]])
                  }}
                  className="price-range-input price-range-input--min"
                  aria-label="Minimum price"
                />
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange[1]}
                  onChange={e => {
                    const val = Number(e.target.value)
                    if (val > priceRange[0]) setPriceRange([priceRange[0], val])
                  }}
                  className="price-range-input price-range-input--max"
                  aria-label="Maximum price"
                />
              </div>
              <div className="price-slider-bounds">
                <span>₹0</span>
                <span>₹10,000</span>
              </div>
            </div>
          </div>

          {(selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
            <button className="btn btn-ghost shop-clear-filters" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </aside>

        {/* Overlay for mobile sidebar */}
        {isFilterOpen && (
          <div className="overlay shop-sidebar-overlay" onClick={() => setIsFilterOpen(false)} />
        )}

        {/* Product Grid */}
        <div className="shop-main">
          {filteredProducts.length > 0 ? (
            <div className="shop-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <Gift size={48} className="shop-empty__icon" />
              <h3>No products found</h3>
              <p>We couldn't find anything matching your current filters.</p>
              <button className="btn btn-primary" onClick={clearFilters} style={{ marginTop: '1rem' }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>

      <style>{shopStyles}</style>
    </div>
  )
}

const shopStyles = `
  .shop-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1.5rem;
  }

  .shop-title {
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }

  .shop-subtitle {
    color: var(--color-text-muted);
    font-size: 0.9375rem;
  }

  .shop-layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  @media (max-width: 900px) {
    .shop-layout {
      grid-template-columns: 1fr;
    }
  }

  .shop-mobile-controls {
    display: none;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 900px) {
    .shop-mobile-controls { display: flex; }
    .shop-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: min(320px, 85vw);
      background-color: var(--color-bg);
      z-index: 200;
      padding: 1.5rem;
      transform: translateX(-100%);
      transition: transform var(--transition-base);
      overflow-y: auto;
      border-right: 1px solid var(--color-border);
    }
    .shop-sidebar--open {
      transform: translateX(0);
    }
    .shop-sidebar-overlay {
      z-index: 190;
    }
  }

  .shop-sidebar__header {
    display: none;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  @media (max-width: 900px) {
    .shop-sidebar__header { display: flex; }
  }

  .shop-filter-group {
    margin-bottom: 2rem;
  }

  .shop-filter-group__header h4 {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .shop-filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .shop-filter-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .shop-filter-checkbox input[type="checkbox"] {
    accent-color: var(--color-accent);
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  .shop-filter-checkbox:hover span {
    color: var(--color-text-primary);
  }

  /* Price slider */
  .price-slider-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .price-slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .price-slider-track-wrap {
    position: relative;
    height: 20px;
    display: flex;
    align-items: center;
  }

  .price-slider-fill {
    position: absolute;
    height: 4px;
    background: var(--color-accent);
    border-radius: 99px;
    pointer-events: none;
    z-index: 1;
  }

  .price-range-input {
    position: absolute;
    width: 100%;
    height: 4px;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    pointer-events: none;
    outline: none;
  }

  .price-range-input::-webkit-slider-runnable-track {
    height: 4px;
    background: var(--color-border);
    border-radius: 99px;
  }

  .price-range-input--min::-webkit-slider-runnable-track,
  .price-range-input--max::-webkit-slider-runnable-track {
    background: transparent;
  }

  .price-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-accent);
    border: 2px solid var(--color-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    cursor: pointer;
    pointer-events: all;
    position: relative;
    z-index: 2;
    transition: transform 0.15s;
  }

  .price-range-input::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  .price-range-input::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-accent);
    border: 2px solid var(--color-bg);
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    cursor: pointer;
    pointer-events: all;
  }

  .price-slider-bounds {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 0.125rem;
  }

  .shop-clear-filters {
    width: 100%;
    text-align: center;
    color: var(--color-error);
  }
  .shop-clear-filters:hover {
    background-color: var(--color-error-muted);
  }

  /* Sort dropdown */
  .shop-sort {
    position: relative;
    display: inline-block;
  }

  @media (min-width: 901px) {
    .shop-sort {
      position: absolute;
      top: -3.5rem;
      right: 0;
    }
    .shop-layout {
      position: relative;
    }
  }

  .shop-sort-select {
    appearance: none;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 0.5rem 2rem 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--color-text-primary);
    cursor: pointer;
    outline: none;
  }

  .shop-sort-select:focus {
    border-color: var(--color-accent);
  }

  .shop-sort-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text-muted);
  }

  /* Grid */
  .shop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1200px) {
    .shop-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .shop-grid { grid-template-columns: 1fr; }
  }

  /* Empty State */
  .shop-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
    background-color: var(--color-surface);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
  }

  .shop-empty__icon {
    color: var(--color-border);
    margin-bottom: 1rem;
  }

  .shop-empty h3 {
    margin-bottom: 0.5rem;
  }

  .shop-empty p {
    color: var(--color-text-muted);
  }
`
