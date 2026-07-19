"use client";

import Image from "next/image";
import NavBar from "../components/landingPage/NavBar/NavBar";
import waterMark from "@/public/icons/waterMark.png";
import StyleGrid from "../components/explore/exploreStyleGrid";

function ExplorePage() {
  return (
    <main className="min-h-screen bg-grayDark font-lexend flex justify-center">
      <div className="relative w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <NavBar isExplore={true} />
        <div className="py-8">
          <StyleGrid />
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
