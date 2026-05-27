"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  errorVariants,
  listItemVariants,
} from "../../../composables/motion/motionConfigs";

interface FormErrorProps {
  errors: Record<string, string>;
  visible: boolean;
}

const FormError = ({ errors, visible }: FormErrorProps) => {
  if (!visible || Object.keys(errors).length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...errorVariants}
          className="p-3 dark:bg-red-500/20 bg-red-50 dark:border-red-500 border-red-300 border rounded-md"
        >
          <h3 className="text-red-500 dark:text-red-400 font-medium mb-1">
            Please fix the following errors:
          </h3>
          <ul className="list-disc pl-5">
            {Object.entries(errors).map(([field, message]) => (
              <motion.li
                key={field}
                {...listItemVariants}
                className="text-red-500 dark:text-red-400 text-sm"
              >
                {message}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormError;
