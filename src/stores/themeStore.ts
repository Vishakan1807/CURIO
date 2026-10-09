import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'atelier' | 'obsidian' | 'studio'

export interface ThemeConfig {
  id: Theme
  name: string
  label: string
  description: string
  gemColor: string
  gemGlow: string
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'atelier',
    name: 'Atelier',
    label: 'Warm & Refined',
    description: 'Warm ivory surfaces with deep forest-green accents',
    gemColor: '#C9A96E',
    gemGlow: 'rgba(201, 169, 110, 0.4)',
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    label: 'Dark & Executive',
    description: 'Charcoal surfaces with champagne gold accents',
    gemColor: '#4A4A4A',
    gemGlow: 'rgba(201, 169, 110, 0.35)',
  },
  {
    id: 'studio',
    name: 'Studio',
    label: 'Fresh & Creative',
    description: 'Cool whites with misty blue-violet accents',
    gemColor: '#5B6EF5',
    gemGlow: 'rgba(91, 110, 245, 0.4)',
  },
]

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'atelier',
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
    }),
    {
      name: 'curio-theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme synchronously on rehydration to prevent flash
        if (state?.theme) {
          applyTheme(state.theme)
        } else {
          applyTheme('atelier')
        }
      },
    },
  ),
)

// Initialize theme immediately (before React hydrates) to prevent flash
const stored = localStorage.getItem('curio-theme')
if (stored) {
  try {
    const parsed = JSON.parse(stored) as { state?: { theme?: Theme } }
    const t = parsed?.state?.theme
    if (t && ['atelier', 'obsidian', 'studio'].includes(t)) {
      applyTheme(t)
    } else {
      applyTheme('atelier')
    }
  } catch {
    applyTheme('atelier')
  }
} else {
  applyTheme('atelier')
}
