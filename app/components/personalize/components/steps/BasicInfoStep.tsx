"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../../../composables/motion/motionConfigs";
import FormField from "../../../ui/form/FormField";
import RadioGroupField from "../ui/RadioGroupField";

const ageGroups = [
  { value: "Under 18", label: "Under 18" },
  { value: "18-34", label: "18-34" },
  { value: "35-54", label: "35-54" },
  { value: "55-74", label: "55-74" },
  { value: "75 and over", label: "75 and over" },
];

const BasicInfoStep = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona) || {};

  // Debug log when component mounts or updates
  useEffect(() => {
    console.log("BasicInfoStep - formData:", formData);
    console.log("BasicInfoStep - errors:", errors);
  }, [formData, errors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ personaName: e.target.value }));
  };

  const handleRadioChange = (value: string) => {
    dispatch(updateFormData({ ageGroup: value }));
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
        <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
        <p className="text-sm dark:text-white/70 text-gray-600">
          This information helps us personalize your fashion experience.
        </p>
      </motion.div>

      <FormField
        id="personaName"
        name="personaName"
        label="Name this persona"
        value={(formData.personaName as string) || ""}
        onChange={handleInputChange}
        placeholder="Give this style persona a name"
        error={errors.personaName}
      />

      <RadioGroupField
        name="ageGroup"
        legend="Age Group"
        options={ageGroups}
        value={formData.ageGroup as string}
        onChange={handleRadioChange}
        error={errors.ageGroup}
        required={true}
      />
    </motion.div>
  );
};

export default BasicInfoStep;
