import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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

// Clean up any legacy persistent localStorage session if present
try {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('curio-auth')
  }
} catch {
  // Ignore in non-browser env
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, _password, name, company) => {
        await new Promise(resolve => setTimeout(resolve, 400))
        set({
          isAuthenticated: true,
          user: {
            name: name ?? (email.includes('admin') ? 'Admin User' : email.split('@')[0]),
            email,
            company: company ?? (email.includes('admin') ? 'Curio Management' : 'Enterprise Client'),
            role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
          },
        })
      },

      signup: async (name, email, _password, company) => {
        await new Promise(resolve => setTimeout(resolve, 400))
        set({
          isAuthenticated: true,
          user: {
            name,
            email,
            company: company ?? 'Enterprise Client',
            role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
          },
        })
      },

      logout: () => {
        set({ isAuthenticated: false, user: null })
        try {
          sessionStorage.removeItem('curio-auth')
        } catch {}
      },
    }),
    {
      name: 'curio-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)

