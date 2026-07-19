"use client";

import { useGetFeedQuery } from "@/app/redux/features/styleContent/styleApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import NavBar from "../components/landingPage/NavBar/NavBar";
import waterMark from "@/public/icons/waterMark.png";
import Header from "../components/dashboard/header";
import StyleGrid from "../components/dashboard/dasboardStyleGrid";
import { useRouter } from "next/navigation";

import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../composables/dashboard/errorHandler";
const DashboardPage = () => {
  const { data, error, isLoading, isError } = useGetFeedQuery({});
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Redirect to sign-in if there's an authentication error
  useEffect(() => {
    if (isError && isFetchBaseQueryError(error) && error.status === 401) {
      alert("Session expired. Please sign in again.");
      router.push("/?view=signIn");
    }
  }, [isError, error, router]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-grayDark flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-burgundy-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/80 font-lexend">
            Loading your style inspiration...
          </p>
        </div>
      </div>
    );

  if (isError) {
    if (isFetchBaseQueryError(error)) {
      const errorMessage = isErrorWithMessage(error.data)
        ? error.data.message
        : "Unknown error";
      return (
        <div className="min-h-screen bg-grayDark flex items-center justify-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md text-center">
            <h3 className="text-red-400 text-lg font-semibold mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-white/80">{errorMessage}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-grayDark flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md text-center">
          <h3 className="text-red-400 text-lg font-semibold mb-2">
            Unexpected Error
          </h3>
          <p className="text-white/80">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-grayDark font-lexend">
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavBar isProfile={true} />
        <Header query={query} setQuery={setQuery} />
        <div className="py-8">
          <StyleGrid query={query} />
        </div>
        <div className="pointer-events-none">
          <Image
            src={waterMark}
            alt="Mestyle watermark"
            width={200}
            height={100}
            className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-10"
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
