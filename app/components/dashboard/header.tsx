"use client";
import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Filter from "@/public/icons/filter.svg";
import { useGetCurrentUserQuery } from "@/app/redux/features/user/user.api";
import { useGetFeedQuery } from "@/app/redux/features/styleContent/styleApi";
import { useRouter } from "next/navigation";
import StylePersonaModal from "./StylePersonaModal";
import StyleSearch from "../search/StyleSearch";

interface HeaderProps {
  query?: string;
  setQuery?: (value: string) => void;
}

function Header({ query = "", setQuery = () => {} }: HeaderProps): JSX.Element {
  const [isStylePersonaOpen, setIsStylePersonaOpen] = useState<boolean>(false);

  const {
    data: signedInProfile,
    isLoading: signedInLoading,
    error: signedInError,
  } = useGetCurrentUserQuery({});
  const { data: feedData } = useGetFeedQuery({});
  const items = useMemo(() => (feedData?.items ?? []) as any[], [feedData]);

  const router = useRouter();

  if (signedInLoading) {
    return <h1 className="text-4xl font-medium leading-tight">Loading...</h1>;
  }
  if (signedInError) {
    return <h1 className="text-4xl font-medium leading-tight">Unable to fetch profile</h1>;
  }

  return (
    <>
      {isStylePersonaOpen && (
        <StylePersonaModal onClose={() => setIsStylePersonaOpen(false)} isOpen={isStylePersonaOpen} />
      )}

      <header className="flex flex-col space-y-4 sm:space-y-6 mb-6 sm:mb-8 mt-[60px] sm:mt-[80px] px-4 sm:px-0">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
              Good {getGreeting()}, {signedInProfile?.username || "User"}
            </h1>
            <p className="text-white/60 text-sm">Discover and save your favorite fashion inspiration</p>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 justify-between lg:justify-start">
            <button
              className="p-2 sm:p-3 text-white bg-black/20 hover:bg-black/30 rounded-[20px] border border-zinc-600 transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base"
              onClick={() => setIsStylePersonaOpen(true)}
              aria-label="Open style persona filter"
            >
              <Image src={Filter} alt="Filter" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button
              className="px-4 sm:px-6 py-2 sm:py-3 text-white bg-burgundy-600 hover:bg-burgundy-700 rounded-[20px] transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base"
              onClick={() => router.push("/creator")}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Style</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <StyleSearch
          items={items}
          query={query}
          setQuery={setQuery}
          placeholder="Search your looks by occasion, colour, or creator..."
        />
      </header>
    </>
  );
}

// Helper function to get greeting based on time of day
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

export default Header;
