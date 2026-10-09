// Stub pages — these will be fully built in subsequent milestones

export function ShopPage() {
  return (
    <div className="container-curio section-py">
      <h1>Shop All Products</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Full catalogue with filtering, sorting, and search — coming in Milestone 2.
      </p>
    </div>
  )
}

export function ProductDetailPage() {
  return (
    <div className="container-curio section-py">
      <h1>Product Detail</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Full product detail view — coming in Milestone 2.
      </p>
    </div>
  )
}

export function CartPage() {
  return (
    <div className="container-curio section-py">
      <h1>Your Cart</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Cart & checkout — coming in Milestone 3.
      </p>
    </div>
  )
}

export function AccountPage() {
  return (
    <div className="container-curio section-py">
      <h1>My Account</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Authentication & account — coming in Milestone 4.
      </p>
    </div>
  )
}

export function BulkOrderPage() {
  return (
    <div className="container-curio section-py">
      <h1>Bulk Order & Quotation</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Corporate quotation form — coming in Milestone 5.
      </p>
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="container-curio section-py">
      <h1>About Curio & Co.</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Our story — coming soon.
      </p>
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="container-curio section-py">
      <h1>Contact Us</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Contact form — coming soon.
      </p>
    </div>
  )
}

export function SolutionsPage() {
  return (
    <div className="container-curio section-py">
      <h1>Corporate Solutions</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        Solutions overview — coming soon.
      </p>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <div className="container-curio section-py" style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'var(--color-border)', lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ marginTop: '1rem' }}>Page not found</h1>
      <p className="text-secondary" style={{ marginTop: '0.75rem' }}>
        This page doesn't exist or may have been moved.
      </p>
      <a href="/" className="btn btn-primary btn-lg" style={{ marginTop: '2rem', display: 'inline-flex' }}>
        Return Home
      </a>
    </div>
  )
}
