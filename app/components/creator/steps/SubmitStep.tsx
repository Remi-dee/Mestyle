"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  selectFormData,
  selectIsLoading,
  selectFormStep,
} from "@/app/redux/features/styleContent/styleContentSlice";
import { itemVariants } from "@/app/composables/motion/motionConfigs";
import Image from "next/image";

const SubmitStep: React.FC = () => {
  const formData = useSelector(selectFormData);
  const isLoading = useSelector(selectIsLoading);
  const currentStep = useSelector(selectFormStep);
  // Parse images from JSON string
  const images = useMemo(() => {
    try {
      return formData.imagesPreview ? JSON.parse(formData.imagesPreview) : [];
    } catch (e) {
      console.error("Error parsing images:", e);
      return [];
    }
  }, [formData.imagesPreview]);
  console.log("current step here is", currentStep);
  return (
    <motion.div className="space-y-8" variants={itemVariants}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Review and Submit
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Review your style details before submitting. You can go back to make
          changes if needed.
        </p>
      </div>

      {/* Style Preview */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Image */}
          <div className="md:w-2/5">
            {images.length > 0 ? (
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={images[0]}
                  alt={formData.altText || "Style preview"}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                  Cover Image
                </div>
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <span className="text-gray-400 dark:text-gray-500">
                  No primary image
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:w-3/5 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {formData.title || "Untitled Style"}
            </h3>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{formData.description || "No description provided."}</p>
            </div>

            {/* Tags */}
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Season
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-burgundy-50 dark:bg-burgundy-900/20 text-burgundy-700 dark:text-burgundy-300 text-xs font-medium rounded-full">
                  {formData.season}
                </span>
              </div>
            </div>

            {/* Occasions */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Occasions
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.occasions?.map((occasion, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.categories?.map((category, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            {formData.tags && formData.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Images */}
        {images.length > 1 && (
          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Additional Images
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((image: string, index: number) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <Image
                    src={image}
                    alt={`${formData.altText || "Style"} - additional view ${
                      index + 2
                    }`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submission note */}
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800/20 rounded-lg p-4 flex">
        <svg
          className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          <p className="font-medium">Please note:</p>
          <p className="mt-1">
            Once submitted, your style will be visible to others on Mestyle. You
            can edit or remove it later from your dashboard.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SubmitStep;
