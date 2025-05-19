import type { UserAuthInfo } from '@types';

export interface AuthState {
   token: string | null;
   user: UserAuthInfo | null;
   isAuthenticated: boolean;
   isInitialized: boolean;
   isLoading: boolean;
}

export interface AuthActions {
   login: (user: UserAuthInfo) => void;
   logout: () => void;
   setInitialized: (initialized: boolean) => void;
   setLoading: (loading: boolean) => void;
   setToken: (token: string | null) => void;
   setUser: (user: UserAuthInfo | null) => void;
}

export type AuthStore = AuthState & AuthActions;
