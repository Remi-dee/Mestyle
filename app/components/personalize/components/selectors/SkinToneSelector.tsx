"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import clsx from "clsx";

const SKIN_TONES = [
  { label: "Fair", color: "#f2d6cb" },
  { label: "Light", color: "#eac8b1" },
  { label: "Medium", color: "#d1a06d" },
  { label: "Olive", color: "#9f7353" },
  { label: "Deep", color: "#5d3b2e" },
];

const SkinToneSelector = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);
  const selectedTone = formData.skinTone as string;

  const selectTone = (label: string) => {
    // Just set the selected tone directly (single selection)
    dispatch(updateFormData({ skinTone: label }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 17 },
    },
  };

  return (
    <motion.fieldset
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <legend className="text-base font-medium mb-2 dark:text-white text-gray-800">
        Skin Tone
      </legend>
      <div className="flex flex-wrap gap-4">
        {SKIN_TONES.map(({ label, color }, index) => (
          <motion.button
            key={label}
            onClick={() => selectTone(label)}
            style={{ backgroundColor: color }}
            className={clsx(
              "w-12 h-12 rounded-full border-2 transition-all",
              selectedTone === label
                ? "ring-2 ring-burgundy-500 dark:border-white border-gray-300"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={label}
            type="button"
            variants={itemVariants}
            custom={index}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 8px rgba(109, 26, 54, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
      {errors?.skinTone && (
        <motion.p
          className="text-red-500 dark:text-red-400 text-sm mt-2"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors.skinTone}
        </motion.p>
      )}
    </motion.fieldset>
  );
};

export default SkinToneSelector;
