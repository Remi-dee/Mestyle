"use client";

import {
  PersonaDataType,
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import SkinToneSelector from "../selectors/SkinToneSelector";
import BodyShapeSelector from "../BodyShape";

function BodyProfileStep() {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleRadioChange = (field: string, value: string) => {
    dispatch(updateFormData({ [field]: value }));
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
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
        <h2 className="text-2xl font-semibold">Your Body Profile</h2>
        <p className="text-sm dark:text-white/70 text-gray-600">
          Help us understand your physical features to recommend the most
          flattering styles.
        </p>
      </motion.div>

      {/* Body Shape */}
      <BodyShapeSelector />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skin Tone */}
        <SkinToneSelector />

        {/* Height */}
        <motion.fieldset
          variants={itemVariants}
          className="p-4 rounded-2xl space-y-2 border
                    dark:bg-white/10 dark:backdrop-blur-md 
                    bg-white dark:border-white/20 border-gray-200"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
        >
          <legend className="text-lg font-semibold dark:text-white text-gray-800">
            Your Height
          </legend>
          <div className="space-y-2">
            {[
              "Under 5'",
              "5' - 5'4\"",
              "5'5\" - 5'9\"",
              "5'10\" - 6'",
              "Over 6'",
            ].map((height, index) => (
              <motion.label
                key={height}
                className="flex items-center space-x-2 cursor-pointer dark:text-white text-gray-800"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="radio"
                  name="heightGroup"
                  value={height}
                  checked={formData.heightGroup?.toString() === height}
                  onChange={() => handleRadioChange("heightGroup", height)}
                  className="form-radio h-5 w-5 text-burgundy-600 focus:ring-burgundy-500"
                  aria-label={height}
                />
                <span>{height}</span>
              </motion.label>
            ))}
          </div>
          {errors?.heightGroup && (
            <motion.p
              className="text-red-500 dark:text-red-400 text-sm mt-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.heightGroup}
            </motion.p>
          )}
        </motion.fieldset>
      </div>
    </motion.div>
  );
}

export default BodyProfileStep;
