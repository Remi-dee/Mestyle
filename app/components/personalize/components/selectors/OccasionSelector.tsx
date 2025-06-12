"use client";

import React from "react";
import { motion } from "framer-motion";

interface OccasionOption {
  name: string;
  icon: string;
  description: string;
}

interface OccasionSelectorProps {
  options: OccasionOption[];
  selectedOccasions: string[];
  onChange: (occasion: string) => void;
  error?: string;
}

const OccasionSelector = ({
  options,
  selectedOccasions,
  onChange,
  error,
}: OccasionSelectorProps) => {
  return (
    <motion.fieldset
      className="p-4 rounded-2xl space-y-3 border
                dark:bg-white/10 dark:backdrop-blur-md 
                bg-white dark:border-white/20 border-gray-200"
    >
      <legend className="text-lg font-semibold dark:text-white text-gray-800">
        What occasions do you typically dress for?
      </legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map(({ name, icon, description }, index) => (
          <motion.label
            key={name}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
              selectedOccasions.includes(name)
                ? "bg-burgundy-600/20 border-burgundy-500"
                : "dark:bg-white/5 bg-gray-50 dark:border-white/10 border-gray-200 dark:hover:bg-white/10 hover:bg-gray-100"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.03 }}
          >
            <input
              type="checkbox"
              value={name}
              checked={selectedOccasions.includes(name)}
              onChange={() => onChange(name)}
              className="sr-only"
              aria-label={`${name} occasion`}
            />
            <span className="text-2xl mb-1">{icon}</span>
            <span className="font-medium dark:text-white text-gray-800">
              {name}
            </span>
            <span className="text-xs text-center dark:text-white/70 text-gray-600">
              {description}
            </span>
          </motion.label>
        ))}
      </div>
      {error && (
        <motion.p
          className="text-red-500 dark:text-red-400 text-sm"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.fieldset>
  );
};

export default OccasionSelector;
