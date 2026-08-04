import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearCredentials } from "../features/auth/authSlice";

// Auth travels in httpOnly cookies now — `credentials: "include"` sends them.
// No token is read from JS/localStorage.
export const baseQueryWithReauth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
});

export const baseQueryWithReauthLogic: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithReauth(args, api, extraOptions);

  // Guard rejects with 403 (or 401) when the access cookie is missing/expired.
  const status = result.error?.status;
  if (status === 401 || status === 403) {
    // Try to mint a new access cookie from the refresh cookie.
    const refreshResult = await baseQueryWithReauth(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // Refresh set a fresh access cookie — retry the original request.
      result = await baseQueryWithReauth(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
