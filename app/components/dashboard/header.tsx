"use client";
import { useEffect, useMemo, useState, useRef } from "react";

import Image from "next/image";
import Filter from "@/public/icons/filter.svg";
import Search from "@/public/icons/search.svg";
import { useGetCurrentUserQuery } from "@/app/redux/features/user/user.api";
import { useGetFeedQuery } from "@/app/redux/features/styleContent/styleApi";
import { useRouter } from "next/navigation";
import StylePersonaModal from "./StylePersonaModal";

const RECENT_KEY = "mestyle_recent_searches";

interface HeaderProps {
  query?: string;
  setQuery?: (value: string) => void;
}

function Header({ query = "", setQuery = () => {} }: HeaderProps): JSX.Element {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isStylePersonaOpen, setIsStylePersonaOpen] = useState<boolean>(false);
  const [recent, setRecent] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const {
    data: signedInProfile,
    isLoading: signedInLoading,
    error: signedInError,
  } = useGetCurrentUserQuery({});
  const { data: feedData } = useGetFeedQuery({});
  const items = useMemo(() => (feedData?.items ?? []) as any[], [feedData]);

  const router = useRouter();

  // Load recent searches once.
  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  const saveRecent = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 6);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem(RECENT_KEY);
  };

  // Close suggestions on outside click.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- suggestion sources, derived from the real feed ---
  const keywordPool = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) =>
      [...(it.occasions || []), ...(it.categories || []), ...(it.tags || []), ...(it.colors || [])].forEach(
        (k) => k && set.add(String(k)),
      ),
    );
    return Array.from(set);
  }, [items]);

  const creatorPool = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => it.owner?.username && set.add(it.owner.username));
    return Array.from(set);
  }, [items]);

  const trending = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((it) =>
      [...(it.occasions || []), ...(it.categories || []), ...(it.tags || [])].forEach((k) => {
        if (k) counts[k] = (counts[k] || 0) + 1;
      }),
    );
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([k]) => k);
  }, [items]);

  const q = query.trim().toLowerCase();
  const lookMatches = useMemo(() => {
    if (!q) return [];
    return items
      .filter((it) =>
        [it.title, it.owner?.username, ...(it.occasions || []), ...(it.tags || []), ...(it.categories || []), ...(it.colors || [])]
          .filter(Boolean)
          .some((f) => String(f).toLowerCase().includes(q)),
      )
      .slice(0, 5);
  }, [items, q]);
  const keywordMatches = useMemo(
    () => (q ? keywordPool.filter((k) => k.toLowerCase().includes(q)).slice(0, 8) : []),
    [keywordPool, q],
  );
  const creatorMatches = useMemo(
    () => (q ? creatorPool.filter((c) => c.toLowerCase().includes(q)).slice(0, 3) : []),
    [creatorPool, q],
  );
  const noMatches = q && lookMatches.length === 0 && keywordMatches.length === 0 && creatorMatches.length === 0;

  const chooseTerm = (term: string) => {
    setQuery(term);
    saveRecent(term);
    setIsSearch(false);
  };
  const openLook = (id: string) => {
    setIsSearch(false);
    router.push(`/content/${id}`);
  };

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

        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={query}
              placeholder="Search looks by occasion, colour, or creator..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-20 bg-black/20 border border-zinc-600 rounded-[20px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600/50 transition-all duration-200 text-sm sm:text-base"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearch(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveRecent(query);
                  setIsSearch(false);
                }
                if (e.key === "Escape") setIsSearch(false);
              }}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-11 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            )}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Image src={Search} alt="Search" className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
            </div>
          </div>

          {/* Auto-suggest */}
          {isSearch && (
            <div className="absolute w-full mt-2 max-h-[70vh] overflow-y-auto bg-[#141013]/95 backdrop-blur-md border border-zinc-700 rounded-[20px] p-3 sm:p-4 shadow-xl z-50">
              {/* Typing: live matches from real looks */}
              {q ? (
                <div className="space-y-4">
                  {lookMatches.length > 0 && (
                    <div>
                      <h3 className="text-white/50 text-xs mb-2 uppercase tracking-wider">Looks</h3>
                      <div className="space-y-1">
                        {lookMatches.map((it) => (
                          <button
                            key={it._id}
                            onClick={() => openLook(it._id)}
                            className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/5 transition-colors"
                          >
                            <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-black/30">
                              {it.coverImage && (
                                <Image src={it.coverImage} alt="" fill className="object-cover" sizes="40px" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-white">
                                {it.title || "Untitled look"}
                              </span>
                              <span className="block truncate text-xs text-white/50">
                                {(it.occasions || []).slice(0, 2).join(" · ") || it.owner?.username}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {keywordMatches.length > 0 && (
                    <div>
                      <h3 className="text-white/50 text-xs mb-2 uppercase tracking-wider">Filters</h3>
                      <div className="flex flex-wrap gap-2">
                        {keywordMatches.map((k) => (
                          <button
                            key={k}
                            onClick={() => chooseTerm(k)}
                            className="px-3 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm hover:bg-burgundy-600/40 transition-colors"
                          >
                            {k}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {creatorMatches.length > 0 && (
                    <div>
                      <h3 className="text-white/50 text-xs mb-2 uppercase tracking-wider">Creators</h3>
                      <div className="flex flex-wrap gap-2">
                        {creatorMatches.map((c) => (
                          <button
                            key={c}
                            onClick={() => chooseTerm(c)}
                            className="px-3 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm hover:bg-burgundy-600/40 transition-colors"
                          >
                            @{c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {noMatches && (
                    <p className="py-2 text-sm text-white/50">
                      No suggestions for &ldquo;{query}&rdquo; — press Enter to search anyway.
                    </p>
                  )}
                </div>
              ) : (
                /* Empty query: recent + trending */
                <div className="space-y-4">
                  {recent.length > 0 && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-white/50 text-xs uppercase tracking-wider">Recent</h3>
                        <button onClick={clearRecent} className="text-xs text-white/40 hover:text-white/70">
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => chooseTerm(tag)}
                            className="px-3 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm hover:bg-white/20 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-white/50 text-xs mb-2 uppercase tracking-wider">
                      {trending.length ? "Trending in your feed" : "Popular"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(trending.length ? trending : ["Owambe", "Office", "Church", "Casual"]).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => chooseTerm(tag)}
                          className="px-3 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm hover:bg-burgundy-600/40 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
