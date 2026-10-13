import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PRODUCTS } from '@/data/products'
import type { Product } from '@/types/product'

export interface OrderItem {
  productId: string
  name: string
  brand: string
  price: number
  quantity: number
  variantColor?: string
  image?: string
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerCompany: string
  customerPhone?: string
  shippingAddress: string
  items: OrderItem[]
  subtotal: number
  gst: number
  total: number
  status: OrderStatus
  createdAt: string
  paymentMethod: string
}

export interface QuoteRequest {
  id: string
  quoteNumber: string
  companyName: string
  gstin?: string
  industry: string
  contactName: string
  email: string
  phone: string
  selectedProducts: { id: string; name: string; brand: string }[]
  totalUnits: number
  deliveryDate: string
  brandingType: string
  artworkReady: string
  notes?: string
  status: OrderStatus
  estimatedTotal?: number
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  company: string
  phone: string
  createdAt: string
  tier: 'Silver' | 'Gold' | 'Platinum'
}

interface AdminState {
  orders: Order[]
  quotes: QuoteRequest[]
  products: Product[]
  customers: Customer[]

  // Order actions
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  deleteOrder: (orderId: string) => void

  // Quote actions
  createQuote: (quote: Omit<QuoteRequest, 'id' | 'quoteNumber' | 'createdAt'>) => QuoteRequest
  updateQuoteStatus: (quoteId: string, status: OrderStatus) => void
  deleteQuote: (quoteId: string) => void

  // Product actions
  addProduct: (product: Omit<Product, 'id'>) => Product
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // Customer actions
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'tier'>) => void

  // Reset
  resetToDefaults: () => void
  clearAll: () => void
}

