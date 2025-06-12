"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../../../composables/motion/motionConfigs";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  name: string;
  legend: string;
  options: Option[];
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  required?: boolean;
}

const RadioGroupField = ({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  className = "",
  required = false,
}: RadioGroupFieldProps) => {
  return (
    <motion.fieldset
      variants={itemVariants}
      className={clsx(
        `bg-white/10 backdrop-blur-md border`,
        error ? "border-red-500" : "border-white/20",
        "p-4 rounded-2xl space-y-2",
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <legend className="text-white text-lg font-semibold">
        {legend} {required && <span className="text-red-400">*</span>}
      </legend>
      <div className="space-y-2">
        {options.map((option, index) => (
          <motion.label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              aria-label={option.label}
              onChange={() => onChange(option.value)}
              className={clsx(
                "form-radio h-5 w-5",
                error
                  ? "text-red-600 focus:ring-red-500"
                  : "text-burgundy-600 focus:ring-burgundy-500"
              )}
            />
            <span>{option.label}</span>
          </motion.label>
        ))}
      </div>
      {error && (
        <motion.p
          className="text-red-400 text-sm mt-2"
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

export default RadioGroupField;
