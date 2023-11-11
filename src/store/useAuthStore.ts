import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean
  grantAuthentication: () => void
  revokeAuthentication: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      grantAuthentication: () => set({ isAuthenticated: true }),
      revokeAuthentication: () => set(() => {
        localStorage.removeItem('AUTH_TOKEN')
        return { isAuthenticated: false }
      }),
    }),
    { name: 'auth-store' }
  )
);

export default useAuthStore;