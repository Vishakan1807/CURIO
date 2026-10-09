export interface ProductVariant {
  id: string
  color: string
  colorCode: string
  stock: number
}

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string
  price: number
  originalPrice?: number
  minQty: number
  rating: number
  reviews: number
  badge?: string
  images: string[]
  variants?: ProductVariant[]
  customizable: boolean
  features: string[]
  specifications: Record<string, string>
}

export type Category = 
  | 'Drinkware' 
  | 'Technology' 
  | 'Bags & Travel' 
  | 'Stationery' 
  | 'Apparel' 
  | 'Gift Hampers' 
  | 'Eco-Friendly' 
  | 'Executive'
