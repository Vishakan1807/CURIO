import type { Product } from '@/types/product'

export const PRODUCTS: Product[] = [
  {
    id: 'p-001',
    name: 'Insulated Flask 750ml',
    brand: 'boAt',
    category: 'Drinkware',
    description: 'Premium double-walled stainless steel flask that keeps beverages hot for 12 hours and cold for 24 hours. Perfect for corporate travel and desk use.',
    price: 1299,
    originalPrice: 1799,
    minQty: 25,
    rating: 4.7,
    reviews: 218,
    badge: 'Bestseller',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Double-wall vacuum insulation', 'Leak-proof lid', 'BPA free', '18/8 stainless steel'],
    specifications: {
      'Capacity': '750ml',
      'Material': 'Stainless Steel',
      'Weight': '350g',
      'Warranty': '1 Year'
    },
    variants: [
      { id: 'v-1', color: 'Matte Black', colorCode: '#1A1A1A', stock: 150 },
      { id: 'v-2', color: 'Olive Green', colorCode: '#4A5D23', stock: 85 },
      { id: 'v-3', color: 'Steel Grey', colorCode: '#7A7A7A', stock: 200 }
    ]
  },
  {
    id: 'p-002',
    name: 'Premium Notebook Set',
    brand: 'Moleskine',
    category: 'Stationery',
    description: 'Classic hard cover notebook with ruled pages, rounded corners, elastic closure and matching ribbon bookmark. An elegant canvas for ideas.',
    price: 899,
    minQty: 10,
    rating: 4.9,
    reviews: 144,
    badge: 'New',
    images: ['https://images.unsplash.com/photo-1531346878377-a541e4ab0e43?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Acid-free paper', 'Expandable inner pocket', 'Lays flat 180°', 'FSC-certified'],
    specifications: {
      'Pages': '192',
      'Size': '13 x 21 cm',
      'Paper Weight': '70 gsm',
      'Cover': 'Hardcover'
    },
    variants: [
      { id: 'v-4', color: 'Classic Black', colorCode: '#111111', stock: 300 },
      { id: 'v-5', color: 'Sapphire Blue', colorCode: '#0F52BA', stock: 120 }
    ]
  },
  {
    id: 'p-003',
    name: 'Wireless Power Bank 10000mAh',
    brand: 'Anker',
    category: 'Technology',
    description: 'Magnetic wireless portable charger with foldable stand. Snap on to charge on the go. Perfect for executive travel kits.',
    price: 2499,
    originalPrice: 3299,
    minQty: 15,
    rating: 4.6,
    reviews: 392,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Magnetic attachment', '20W USB-C output', 'Foldable stand', 'Multi-device charging'],
    specifications: {
      'Capacity': '10,000 mAh',
      'Ports': '1x USB-C, 1x Wireless',
      'Weight': '210g',
      'Input': 'USB-C (20W max)'
    }
  },
  {
    id: 'p-004',
    name: 'Executive Welcome Kit',
    brand: 'Curio',
    category: 'Executive',
    description: 'A thoughtfully curated welcome kit for leadership and executive roles. Includes premium tech accessories, luxury stationery, and drinkware.',
    price: 4999,
    originalPrice: 6499,
    minQty: 5,
    rating: 4.8,
    reviews: 87,
    badge: 'Curated',
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Premium unboxing experience', 'Magnetic closure box', 'Personalized welcome card', 'Laser-engraved branding'],
    specifications: {
      'Box Size': '35 x 25 x 10 cm',
      'Items': '4 Premium Products',
      'Branding': 'Screen print & Laser engraving',
      'Lead Time': '14-21 days'
    }
  },
  {
    id: 'p-005',
    name: 'Eco-Friendly Bamboo Tumbler',
    brand: 'Earth&Co',
    category: 'Eco-Friendly',
    description: 'Sustainable bamboo exterior with a stainless steel interior. Includes a tea infuser. The perfect eco-conscious corporate gift.',
    price: 949,
    minQty: 30,
    rating: 4.5,
    reviews: 112,
    images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Real bamboo exterior', 'Tea infuser included', 'Double-walled', 'Non-slip base'],
    specifications: {
      'Capacity': '450ml',
      'Material': 'Bamboo + Stainless Steel',
      'Care': 'Hand wash only',
      'Insulation': 'Up to 8 hours hot'
    }
  },
  {
    id: 'p-006',
    name: 'Canvas Laptop Backpack',
    brand: 'American Tourister',
    category: 'Bags & Travel',
    description: 'Durable canvas backpack with padded laptop compartment, water-resistant coating, and ergonomic shoulder straps.',
    price: 1899,
    originalPrice: 2499,
    minQty: 20,
    rating: 4.6,
    reviews: 340,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Water-resistant', 'Fits up to 15.6" laptops', 'Luggage strap', 'Multiple organizer pockets'],
    specifications: {
      'Material': 'Coated Canvas',
      'Dimensions': '45 x 30 x 15 cm',
      'Volume': '22L',
      'Weight': '750g'
    },
    variants: [
      { id: 'v-6', color: 'Navy Blue', colorCode: '#1A2942', stock: 120 },
      { id: 'v-7', color: 'Charcoal', colorCode: '#36454F', stock: 80 }
    ]
  },
  {
    id: 'p-007',
    name: 'Premium Rollerball Pen',
    brand: 'Parker',
    category: 'Stationery',
    description: 'Elegant rollerball pen with a matte black finish and gold trims. Delivers a smooth, consistent writing experience.',
    price: 749,
    minQty: 50,
    rating: 4.8,
    reviews: 512,
    badge: 'Classic',
    images: ['https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['Matte finish', 'Gold-plated trims', 'Quink flow technology', 'Gift box included'],
    specifications: {
      'Ink Color': 'Blue',
      'Type': 'Rollerball',
      'Body Material': 'Metal',
      'Refillable': 'Yes'
    }
  },
  {
    id: 'p-008',
    name: 'Corporate Fleece Jacket',
    brand: 'Columbia',
    category: 'Apparel',
    description: 'Warm, lightweight microfleece jacket perfect for chilly air-conditioned offices or winter offsites.',
    price: 2199,
    originalPrice: 2999,
    minQty: 15,
    rating: 4.7,
    reviews: 189,
    images: ['https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800'],
    customizable: true,
    features: ['100% polyester microfleece', 'Zippered hand pockets', 'Classic fit', 'Pill-resistant'],
    specifications: {
      'Material': 'Microfleece',
      'Fit': 'Regular',
      'Care': 'Machine washable',
      'Gender': 'Unisex'
    },
    variants: [
      { id: 'v-8', color: 'Black', colorCode: '#111111', stock: 100 },
      { id: 'v-9', color: 'Navy', colorCode: '#1A2942', stock: 150 }
    ]
  }
]
