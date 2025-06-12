"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const ProgressBar = ({ currentStep, totalSteps, labels }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${
              index <= currentStep
                ? "text-burgundy-600 dark:text-burgundy-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-burgundy-600 dark:bg-burgundy-500 h-2.5 rounded-full"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
