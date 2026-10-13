import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AdminRoute } from '@/components/auth/AdminRoute'
import { HomePage } from '@/pages/HomePage'
import { AuthPage } from '@/pages/AuthPage'
import { ShopPage } from '@/pages/ShopPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartPage } from '@/pages/CartPage'
import { BulkOrderPage } from '@/pages/BulkOrderPage'
import { AccountPage } from '@/pages/AccountPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { SolutionsPage } from '@/pages/SolutionsPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage'
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage'
import { AdminCustomersPage } from '@/pages/admin/AdminCustomersPage'
import { NotFoundPage } from '@/pages/StubPages'

const router = createBrowserRouter([
  // ─── Customer-facing routes ───────────────────────────────────────────────
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:category', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },

      { path: 'login', element: <AuthPage /> },

      // Protected customer routes
      { path: 'cart',       element: <ProtectedRoute><CartPage /></ProtectedRoute> },
      { path: 'account',    element: <ProtectedRoute><AccountPage /></ProtectedRoute> },
      { path: 'bulk-order', element: <ProtectedRoute><BulkOrderPage /></ProtectedRoute> },

      { path: 'about',           element: <AboutPage /> },
      { path: 'contact',         element: <ContactPage /> },
      { path: 'solutions',       element: <SolutionsPage /> },
      { path: 'solutions/:type', element: <SolutionsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // ─── Admin routes ─────────────────────────────────────────────────────────
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { index: true,            element: <AdminDashboardPage /> },
      { path: 'products',       element: <AdminProductsPage /> },
      { path: 'orders',         element: <AdminOrdersPage /> },
      { path: 'customers',      element: <AdminCustomersPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
