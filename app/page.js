"use client";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "./components/landingPage/template";
import pageWrapper from "./pageWrapper";

export default function Home() {
  return (
    <main className="bg-grayDark font-lexend">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <HomePage />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