// ─── Initial Real Seed Data ──────────────────────────────────────────────────
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-112',
    customerName: 'Riya Singh',
    customerEmail: 'riya@razorpay.com',
    customerCompany: 'Razorpay',
    customerPhone: '+91 98765 43210',
    shippingAddress: 'SJR Cyber LGF, Hosur Road, Koramangala, Bengaluru, KA 560095',
    items: [
      {
        productId: 'p-031',
        name: 'Executive Leadership Onboarding Kit',
        brand: 'Curio Prestige',
        price: 5499,
        quantity: 25,
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 137475,
    gst: 24745,
    total: 162220,
    status: 'Processing',
    createdAt: '2026-10-11T10:30:00Z',
    paymentMethod: 'Corporate Net Banking',
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-111',
    customerName: 'Arjun Mehra',
    customerEmail: 'arjun@swiggy.in',
    customerCompany: 'Swiggy',
    customerPhone: '+91 91234 56789',
    shippingAddress: 'Tower D, Embassy TechVillage, Devarabisanahalli, Bengaluru, KA 560103',
    items: [
      {
        productId: 'p-001',
        name: 'Insulated Flask 750ml',
        brand: 'Stanley',
        price: 1899,
        quantity: 80,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 151920,
    gst: 27345,
    total: 179265,
    status: 'Shipped',
    createdAt: '2026-10-09T14:15:00Z',
    paymentMethod: 'Purchase Order / Invoice (30 Days)',
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-2026-110',
    customerName: 'Priya Nair',
    customerEmail: 'priya@cred.club',
    customerCompany: 'CRED',
    customerPhone: '+91 99887 76655',
    shippingAddress: '12th Floor, Indiqube Gamma, Outer Ring Road, Bengaluru, KA 560103',
    items: [
      {
        productId: 'p-006',
        name: 'Classic Hardcover Ruled Notebook',
        brand: 'Moleskine',
        price: 999,
        quantity: 60,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
      },
      {
        productId: 'p-007',
        name: 'Sonnet Matte Black Rollerball Pen',
        brand: 'Parker',
        price: 1850,
        quantity: 60,
        image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 170940,
    gst: 30769,
    total: 201709,
    status: 'Delivered',
    createdAt: '2026-10-06T09:00:00Z',
    paymentMethod: 'Corporate Credit Card',
  },
  {
    id: 'ord-104',
    orderNumber: 'ORD-2026-109',
    customerName: 'Siddharth K',
    customerEmail: 'sid@zepto.com',
    customerCompany: 'Zepto',
    customerPhone: '+91 90123 45678',
    shippingAddress: 'WeWork Galaxy, 43 Residency Road, Shanthala Nagar, Bengaluru, KA 560025',
    items: [
      {
        productId: 'p-017',
        name: 'Steens Mountain Microfleece Jacket',
        brand: 'Columbia',
        price: 2499,
        quantity: 40,
        image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 99960,
    gst: 17992,
    total: 117952,
    status: 'Delivered',
    createdAt: '2026-10-03T16:45:00Z',
    paymentMethod: 'UPI AutoPay',
  },
  {
    id: 'ord-105',
    orderNumber: 'ORD-2026-108',
    customerName: 'Meera Joshi',
    customerEmail: 'meera@freshworks.com',
    customerCompany: 'Freshworks',
    customerPhone: '+91 97654 32109',
    shippingAddress: 'Global Infocity Park, 40 MGR Salai, Perungudi, Chennai, TN 600096',
    items: [
      {
        productId: 'p-022',
        name: 'Harlem Padded Laptop Backpack 25L',
        brand: 'American Tourister',
        price: 1899,
        quantity: 30,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 56970,
    gst: 10254,
    total: 67224,
    status: 'Cancelled',
    createdAt: '2026-10-01T11:20:00Z',
    paymentMethod: 'Corporate Net Banking',
  },
]

const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'qt-201',
    quoteNumber: 'QT-2026-501',
    companyName: 'Deloitte India',
    gstin: '29AABCD1234E1Z5',
    industry: 'Consulting & Professional Services',
    contactName: 'Neha Gupta',
    email: 'neha.gupta@deloitte.com',
    phone: '+91 98451 23456',
    selectedProducts: [
      { id: 'p-031', name: 'Executive Leadership Onboarding Kit', brand: 'Curio Prestige' },
      { id: 'p-011', name: 'PowerCore Mag-Safe Power Bank 10000mAh', brand: 'Anker' },
    ],
    totalUnits: 150,
    deliveryDate: '2026-11-15',
    brandingType: 'Laser Engraving',
    artworkReady: 'Yes, vector SVG/AI available',
    notes: 'Q4 Campus onboarding batch. Individual names engraved on power bank.',
    status: 'Processing',
    estimatedTotal: 825000,
    createdAt: '2026-10-12T08:15:00Z',
  },
  {
    id: 'qt-202',
    quoteNumber: 'QT-2026-500',
    companyName: 'Goldman Sachs Services',
    gstin: '29AABCG9876F1Z2',
    industry: 'BFSI (Banking, Finance, Insurance)',
    contactName: 'Rohan Das',
    email: 'rohan.das@gs.com',
    phone: '+91 99001 87654',
    selectedProducts: [
      { id: 'p-030', name: 'Meisterstück Full-Grain Leather Card Pocket', brand: 'Montblanc' },
      { id: 'p-008', name: 'Classic Century Medalist Ballpoint Pen', brand: 'Cross' },
    ],
    totalUnits: 50,
    deliveryDate: '2026-11-01',
    brandingType: 'Debossing / Embossing',
    artworkReady: 'Yes, logo ready',
    notes: 'Managing Director annual recognition awards.',
    status: 'Processing',
    estimatedTotal: 785000,
    createdAt: '2026-10-10T12:00:00Z',
  },
  {
    id: 'qt-203',
    quoteNumber: 'QT-2026-499',
    companyName: 'Ernst & Young LLP',
    gstin: '07AAACE0123P1Z9',
    industry: 'Consulting & Professional Services',
    contactName: 'Ananya Sen',
    email: 'ananya.sen@ey.com',
    phone: '+91 98112 34567',
    selectedProducts: [
      { id: 'p-034', name: 'Royal Ayurvedic Soundarya Spa Hamper', brand: 'Forest Essentials' },
      { id: 'p-035', name: 'Artisan Arabica Roast & Truffle Crate', brand: 'Curio Gourmet' },
    ],
    totalUnits: 300,
    deliveryDate: '2026-10-28',
    brandingType: 'Digital Print',
    artworkReady: 'Yes, custom gift sleeve ready',
    notes: 'Diwali client appreciation gift hampers. Multi-city doorstep dispatch.',
    status: 'Shipped',
    estimatedTotal: 1485000,
    createdAt: '2026-10-05T15:30:00Z',
  },
  {
    id: 'qt-204',
    quoteNumber: 'QT-2026-498',
    companyName: 'Accenture Solutions',
    gstin: '29AAACA2345K1Z1',
    industry: 'Technology & IT',
    contactName: 'Karan Mehta',
    email: 'karan.mehta@accenture.com',
    phone: '+91 97410 98765',
    selectedProducts: [
      { id: 'p-023', name: 'GuardIT 2.0 Business Laptop Backpack', brand: 'Samsonite' },
      { id: 'p-001', name: 'Insulated Flask 750ml', brand: 'Stanley' },
    ],
    totalUnits: 200,
    deliveryDate: '2026-10-20',
    brandingType: 'Screen Printing',
    artworkReady: 'Yes',
    notes: 'Annual leadership summit delegate welcome gifts.',
    status: 'Delivered',
    estimatedTotal: 1179600,
    createdAt: '2026-09-28T11:45:00Z',
  },
]

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'C-001', name: 'Riya Singh', email: 'riya@razorpay.com', company: 'Razorpay', phone: '+91 98765 43210', createdAt: '2026-08-15', tier: 'Gold' },
  { id: 'C-002', name: 'Arjun Mehra', email: 'arjun@swiggy.in', company: 'Swiggy', phone: '+91 91234 56789', createdAt: '2026-07-20', tier: 'Platinum' },
  { id: 'C-003', name: 'Priya Nair', email: 'priya@cred.club', company: 'CRED', phone: '+91 99887 76655', createdAt: '2026-09-01', tier: 'Gold' },
  { id: 'C-004', name: 'Siddharth K', email: 'sid@zepto.com', company: 'Zepto', phone: '+91 90123 45678', createdAt: '2026-08-10', tier: 'Silver' },
  { id: 'C-005', name: 'Meera Joshi', email: 'meera@freshworks.com', company: 'Freshworks', phone: '+91 97654 32109', createdAt: '2026-06-12', tier: 'Gold' },
  { id: 'C-006', name: 'Vikram Patel', email: 'vikram@hdfcbank.com', company: 'HDFC Bank', phone: '+91 92345 67890', createdAt: '2026-05-18', tier: 'Platinum' },
]

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,
      quotes: INITIAL_QUOTES,
      products: PRODUCTS,
      customers: INITIAL_CUSTOMERS,

      // ─── Orders ────────────────────────────────────────────────────────────
      createOrder: (orderData) => {
        const id = `ord-${Date.now()}`
        const randSuffix = Math.floor(100 + Math.random() * 900)
        const orderNumber = `ORD-2026-${randSuffix}`
        const newOrder: Order = {
          ...orderData,
          id,
          orderNumber,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))

        // Register or update customer
        get().addCustomer({
          name: orderData.customerName,
          email: orderData.customerEmail,
          company: orderData.customerCompany,
          phone: orderData.customerPhone || 'Not provided',
        })

        return newOrder
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o,
          ),
        }))
      },

      deleteOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== orderId && o.orderNumber !== orderId),
        }))
      },

      // ─── Quotes ────────────────────────────────────────────────────────────
      createQuote: (quoteData) => {
        const id = `qt-${Date.now()}`
        const randSuffix = Math.floor(500 + Math.random() * 500)
        const quoteNumber = `QT-2026-${randSuffix}`
        const newQuote: QuoteRequest = {
          ...quoteData,
          id,
          quoteNumber,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          quotes: [newQuote, ...state.quotes],
        }))

        // Register customer from quote
        get().addCustomer({
          name: quoteData.contactName,
          email: quoteData.email,
          company: quoteData.companyName,
          phone: quoteData.phone,
        })

        return newQuote
      },

      updateQuoteStatus: (quoteId, status) => {
        set((state) => ({
          quotes: state.quotes.map((q) =>
            q.id === quoteId || q.quoteNumber === quoteId ? { ...q, status } : q,
          ),
        }))
      },

      deleteQuote: (quoteId) => {
        set((state) => ({
          quotes: state.quotes.filter((q) => q.id !== quoteId && q.quoteNumber !== quoteId),
        }))
      },

      // ─── Products ──────────────────────────────────────────────────────────
      addProduct: (prodData) => {
        const id = `p-${Date.now().toString().slice(-4)}`
        const newProd: Product = { ...prodData, id }
        set((state) => ({
          products: [newProd, ...state.products],
        }))
        return newProd
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },

      // ─── Customers ─────────────────────────────────────────────────────────
      addCustomer: (customerData) => {
        set((state) => {
          const existing = state.customers.find(
            (c) => c.email.toLowerCase() === customerData.email.toLowerCase(),
          )
          if (existing) {
            return {
              customers: state.customers.map((c) =>
                c.id === existing.id
                  ? {
                      ...c,
                      name: customerData.name || c.name,
                      company: customerData.company || c.company,
                      phone: customerData.phone || c.phone,
                    }
                  : c,
              ),
            }
          }
          const id = `C-${(state.customers.length + 1).toString().padStart(3, '0')}`
          const newCustomer: Customer = {
            ...customerData,
            id,
            createdAt: new Date().toISOString().slice(0, 10),
            tier: 'Silver',
          }
          return { customers: [newCustomer, ...state.customers] }
        })
      },

      // ─── Reset ─────────────────────────────────────────────────────────────
      resetToDefaults: () => {
        set({
          orders: INITIAL_ORDERS,
          quotes: INITIAL_QUOTES,
          products: PRODUCTS,
          customers: INITIAL_CUSTOMERS,
        })
      },

      clearAll: () => {
        set({
          orders: [],
          quotes: [],
          customers: [],
        })
      },
    }),
    {
      name: 'curio-admin-live-data',
    },
  ),
)
