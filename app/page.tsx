"use client";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "./components/landingPage/homePage";
import { useEffect, useState } from "react";

export default function Home(): JSX.Element {
  const [mounted, setMounted] = useState<boolean | undefined>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-grayDark font-lexend  flex justify-center">
      <div className="max-w-screen-2xl">
        <AnimatePresence>
          <HomePage />
        </AnimatePresence>
      </div>
    </main>
  );
}
