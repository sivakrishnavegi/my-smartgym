import { create } from 'zustand'

type User = {
  id: string
  email: string
  role: 'user' | 'admin' | 'trainer'
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) =>
    set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}))
