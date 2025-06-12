"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  selectErrors,
  selectShowValidation,
  updateFormField,
  updateCheckboxField,
} from "@/app/redux/features/styleContent/styleContentSlice";
import {
  containerVariants,
  itemVariants,
} from "@/app/composables/motion/motionConfigs";
import { useGetPersonasQuery } from "@/app/redux/features/persona/personaApi";
import { FaUser } from "react-icons/fa";
import ActivePersonaDisplay from "../ActivePersonaDisplay";

const StyleDetailsStep: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const showValidation = useSelector(selectShowValidation);
  console.log("formdata is 2", formData);
  const occasions = [
    "Casual",
    "Formal",
    "Business",
    "Date Night",
    "Party",
    "Outdoor",
    "Workout",
    "Travel",
    "Beach",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name, value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    dispatch(updateCheckboxField({ field: name, value, checked }));
  };

  // Only show errors if validation is active
  const shouldShowError = (fieldName: string) => {
    return showValidation && errors[fieldName];
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div className="space-y-8" variants={itemVariants}>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Style Details
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tell us more about your style to help others discover it.
          </p>
        </div>

        <div className="space-y-7">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Style Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="Give your style a catchy title"
              className={`w-full rounded-md border ${
                shouldShowError("title")
                  ? "border-red-500 ring-red-100 dark:ring-red-900/30"
                  : "border-gray-300 dark:border-gray-600 focus:ring-burgundy-500 focus:border-burgundy-500 dark:focus:border-burgundy-500"
              } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-2 ${
                shouldShowError("title")
                  ? "ring-red-100 dark:ring-red-900/30"
                  : "ring-transparent"
              } transition-all`}
            />
            {shouldShowError("title") && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.title}
              </p>
            )}
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your style, inspiration, and what makes it special"
              className={`w-full rounded-md border ${
                shouldShowError("description")
                  ? "border-red-500 ring-red-100 dark:ring-red-900/30"
                  : "border-gray-300 dark:border-gray-600 focus:ring-burgundy-500 focus:border-burgundy-500 dark:focus:border-burgundy-500"
              } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-2 ${
                shouldShowError("description")
                  ? "ring-red-100 dark:ring-red-900/30"
                  : "ring-transparent"
              } transition-all`}
            />
            <div className="mt-1.5 flex justify-between">
              {shouldShowError("description") ? (
                <p className="text-sm text-red-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.description}
                </p>
              ) : (
                <div></div> /* Empty div to maintain the layout */
              )}
              <p
                className={`text-xs ${
                  formData.description?.length > 450
                    ? "text-orange-500 dark:text-orange-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {formData.description?.length || 0}/500 characters
              </p>
            </div>
          </div>
          {/* Occasion Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Perfect For
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {occasions.map((occasion) => (
                <div key={occasion} className="relative">
                  <input
                    id={`occasion-${occasion}`}
                    name="occasions"
                    type="checkbox"
                    value={occasion}
                    checked={formData.occasions?.includes(occasion) || false}
                    onChange={handleCheckboxChange}
                    className="peer absolute h-0 w-0 opacity-0"
                  />
                  <label
                    htmlFor={`occasion-${occasion}`}
                    className={`flex items-center px-3 py-2 rounded-md border cursor-pointer transition-all ${
                      formData.occasions?.includes(occasion)
                        ? "bg-burgundy-50 dark:bg-burgundy-900/30 border-burgundy-200 dark:border-burgundy-700 text-burgundy-700 dark:text-burgundy-200"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/50"
                    }`}
                  >
                    {formData.occasions?.includes(occasion) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-burgundy-500 dark:text-burgundy-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {!formData.occasions?.includes(occasion) && (
                      <div className="h-4 w-4 mr-2"></div>
                    )}
                    {occasion}
                  </label>
                </div>
              ))}
            </div>
            {shouldShowError("occasions") && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.occasions}
              </p>
            )}
          </div>
          {/* Season */}
          <div>
            <label
              htmlFor="season"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Season
            </label>
            <div className="relative">
              <select
                id="season"
                name="season"
                value={formData.season || ""}
                onChange={handleInputChange}
                className={`w-full rounded-md border appearance-none ${
                  shouldShowError("season")
                    ? "border-red-500 ring-red-100 dark:ring-red-900/30"
                    : "border-gray-300 dark:border-gray-600 focus:ring-burgundy-500 focus:border-burgundy-500 dark:focus:border-burgundy-500"
                } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-2 ${
                  shouldShowError("season")
                    ? "ring-red-100 dark:ring-red-900/30"
                    : "ring-transparent"
                } transition-all pr-10`}
              >
                <option value="">Select a season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="All Seasons">All Seasons</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {shouldShowError("season") && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.season}
              </p>
            )}
          </div>{" "}
          <ActivePersonaDisplay />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StyleDetailsStep;
