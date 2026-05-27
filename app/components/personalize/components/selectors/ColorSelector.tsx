"use client";

import React from "react";
import { motion } from "framer-motion";

interface ColorOption {
  name: string;
  hex: string;
  group: string;
}

interface ColorGroup {
  [key: string]: ColorOption[];
}

interface ColorSelectorProps {
  colorGroups: ColorGroup;
  selectedColors: string[];
  onChange: (color: string) => void;
  error?: string;
}

const ColorSelector = ({
  colorGroups,
  selectedColors,
  onChange,
  error,
}: ColorSelectorProps) => {
  return (
    <motion.fieldset
      className="p-4 rounded-2xl space-y-4 border
                dark:bg-white/10 dark:backdrop-blur-md 
                bg-white dark:border-white/20 border-gray-200"
    >
      <legend className="text-lg font-semibold dark:text-white text-gray-800">
        What colors do you prefer to wear?
      </legend>

      {Object.entries(colorGroups).map(([groupName, colors], groupIndex) => (
        <motion.div
          key={groupName}
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.05 }}
        >
          <h3 className="text-md font-medium dark:text-white/80 text-gray-700">
            {groupName} Colors
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map(({ name, hex }, colorIndex) => (
              <motion.label
                key={name}
                className={`inline-flex flex-col items-center cursor-pointer`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: colorIndex * 0.02 + groupIndex * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative">
                  <div
                    style={{ backgroundColor: hex }}
                    className={`w-10 h-10 rounded-full border transition-all ${
                      selectedColors.includes(name)
                        ? "ring-2 ring-burgundy-500 ring-offset-2 dark:ring-offset-black/50 ring-offset-white/50"
                        : "opacity-70 hover:opacity-100 dark:border-gray-600 border-gray-300"
                    }`}
                  ></div>
                  <input
                    type="checkbox"
                    value={name}
                    checked={selectedColors.includes(name)}
                    onChange={() => onChange(name)}
                    className="sr-only"
                    aria-label={`${name} color`}
                  />
                  {selectedColors.includes(name) && (
                    <svg
                      className="absolute -top-1 -right-1 text-burgundy-500 dark:bg-black bg-white rounded-full w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="mt-1 text-xs dark:text-white text-gray-800">
                  {name}
                </span>
              </motion.label>
            ))}
          </div>
        </motion.div>
      ))}

      {error && (
        <motion.p
          className="text-red-500 dark:text-red-400 text-sm mt-1"
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

export default ColorSelector;
