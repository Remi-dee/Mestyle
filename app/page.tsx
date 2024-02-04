"use client";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "./components/landingPage/homePage";
import { useEffect, useState } from "react";

 const Home: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => setMounted(true), []);

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
};


export default Home