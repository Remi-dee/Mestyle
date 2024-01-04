"use client";

import Header from "../components/dashboard/header";
import StyleCard from "../components/dashboard/styleCard";
import StyleGrid from "../components/dashboard/styleGrid";
import NavBar from "../components/landingPage/NavBar/NavBar";

function page() {
  return (
    <main className="bg-grayDark font-lexend  flex justify-center">
      <div className="max-w-screen-2xl">
        <NavBar />
        <Header />
        <StyleGrid />
      </div>
    </main>
  );
}

export default page;
