import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from '@/components/shop/CartDrawer'
import { useAuthStore } from '@/stores/authStore'

export function RootLayout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const location = useLocation()

  // Require login whenever trying to open the app / any page
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

