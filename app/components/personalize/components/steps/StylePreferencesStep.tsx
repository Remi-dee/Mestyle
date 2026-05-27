"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../../../composables/motion/motionConfigs";
import ColorSelector from "../selectors/ColorSelector";
import OccasionSelector from "../selectors/OccasionSelector";

// Define color options with visual information
const colorOptions = [
  { name: "Black", hex: "#000000", group: "Neutral" },
  { name: "White", hex: "#FFFFFF", group: "Neutral" },
  { name: "Gray", hex: "#808080", group: "Neutral" },
  { name: "Red", hex: "#FF0000", group: "Warm" },
  { name: "Yellow", hex: "#FFFF00", group: "Warm" },
  { name: "Orange", hex: "#FFA500", group: "Warm" },
  { name: "Green", hex: "#008000", group: "Cool" },
  { name: "Blue", hex: "#0000FF", group: "Cool" },
  { name: "Purple", hex: "#800080", group: "Cool" },
  { name: "Pink", hex: "#FFC0CB", group: "Warm" },
  { name: "Brown", hex: "#A52A2A", group: "Neutral" },
  { name: "Navy", hex: "#000080", group: "Cool" },
];

// Group colors by category
const colorGroups = {
  Neutral: colorOptions.filter((color) => color.group === "Neutral"),
  Warm: colorOptions.filter((color) => color.group === "Warm"),
  Cool: colorOptions.filter((color) => color.group === "Cool"),
};

const occasionOptions = [
  { name: "Casual", icon: "🏡", description: "Everyday relaxed attire" },
  { name: "Work", icon: "💼", description: "Professional office wear" },
  { name: "Formal", icon: "✨", description: "Special events & celebrations" },
  { name: "Sports", icon: "🏃", description: "Athletic & active wear" },
  { name: "Party", icon: "🎉", description: "Social & nightlife events" },
  { name: "Date", icon: "❤️", description: "Romantic occasions" },
];

const StylePreferencesStep = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleCheckboxChange = (field: string, value: string) => {
    const current =
      (formData[field as keyof typeof formData] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    dispatch(updateFormData({ [field]: updated }));
  };

  return (
    <motion.div
      className="min-h-[60vh] px-4 py-6 rounded-lg shadow-lg space-y-6
                 dark:bg-white/10 dark:backdrop-blur-md dark:text-white
                 bg-gray-50 text-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <h2 className="text-2xl font-semibold">Your Style Preferences</h2>
        <p className="text-sm dark:text-white/70 text-gray-600">
          Tell us what occasions you dress for and colors you love to wear.
        </p>
      </motion.div>

      {/* Occasions Section */}
      <motion.div variants={itemVariants}>
        <OccasionSelector
          options={occasionOptions}
          selectedOccasions={(formData.occasion as string[]) || []}
          onChange={(value) => handleCheckboxChange("occasion", value)}
          error={errors.occasion}
        />
      </motion.div>

      {/* Color Preferences Section */}
      <motion.div variants={itemVariants}>
        <ColorSelector
          colorGroups={colorGroups}
          selectedColors={(formData.colorPreference as string[]) || []}
          onChange={(value) => handleCheckboxChange("colorPreference", value)}
          error={errors.colorPreference}
        />
      </motion.div>
    </motion.div>
  );
};

export default StylePreferencesStep;
