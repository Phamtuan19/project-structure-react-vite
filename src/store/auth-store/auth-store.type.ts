import type { UserAuthInfo } from '@types';

export interface AuthState {
   user: UserAuthInfo | null;
   isAuthenticated: boolean;
   isInitialized: boolean;
   isLoading: boolean;
}

export interface AuthActions {
   login: () => void;
   logout: () => void;
   setInitialized: (initialized: boolean) => void;
   setLoading: (loading: boolean) => void;
   setUser: (user: UserAuthInfo | null) => void;
}

export type AuthStore = AuthState & AuthActions;
