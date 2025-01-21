import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { clearCredentials, setCredentials } from "../features/auth/authSlice";
interface RefreshResponse {
  access_token: string;
  user: any; // Replace `any` with your user type if available
}

export const baseQueryWithReauth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include", // Include cookies for refresh token
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    console.log("out token is", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauthLogic = async (args, api, extraOptions) => {
  let result = await baseQueryWithReauth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQueryWithReauth(
      { url: "/auth/refresh", method: "GET" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { access_token, user } = refreshResult.data as RefreshResponse;
      console.log("out token is 2", access_token);
      localStorage.setItem("access_token", access_token);
      // Update access token in state
      api.dispatch(
        setCredentials({
          access_token,
          user,
        })
      );

      // Retry the original request
      result = await baseQueryWithReauth(args, api, extraOptions);
    } else {
      // Clear credentials if refresh fails
      localStorage.removeItem("access_token");
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
