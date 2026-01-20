import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
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
          // Simulate API call
          await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email.includes('error')) {
                    reject(new Error('Invalid credentials'));
                } else {
                    resolve(true);
                }
            }, 1500)
          });

          set({
            user: { id: '1', name: 'Demo User', email, role: 'user' },
            isAuthenticated: true,
            isLoading: false
          });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
          throw err;
        }
      },
      logout: () => {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem('auth-storage');
      },
      setError: (error) => set({ error }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
