import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, ProductVariant } from '@/types/product'

export interface CartItem {
  id: string
  productId: string
  product: Product
  variant?: ProductVariant
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  setIsOpen: (isOpen: boolean) => void
  addItem: (product: Product, quantity: number, variant?: ProductVariant) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // Computed (these will be functions that return derived data)
  getTotalItems: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      setIsOpen: (isOpen) => set({ isOpen }),

      addItem: (product, quantity, variant) => {
        set((state) => {
          // Create a unique ID based on product and variant
          const itemId = variant ? `${product.id}-${variant.id}` : product.id
          
          const existingItemIndex = state.items.findIndex(item => item.id === itemId)
          
          if (existingItemIndex >= 0) {
            // Update existing item
            const newItems = [...state.items]
            const existingItem = newItems[existingItemIndex]
            
            // Check inventory (using variant stock if available, otherwise just arbitrary large number for now)
            const maxStock = variant ? variant.stock : 9999
            const newQuantity = Math.min(existingItem.quantity + quantity, maxStock)
            
            newItems[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity
            }
            
            return { items: newItems, isOpen: true }
          }
          
          // Add new item
          return {
            items: [
              ...state.items,
              {
                id: itemId,
                productId: product.id,
                product,
                variant,
                quantity
              }
            ],
            isOpen: true // Auto-open cart when item added
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          const newItems = state.items.map(item => {
            if (item.id === id) {
              const maxStock = item.variant ? item.variant.stock : 9999
              // Ensure we respect minQty and maxStock
              const validQuantity = Math.max(item.product.minQty, Math.min(quantity, maxStock))
              return { ...item, quantity: validQuantity }
            }
            return item
          })
          return { items: newItems }
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.length
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      }
    }),
    {
      name: 'curio-cart',
      partialize: (state) => ({ items: state.items }) // Only persist items, not UI state (isOpen)
    }
  )
)
