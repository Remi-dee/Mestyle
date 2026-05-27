"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../../composables/motion/motionConfigs";
import clsx from "clsx";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  className?: string;
  required?: boolean;
}

const FormField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  error,
  type = "text",
  className = "",
  required = false,
}: FormFieldProps) => {
  return (
    <motion.div
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
      <label htmlFor={id} className="text-white text-lg font-semibold">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <motion.input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={clsx(
          "w-full p-2",
          error ? "bg-red-500/10 border-red-400" : "bg-white/20",
          "text-white placeholder-white/50 rounded-md border-none focus:outline-none focus:ring-2",
          error ? "focus:ring-red-500" : "focus:ring-burgundy-500"
        )}
        whileFocus={{ scale: 1.01 }}
      />
      {error && (
        <motion.p
          className="text-red-400 text-sm"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FormField;
