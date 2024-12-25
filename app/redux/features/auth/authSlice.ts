

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string } | null;
  access_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  access_token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: { email: string }; access_token: string }>) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
