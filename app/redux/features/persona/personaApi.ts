// features/persona/personaApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import {
  baseQueryWithReauth,
  baseQueryWithReauthLogic,
} from "../../shared/baseQueryWithReauth";
import { PersonaDataType } from "./personaSlice";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const personaApi = createApi({
  reducerPath: "personaApi",
  baseQuery: baseQueryWithReauthLogic,
  tagTypes: ["Personas"],
  endpoints: (builder) => ({
    // Get all personas for the current user
    getPersonas: builder.query<any[], void>({
      query: () => "/personas",
      providesTags: ["Personas"],
    }),

    // Get a specific persona by ID
    getPersonaById: builder.query<any, string>({
      query: (id) => `/personas/${id}`,
      providesTags: (result, error, id) => [{ type: "Personas", id }],
    }),

    // Create a new persona
    createPersona: builder.mutation<any, Partial<PersonaDataType>>({
      query: (formData) => ({
        url: "/personas",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Personas"],
    }),

    // Update an existing persona
    updatePersona: builder.mutation<
      any,
      { id: string; personaData: Partial<PersonaDataType> }
    >({
      query: ({ id, personaData }) => ({
        url: `/personas/${id}`,
        method: "PATCH",
        body: personaData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Personas", id },
        "Personas",
      ],
    }),

    // Delete a persona
    deletePersona: builder.mutation<any, string>({
      query: (id) => ({
        url: `/personas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Personas"],
    }),

    // Set a persona as active
    activatePersona: builder.mutation<any, string>({
      query: (id) => ({
        url: `/personas/${id}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Personas"],
    }),

    // Legacy endpoint (keep for backward compatibility)
    submitStyle: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/style",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetPersonasQuery,
  useGetPersonaByIdQuery,
  useCreatePersonaMutation,
  useUpdatePersonaMutation,
  useDeletePersonaMutation,
  useActivatePersonaMutation,
  useSubmitStyleMutation,
} = personaApi;
