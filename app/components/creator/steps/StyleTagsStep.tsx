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
import { itemVariants } from "@/app/composables/motion/motionConfigs";

const StyleTagsStep: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const showValidation = useSelector(selectShowValidation);

  const categories = [
    "Streetwear",
    "Minimalist",
    "Vintage",
    "Athleisure",
    "Bohemian",
    "Classic",
    "Preppy",
    "Goth",
    "Business Casual",
    "Smart Casual",
    "Eclectic",
    "Feminine",
    "Masculine",
    "Gender-neutral",
    "Y2K",
    "Cottagecore",
    "Romantic",
    "Alternative",
  ];

  const priceRanges = ["Budget", "Mid-range", "High-end", "Luxury"];

  // Body-pillar matching options — kept aligned with the persona builder.
  const colorOptions = [
    "Burgundy",
    "Black",
    "White",
    "Emerald",
    "Gold",
    "Blue",
    "Red",
    "Neutral",
    "Pastel",
    "Earth tones",
  ];

  const bodyShapeOptions = [
    "Hourglass",
    "Rectangle",
    "Triangle",
    "Inverted triangle",
    "Oval",
    "Trapezoid",
  ];

  const skinToneOptions = ["Deep", "Dark", "Medium", "Tan", "Light", "Fair"];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    dispatch(updateCheckboxField({ field: name, value, checked }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name, value }));
  };

  // Only show errors if validation is active
  const shouldShowError = (fieldName: string) => {
    return showValidation && errors[fieldName];
  };

  return (
    <motion.div className="space-y-8" variants={itemVariants}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Categories & Tags
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Help others discover your style by adding relevant categories and
          price range.
        </p>
      </div>

      <div className="space-y-8">
        {/* Alt Text for Accessibility */}
        <div>
          <label
            htmlFor="altText"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Alt Text
          </label>
          <input
            type="text"
            id="altText"
            name="altText"
            value={formData.altText || ""}
            onChange={(e) =>
              dispatch(
                updateFormField({ field: e.target.name, value: e.target.value })
              )
            }
            placeholder="E.g., Person wearing casual outfit with dark jeans and white shirt"
            className={`w-full rounded-md border ${
              shouldShowError("altText")
                ? "border-red-500 ring-red-100 dark:ring-red-900/30"
                : "border-gray-300 dark:border-gray-600 focus:ring-burgundy-500 focus:border-burgundy-500 dark:focus:border-burgundy-500"
            } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-2 ${
              shouldShowError("altText")
                ? "ring-red-100 dark:ring-red-900/30"
                : "ring-transparent"
            }`}
          />
          {shouldShowError("altText") && (
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
              {errors.altText}
            </p>
          )}
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categories
          </label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div key={category} className="relative">
                <input
                  id={`category-${category}`}
                  name="categories"
                  type="checkbox"
                  value={category}
                  checked={formData.categories?.includes(category) || false}
                  onChange={handleCheckboxChange}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <label
                  htmlFor={`category-${category}`}
                  className={`flex items-center px-3 py-2.5 rounded-md border cursor-pointer transition-all ${
                    formData.categories?.includes(category)
                      ? "bg-burgundy-50 dark:bg-burgundy-900/30 border-burgundy-200 dark:border-burgundy-700 text-burgundy-700 dark:text-burgundy-200"
                      : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/50"
                  }`}
                >
                  {formData.categories?.includes(category) && (
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
                  {!formData.categories?.includes(category) && (
                    <div className="h-4 w-4 mr-2"></div>
                  )}
                  {category}
                </label>
              </div>
            ))}
          </div>
          {shouldShowError("categories") && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
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
              {errors.categories}
            </p>
          )}
        </div>

        {/* Match tags — power the persona feed (vibe: colours; body: shape & tone) */}
        {(
          [
            {
              label: "Colours in this look",
              hint: "Used to match people who love these colours.",
              field: "colors",
              options: colorOptions,
            },
            {
              label: "Body shapes this flatters",
              hint: "Helps us show it to the right body shapes.",
              field: "flatteringBodyShapes",
              options: bodyShapeOptions,
            },
            {
              label: "Skin tones this complements",
              hint: "Helps us match the right complexions.",
              field: "suitableSkinTones",
              options: skinToneOptions,
            },
          ] as const
        ).map(({ label, hint, field, options }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label}
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {hint}
            </p>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const selected =
                  (formData[field] as string[])?.includes(option) || false;
                return (
                  <label
                    key={option}
                    className={`cursor-pointer select-none rounded-full border px-3 py-1.5 text-sm transition-all ${
                      selected
                        ? "bg-burgundy-50 dark:bg-burgundy-900/30 border-burgundy-200 dark:border-burgundy-700 text-burgundy-700 dark:text-burgundy-200"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={field}
                      value={option}
                      checked={selected}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Price Range <span className="text-red-500">*</span>
            <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select the price range that best represents your style
            </span>
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {priceRanges.map((priceRange) => (
              <div key={priceRange} className="relative">
                <input
                  id={`price-${priceRange}`}
                  name="priceRange"
                  type="radio"
                  value={priceRange}
                  checked={formData.priceRange === priceRange}
                  onChange={handleRadioChange}
                  className="peer absolute h-0 w-0 opacity-0"
                />
                <label
                  htmlFor={`price-${priceRange}`}
                  className={`block text-center px-4 py-3 rounded-md border cursor-pointer transition-all ${
                    formData.priceRange === priceRange
                      ? "bg-burgundy-50 dark:bg-burgundy-900/30 border-burgundy-200 dark:border-burgundy-700 text-burgundy-700 dark:text-burgundy-200"
                      : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/50"
                  }`}
                >
                  {priceRange}
                  {formData.priceRange === priceRange && (
                    <div className="mt-1 flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-burgundy-500 dark:text-burgundy-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
          {shouldShowError("priceRange") && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
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
              {errors.priceRange}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-burgundy-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tip
            </h3>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Choosing accurate categories will help your style reach the
                right audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StyleTagsStep;
