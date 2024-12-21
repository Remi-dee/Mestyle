import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Update to match your backend's base URL
  endpoints: (builder) => ({
    register: builder.mutation<
      { accessToken: string; user: { email: string } },
      { username: string; email: string; password: string }
    >({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include", // Include cookies for refresh token handling
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
