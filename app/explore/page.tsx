"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import NavBar from "../components/landingPage/NavBar/NavBar";
import waterMark from "@/public/icons/waterMark.png";
import StyleGrid from "../components/explore/exploreStyleGrid";
import StyleSearch from "../components/search/StyleSearch";
import { useGetRandomStylesQuery } from "@/app/redux/features/styleContent/styleApi";

function ExplorePage() {
  const [query, setQuery] = useState("");
  const { data } = useGetRandomStylesQuery({});
  const items = useMemo(() => (data ?? []) as any[], [data]);

  return (
    <main className="min-h-screen bg-grayDark font-lexend flex justify-center">
      <div className="relative w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <NavBar isExplore={true} />

        <div className="mt-[60px] sm:mt-[80px] mb-6 sm:mb-8 px-4 sm:px-0">
          <h1 className="mb-1 text-2xl sm:text-3xl md:text-4xl font-medium text-white">
            Explore styles
          </h1>
          <p className="mb-4 text-sm text-white/60">
            Discover complete looks from real creators.
          </p>
          <StyleSearch
            items={items}
            query={query}
            setQuery={setQuery}
            placeholder="Search styles by occasion, colour, or creator..."
          />
        </div>

        <div className="py-4">
          <StyleGrid query={query} />
        </div>

        <div className="pointer-events-none">
          <Image
            src={waterMark}
            alt="Mestyle watermark"
            width={200}
            height={100}
            className="fixed left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-10"
          />
        </div>
      </div>
    </main>
  );
}

export default ExplorePage;
