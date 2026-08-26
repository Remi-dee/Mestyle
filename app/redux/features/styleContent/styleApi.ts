import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  baseQueryWithReauthLogic,
} from "../../shared/baseQueryWithReauth";

interface Style {
  title: string;
  description: string;
  altText: string;
  occasions: string[];
  season: string;
  categories: string[];
  tags: string[];
  priceRange: string;
  imageUrl: string;
  additionalImages: string[];
  createdAt: string;
  persona: string;
}

export const stylesApi = createApi({
  reducerPath: "stylesApi",
  baseQuery: baseQueryWithReauthLogic,
  //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }), // Replace with your backend base URL
  endpoints: (builder) => ({
    getRandomStyles: builder.query({
      query: () => "/styles/random",
    }),
    getFeed: builder.query({
      query: (params: { limit?: number; page?: number } = {}) => {
        const search = new URLSearchParams();
        if (params.limit) search.set("limit", String(params.limit));
        if (params.page) search.set("page", String(params.page));
        const qs = search.toString();
        return `/styles/feed${qs ? `?${qs}` : ""}`;
      },
    }),
    createStyle: builder.mutation<Style, FormData>({
      query: (formData) => ({
        url: "/styles/create",
        method: "POST",
        body: formData,
        formData: true,
        // Don't set Content-Type header, let the browser set it with the boundary
        headers: {
          // Remove Content-Type to let the browser set it with boundary
          "Content-Type": undefined,
        },
      }),
    }),
    getStyleById: builder.query({
      query: (id: string) => `/styles/detail/${id}`,
    }),
    getMyStyles: builder.query({
      query: () => "/styles/mine",
    }),
  }),
});

export const {
  useGetRandomStylesQuery,
  useGetFeedQuery,
  useCreateStyleMutation,
  useGetStyleByIdQuery,
  useGetMyStylesQuery,
} = stylesApi;
