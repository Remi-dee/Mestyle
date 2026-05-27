"use client";

import React from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/app/composables/motion/motionConfigs";

import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  isLoading = false,
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  // Color classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return isDisabled
          ? "bg-burgundy-500/50 dark:bg-burgundy-600/50 text-white/70"
          : "bg-burgundy-600 text-white hover:bg-burgundy-700";
      case "secondary":
        return isDisabled
          ? "bg-gray-200 dark:bg-gray-600/40 text-gray-400 dark:text-gray-500"
          : "dark:bg-white/5 bg-white/10 dark:border-burgundy-600/50 border-burgundy-700 border dark:text-white text-gray-700 dark:hover:bg-white/20 hover:bg-gray-200";
      case "success":
        return isDisabled
          ? "bg-green-400/50 dark:bg-green-500/50 text-white/70"
          : "bg-green-600 text-white hover:bg-green-700";
      case "danger":
        return isDisabled
          ? "bg-red-400/50 dark:bg-red-500/50 text-white/70"
          : "bg-red-600 text-white hover:bg-red-700";
      default:
        return isDisabled
          ? "bg-burgundy-500/50 dark:bg-burgundy-600/50 text-white/70"
          : "bg-burgundy-600 text-white hover:bg-burgundy-700";
    }
  };

  const cursorClass = isLoading
    ? "cursor-wait"
    : isDisabled
    ? "cursor-not-allowed"
    : "";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      variants={buttonVariants}
      whileHover={isDisabled ? "disabled" : "hover"}
      whileTap={isDisabled ? "disabled" : "tap"}
      className={clsx(
        "px-4 py-2 rounded-md flex items-center justify-center",
        getVariantClasses(),
        cursorClass,
        className
      )}
    >
      {isLoading && (
        <span className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mr-2"></span>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
