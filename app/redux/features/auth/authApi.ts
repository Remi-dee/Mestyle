"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { baseQueryWithReauthLogic } from "../../shared/baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauthLogic,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:4000/",
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as RootState).auth.access_token;
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }), // Update to match your backend's base URL
  endpoints: (builder) => ({
    register: builder.mutation<
      { access_token: string; user: { email: string } },
      { username: string; email: string; password: string }
    >({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<
      { access_token: string; user: any },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include", // Include cookies for refresh token handling
      }),
      transformResponse: (response: any) => {
        // Extract only the accessToken and user data
        return {
          access_token: response.data.accessToken,
          user: response.data.user,
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
