// OccasionSelection.tsx
"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const options = ["Formal", "Hangout", "Party", "Work"];

const OccasionSelection = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formData.occasion, value]
      : formData.occasion.filter((item) => item !== value);

    dispatch(updateFormData({ occasion: updated }));
    console.log(formData);
  };

  return (
    <motion.fieldset
      className="p-4 rounded-2xl space-y-3 border
               dark:bg-white/10 dark:backdrop-blur-md 
               bg-white dark:border-white/20 border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <legend className="text-lg font-semibold dark:text-white text-gray-800">
        What occasions do you typically dress for?
      </legend>
      <div className="flex flex-wrap gap-4">
        {options.map((occasion, index) => (
          <motion.label
            key={occasion}
            className="inline-flex items-center gap-2 dark:text-white text-gray-800"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <input
              type="checkbox"
              value={occasion}
              checked={formData.occasion.includes(occasion)}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-burgundy-600 focus:ring-burgundy-500"
              aria-label={occasion}
            />
            {occasion}
          </motion.label>
        ))}
      </div>
      {errors.occasion && (
        <motion.p
          className="text-red-500 dark:text-red-400 text-sm"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors.occasion}
        </motion.p>
      )}
    </motion.fieldset>
  );
};

export default OccasionSelection;
