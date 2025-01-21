import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError =>
  typeof error === "object" && error != null && "status" in error;
// Type guard to check if error.data has a message
export const isErrorWithMessage = (
  data: unknown
): data is { message: string } => {
  return (
    typeof data === "object" &&
    data != null &&
    "message" in data &&
    typeof (data as { message: string }).message === "string"
  );
};
