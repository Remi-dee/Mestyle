import { useEffect, useState, useRef } from "react";

import Image from "next/image";
import Filter from "@/public/icons/filter.svg";
import Search from "@/public/icons/search.svg";
import { useGetCurrentUserQuery } from "@/app/redux/features/user/user.api";
import { useRouter } from "next/navigation";
import StylePersonaModal from "./StylePersonaModal";

function Header(): JSX.Element {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isStylePersonaOpen, setIsStylePersonaOpen] = useState<boolean>(false); // ✅ New State
  const searchRef = useRef<HTMLDivElement>(null);

  const {
    data: signedInProfile,
    isLoading: signedInLoading,
    error: signedInError,
  } = useGetCurrentUserQuery({});

  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (signedInProfile) {
      setUserProfile(signedInProfile);
    }
  }, [signedInProfile]);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (signedInLoading) {
    return <h1 className="text-4xl font-medium leading-tight">Loading...</h1>;
  }

  if (signedInError) {
    return (
      <h1 className="text-4xl font-medium leading-tight">
        Unable to fetch profile
      </h1>
    );
  }

  return (
    <>
      {/* 🔮 Glassmorphic Style Persona Modal */}
      {isStylePersonaOpen && (
        <StylePersonaModal
          onClose={() => setIsStylePersonaOpen(false)}
          isOpen={isStylePersonaOpen}
        />
      )}

      <header className="flex flex-col space-y-4 sm:space-y-6 mb-6 sm:mb-8 mt-[60px] sm:mt-[80px] px-4 sm:px-0">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
              Good {getGreeting()}, {signedInProfile?.username || "User"}
            </h1>
            <p className="text-white/60 text-sm">
              Discover and save your favorite fashion inspiration
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4 justify-between lg:justify-start">
            <button
              className="p-2 sm:p-3 text-white bg-black/20 hover:bg-black/30 rounded-[20px] border border-zinc-600 transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base"
              onClick={() => setIsStylePersonaOpen(true)}
              aria-label="Open style persona filter"
            >
              <Image
                src={Filter}
                alt="Filter"
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button
              className="px-4 sm:px-6 py-2 sm:py-3 text-white bg-burgundy-600 hover:bg-burgundy-700 rounded-[20px] transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base"
              onClick={() => router.push("/creator")}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create Style</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for styles, trends, or creators..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/20 border border-zinc-600 rounded-[20px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600/50 transition-all duration-200 text-sm sm:text-base"
              onFocus={() => setIsSearch(true)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={Search}
                alt="Search"
                className="w-4 h-4 sm:w-5 sm:h-5 opacity-60"
              />
            </div>
          </div>

          {/* Search Suggestions */}
          {isSearch && (
            <div className="absolute w-full mt-2 bg-black/90 border border-zinc-600 rounded-[20px] p-3 sm:p-4 shadow-xl z-50">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-white/60 text-xs sm:text-sm mb-2">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Summer Fashion",
                      "Street Style",
                      "Minimalist",
                      "Vintage",
                    ].map((tag) => (
                      <button
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm hover:bg-white/20 transition-colors"
                        onClick={() => {
                          setIsSearch(false);
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white/60 text-xs sm:text-sm mb-2">
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Casual Outfit", "Formal Wear", "Beach Style"].map(
                      (tag) => (
                        <button
                          key={tag}
                          className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm hover:bg-white/20 transition-colors"
                          onClick={() => {
                            setIsSearch(false);
                          }}
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
