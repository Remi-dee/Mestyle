"use client";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "./components/landingPage/template";

export default function Home() {
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
