import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { baseQueryWithReauthLogic } from "../../shared/baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauthLogic,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // base URL
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as RootState).auth.access_token;
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "users",
    }),
    getUserStyles: builder.query({
      query: () => "users/profile/styles",
    }),
    updateUserProfile: builder.mutation({
      query: (profile) => ({
        url: "users/profile",
        method: "PATCH",
        body: profile,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/user/profile",
    }),
    getUserById: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    getAllUsers: builder.query({
      query: () => "users",
    }),
    getUserPreferences: builder.query({
      query: () => "users/preferences",
    }),
    updatePreferences: builder.mutation({
      query: (preferences) => ({
        url: "users/preferences",
        method: "PATCH",
        body: preferences,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useGetUserPreferencesQuery,
  useUpdatePreferencesMutation,
  useGetUserStylesQuery,
  useUpdateUserProfileMutation,
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
} = userApi;
