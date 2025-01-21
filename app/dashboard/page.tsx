"use client";

import { useGetRandomStylesQuery } from "@/app/redux/features/styleContent/styleApi";
import Image from "next/image";
import React, { useEffect } from "react";

import NavBar from "../components/landingPage/NavBar/NavBar";
import waterMark from "@/public/icons/waterMark.png";
import Header from "../components/dashboard/header";
import StyleGrid from "../components/dashboard/dasboardStyleGrid";
import { useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../composables/dashboard/errorHandler";
const DashboardPage = () => {
  const { data, error, isLoading, isError } = useGetRandomStylesQuery({});
  const router = useRouter();

  // Redirect to sign-in if there's an authentication error
  useEffect(() => {
    if (isError && isFetchBaseQueryError(error) && error.status === 401) {
      alert("Session expired. Please sign in again.");
      router.push("/?view=signIn");
    }
  }, [isError, error, router]);

  if (isLoading) return <div>Loading styles...</div>;

  if (isError) {
    if (isFetchBaseQueryError(error)) {
      // Safely check for message in error.data
      const errorMessage = isErrorWithMessage(error.data)
        ? error.data.message
        : "Unknown error";
      return <div>Error loading styles: {errorMessage}</div>;
    }
    // Handle other types of errors (e.g., SerializedError)
    return <div>An unexpected error occurred.</div>;
  }

  return (
    <main className=" bg-grayDark font-lexend flex justify-center ">
      <div className="relative max-w-screen-2xl">
        <NavBar isProfile={true} />
        <Header />
        <StyleGrid />
        <div>
          <Image
            src={waterMark}
            alt=""
            width={200}
            height={100}
            className="fixed  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
