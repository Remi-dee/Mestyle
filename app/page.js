"use client";
import HomePage from "./components/landingPage/template";
import pageWrapper from "./pageWrapper";

export default function Home() {
  return (
    <main className="bg-grayDark font-lexend">
      <pageWrapper>
        <HomePage />
      </pageWrapper>
    </main>
  );
}
