import { createSlice } from '@reduxjs/toolkit';
import type { InitialState } from './auth-slice.type';

const initialState: InitialState = {
   user: null,
   isAuthentication: false,
   isInitialized: false,
   isLoading: false,
};

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
});
