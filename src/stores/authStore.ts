import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  name: string
  email: string
  company?: string
  role: 'customer' | 'admin'
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, _password: string, name?: string, company?: string) => Promise<void>
  signup: (name: string, email: string, _password: string, company?: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, _password, name, company) => {
        // Dummy auth — replace with Firebase Auth in Milestone 4
        await new Promise(resolve => setTimeout(resolve, 800))
        set({
          isAuthenticated: true,
          user: {
            name: name ?? email.split('@')[0],
            email,
            company,
            role: email.includes('admin') ? 'admin' : 'customer',
          },
        })
      },

      signup: async (name, email, _password, company) => {
        // Dummy auth — replace with Firebase Auth in Milestone 4
        await new Promise(resolve => setTimeout(resolve, 900))
        set({
          isAuthenticated: true,
          user: { name, email, company, role: 'customer' },
        })
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
      },
    }),
    {
      name: 'curio-auth',
      // Only persist the user object — re-derive isAuthenticated from it
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
