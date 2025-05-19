import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { AuthStore } from './auth-store.type';

const createAuthStore = immer<AuthStore>((set) => ({
   token: null,
   user: null,
   isAuthenticated: false,
   isInitialized: false,
   isLoading: false,

   setToken: (token) => set({ token }),

   setUser: (user) => set({ user }),

   login: (user) =>
      set((state) => {
         state.user = user;
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

const isDev = import.meta.env.MODE === 'development';

const useAuthStore = create(
   persist(
      devtools(createAuthStore, {
         // Tên này dùng để hiển thị trong Zustand DevTools,
         // giúp bạn dễ dàng nhận biết store này khi debug
         name: 'AuthStore',
         enabled: isDev,
      }),
      {
         // Tên key dùng để lưu dữ liệu store vào sessionStorage,
         name: 'authStorage',
         // Khi mở sessionStorage trong trình duyệt, bạn sẽ thấy key này chứa dữ liệu của store
         storage: createJSONStorage(() => sessionStorage),

         onRehydrateStorage: () => (state) => {
            // state ở đây là toàn bộ state được load lại
            if (state) {
               // Ví dụ: kiểm tra nếu token hết hạn, logout tự động
               if (state.token) {
                  state.logout();
               }

               // Hoặc log ra thông tin đã rehydrate
               console.log('Store rehydrated:', state);
            }
         },
      },
   ),
);

export { useAuthStore };
