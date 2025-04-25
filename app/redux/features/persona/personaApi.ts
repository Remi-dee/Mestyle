// features/persona/personaApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauthLogic } from "../../shared/baseQueryWithReauth";

export const personaApi = createApi({
  reducerPath: "personaApi",
  baseQuery: baseQueryWithReauthLogic,
  endpoints: (builder) => ({
    submitStyle: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/style",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitStyleMutation } = personaApi;
