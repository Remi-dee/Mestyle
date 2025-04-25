"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
const ageGroups = ["Under 18", "18-34", "35-54", "55-74", "75 and over"];

const BasicInfoStep = () => {
  const dispatch = useDispatch();
  // Use a default empty object if the selector returns undefined
  const { formData, errors } = useSelector(selectPersona) || {};

  // Debug log when component mounts or updates
  useEffect(() => {
    console.log("BasicInfoStep - formData:", formData);
    console.log("BasicInfoStep - errors:", errors);
  }, [formData, errors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ displayName: e.target.value }));
  };

  const handleRadioChange = (field: string, value: string) => {
    console.log(`Setting ${field} to:`, value);
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
      className="min-h-[60vh] px-4 py-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
        <p className="text-sm text-white/70">
          This information helps us personalize your fashion experience.
        </p>
      </motion.div>

      {/* Display Name */}
      <motion.div
        variants={itemVariants}
        className={`bg-white/10 backdrop-blur-md border ${
          errors.displayName ? "border-red-500" : "border-white/20"
        } p-4 rounded-2xl space-y-2`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
      >
        <label
          htmlFor="displayName"
          className="text-white text-lg font-semibold"
        >
          What should we call you?
        </label>
        <motion.input
          id="displayName"
          name="displayName"
          value={(formData.displayName as string) || ""}
          onChange={handleInputChange}
          placeholder="Your preferred name or nickname"
          className={`w-full p-2 ${
            errors.displayName ? "bg-red-500/10 border-red-400" : "bg-white/20"
          } text-white placeholder-white/50 rounded-md border-none focus:outline-none focus:ring-2 ${
            errors.displayName ? "focus:ring-red-500" : "focus:ring-purple-500"
          }`}
          whileFocus={{ scale: 1.01 }}
        />
        {errors.displayName && (
          <motion.p
            className="text-red-400 text-sm"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.displayName}
          </motion.p>
        )}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Gender - Radio Buttons */}
        <motion.fieldset
          variants={itemVariants}
          className={`bg-white/10 backdrop-blur-md border ${
            errors.gender ? "border-red-500" : "border-white/20"
          } p-4 rounded-2xl space-y-2`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
        >
          <legend className="text-white text-lg font-semibold">
            Gender <span className="text-red-400">*</span>
          </legend>
          <div className="space-y-2">
            {genderOptions.map((gender, index) => (
              <motion.label
                key={gender}
                className="flex items-center space-x-2 cursor-pointer"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  aria-label={gender}
                  onChange={() => handleRadioChange("gender", gender)}
                  className={`form-radio h-5 w-5 ${
                    errors.gender
                      ? "text-red-600 focus:ring-red-500"
                      : "text-purple-600 focus:ring-purple-500"
                  }`}
                />
                <span>{gender}</span>
              </motion.label>
            ))}
          </div>
          {errors.gender && (
            <motion.p
              className="text-red-400 text-sm mt-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.gender}
            </motion.p>
          )}
        </motion.fieldset>

        {/* Age Group - Radio Buttons */}
        <motion.fieldset
          variants={itemVariants}
          className={`bg-white/10 backdrop-blur-md border ${
            errors.ageGroup ? "border-red-500" : "border-white/20"
          } p-4 rounded-2xl space-y-2`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
        >
          <legend className="text-white text-lg font-semibold">
            Age Group <span className="text-red-400">*</span>
          </legend>
          <div className="space-y-2">
            {ageGroups.map((age, index) => (
              <motion.label
                key={age}
                className="flex items-center space-x-2 cursor-pointer"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="radio"
                  name="ageGroup"
                  value={age}
                  checked={(formData.ageGroup as string) === age}
                  aria-label={age}
                  onChange={() => handleRadioChange("ageGroup", age)}
                  className={`form-radio h-5 w-5 ${
                    errors.ageGroup
                      ? "text-red-600 focus:ring-red-500"
                      : "text-purple-600 focus:ring-purple-500"
                  }`}
                />
                <span>{age}</span>
              </motion.label>
            ))}
          </div>
          {errors.ageGroup && (
            <motion.p
              className="text-red-400 text-sm mt-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.ageGroup}
            </motion.p>
          )}
        </motion.fieldset>
      </div>
    </motion.div>
  );
};

export default BasicInfoStep;
