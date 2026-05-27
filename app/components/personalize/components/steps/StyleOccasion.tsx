import React from "react";
import { motion } from "framer-motion";
import OccasionSelection from "./OccasionSelection";
import DisplayNameInput from "./DisplayNameInput";

const StyleOccasionStep = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-6 w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <OccasionSelection />
      <DisplayNameInput />
    </motion.div>
  );
};

export default StyleOccasionStep;
