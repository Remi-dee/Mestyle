import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauthLogic } from "../../shared/baseQueryWithReauth";

export const stylesApi = createApi({
  reducerPath: "stylesApi",
  baseQuery: baseQueryWithReauthLogic,
  //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }), // Replace with your backend base URL
  endpoints: (builder) => ({
    getRandomStyles: builder.query({
      query: () => "/styles/random",
    }),
    createStyle: builder.mutation({
      query: (newStyle) => ({
        url: "/styles/create",
        method: "POST",
        body: newStyle,
      }),
    }),
  }),
});

export const { useGetRandomStylesQuery, useCreateStyleMutation } = stylesApi;
