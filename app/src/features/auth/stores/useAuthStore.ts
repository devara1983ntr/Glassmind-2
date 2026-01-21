import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@shared/api/storage/services';
import { User } from '@shared/api/storage/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.login(email);
          set({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
          throw err;
        }
      },
      logout: async () => {
          set({ isLoading: true });
          await authService.logout();
          set({ user: null, isAuthenticated: false, isLoading: false });
          localStorage.removeItem('auth-storage');
      },
      checkAuth: async () => {
          // This can be called on app mount to verify session validity if needed
          // For now, reliance on persist + authService token check is enough
          const user = await authService.getCurrentUser();
          if (user) {
              set({ user, isAuthenticated: true });
          } else {
              set({ user: null, isAuthenticated: false });
          }
      },
      setError: (error) => set({ error }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
