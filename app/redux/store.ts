"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import personaReducer from "./features/persona/personaSlice";
import styleContentReducer from "./features/styleContent/styleContentSlice";
import { stylesApi } from "./features/styleContent/styleApi";
import { userApi } from "./features/user/user.api";
import { personaApi } from "./features/persona/personaApi";
import { useReducer } from "react";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [stylesApi.reducerPath]: stylesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [personaApi.reducerPath]: personaApi.reducer,
    persona: personaReducer,
    auth: authReducer,
    styleContent: styleContentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      stylesApi.middleware,
      userApi.middleware,
      personaApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
