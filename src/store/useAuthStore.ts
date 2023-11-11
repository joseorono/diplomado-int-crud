import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean
  grantAuthentication: (token:string) => void
  revokeAuthentication: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      grantAuthentication: (token:string) => {
        localStorage.setItem('AUTH_TOKEN', token);
        set({ isAuthenticated: true })
      },
      revokeAuthentication: () => set(() => {
        localStorage.removeItem('AUTH_TOKEN')
        return { isAuthenticated: false }
      }),
    }),
    { name: 'auth-store' }
  )
);