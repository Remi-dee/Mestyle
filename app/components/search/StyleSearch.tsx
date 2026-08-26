"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Search from "@/public/icons/search.svg";

const RECENT_KEY = "mestyle_recent_searches";

export interface SearchableStyle {
  _id: string;
  title?: string;
  description?: string;
  coverImage?: string;
  occasions?: string[];
  categories?: string[];
  tags?: string[];
  colors?: string[];
  owner?: { username?: string };
}

/** True if a look matches a free-text query across its searchable fields. */
export function matchesStyleQuery(item: SearchableStyle, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    item.title,
    item.description,
    item.owner?.username,
    ...(item.occasions || []),
    ...(item.categories || []),
    ...(item.tags || []),
    ...(item.colors || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}

interface StyleSearchProps {
  items: SearchableStyle[];
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
}

/**
 * Reusable search field + auto-suggest, driven entirely by the looks passed in.
 * Used on both the dashboard (persona feed) and explore (public feed).
 */
export default function StyleSearch({ items, query, setQuery, placeholder }: StyleSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
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
  const lookMatches = useMemo(
    () => (q ? items.filter((it) => matchesStyleQuery(it, q)).slice(0, 5) : []),
    [items, q],
  );
  const keywordMatches = useMemo(
    () => (q ? keywordPool.filter((k) => k.toLowerCase().includes(q)).slice(0, 8) : []),
    [keywordPool, q],
  );
  const creatorMatches = useMemo(
    () => (q ? creatorPool.filter((c) => c.toLowerCase().includes(q)).slice(0, 3) : []),
    [creatorPool, q],
  );
  const noMatches =
    q && lookMatches.length === 0 && keywordMatches.length === 0 && creatorMatches.length === 0;

  const chooseTerm = (term: string) => {
    setQuery(term);
    saveRecent(term);
    setOpen(false);
  };
  const openLook = (id: string) => {
    setOpen(false);
    router.push(`/content/${id}`);
  };

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder={placeholder || "Search looks by occasion, colour, or creator..."}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-20 bg-black/20 border border-zinc-600 rounded-[20px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600/50 transition-all duration-200 text-sm sm:text-base"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveRecent(query);
              setOpen(false);
            }
            if (e.key === "Escape") setOpen(false);
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

      {open && (
        <div className="absolute w-full mt-2 max-h-[70vh] overflow-y-auto bg-[#141013]/95 backdrop-blur-md border border-zinc-700 rounded-[20px] p-3 sm:p-4 shadow-xl z-50">
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
                  {trending.length ? "Trending" : "Popular"}
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
  );
}
