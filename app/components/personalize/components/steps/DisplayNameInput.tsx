// DisplayNameInput.tsx
"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const DisplayNameInput = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ personaName: e.target.value }));
    console.log(formData);
  };

  return (
    <motion.div
      className="p-4 rounded-2xl space-y-2 border
               dark:bg-white/10 dark:backdrop-blur-md 
               bg-white dark:border-white/20 border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <label
        htmlFor="personaName"
        className="text-lg font-semibold dark:text-white text-gray-800"
      >
        Display Name / Nickname
      </label>
      <motion.input
        id="personaName"
        name="personaName"
        value={formData.personaName}
        onChange={handleChange}
        placeholder='"e.g., FashionIcon123"'
        className="w-full max-w-md p-2 rounded-md border-none focus:outline-none focus:ring-2
               dark:bg-white/20 bg-gray-100 
               dark:text-white text-gray-800 
               dark:placeholder-white/50 placeholder-gray-500 
               focus:ring-burgundy-500"
        whileFocus={{ scale: 1.01 }}
      />
      {errors.personaName && (
        <motion.p
          className="text-red-500 dark:text-red-400 text-sm"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors.personaName}
        </motion.p>
      )}
    </motion.div>
  );
};

export default DisplayNameInput;
