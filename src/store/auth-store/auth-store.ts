import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { AuthStore } from './auth-store.type';

const createAuthStore = immer<AuthStore>((set) => ({
   user: null,
   isAuthenticated: false,
   isInitialized: false,
   isLoading: true,

   setUser: (user) => set({ user }),

   login: () =>
      set((state) => {
         state.isAuthenticated = true;
      }),

   logout: () =>
      set((state) => {
         state.user = null;
         state.isAuthenticated = false;
      }),

   setInitialized: (initialized) =>
      set((state) => {
         state.isInitialized = initialized;
      }),

   setLoading: (loading) =>
      set((state) => {
         state.isLoading = loading;
      }),
}));

const useAuthStore = create(createAuthStore);

export { useAuthStore };
