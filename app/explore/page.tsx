"use client";

import Image from "next/image";
import Header from "../components/dashboard/header";
import StyleCard from "../components/styleComp/styleCard";

import NavBar from "../components/landingPage/NavBar/NavBar";
import waterMark from "@/public/icons/waterMark.png";
import StyleGrid from "../components/explore/exploreStyleGrid";

function page() {
  return (
    <main className=" bg-grayDark font-lexend flex justify-center ">
      <div className="relative max-w-screen-2xl">
        <NavBar isExplore={true} />
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
}

export default page;
