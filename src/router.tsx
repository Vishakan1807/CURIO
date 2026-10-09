import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { AuthPage } from '@/pages/AuthPage'
import {
  AboutPage,
  AccountPage,
  BulkOrderPage,
  CartPage,
  ContactPage,
  NotFoundPage,
  ProductDetailPage,
  ShopPage,
  SolutionsPage,
} from '@/pages/StubPages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:category', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      
      { path: 'login', element: <AuthPage /> },
      
      // Protected Routes
      { path: 'cart', element: <ProtectedRoute><CartPage /></ProtectedRoute> },
      { path: 'account', element: <ProtectedRoute><AccountPage /></ProtectedRoute> },
      { path: 'bulk-order', element: <ProtectedRoute><BulkOrderPage /></ProtectedRoute> },
      
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'solutions', element: <SolutionsPage /> },
      { path: 'solutions/:type', element: <SolutionsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
