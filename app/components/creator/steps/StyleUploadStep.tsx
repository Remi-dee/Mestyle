"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  selectErrors,
  selectIsLoading,
  selectShowValidation,
  updateImageField,
  validateUploadStep,
} from "@/app/redux/features/styleContent/styleContentSlice";
import { itemVariants } from "@/app/composables/motion/motionConfigs";
import Image from "next/image";

interface ImageFile {
  file: File;
  preview: string;
}

const StyleUploadStep: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const isLoading = useSelector(selectIsLoading);
  const showValidation = useSelector(selectShowValidation);
  const [dragOver, setDragOver] = useState(false);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const handleFileChange = (file: File) => {
    if (imageFiles.length >= 3) {
      // Show error or notification that max images reached
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      // You might want to show an error message to the user here
      console.error("File size exceeds 10MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const preview = e.target.result as string;
        const newImage = { file, preview };

        // Add new image to local state
        setImageFiles((prev) => [...prev, newImage]);

        // Update Redux with all image previews
        const allPreviews = [...imageFiles, newImage].map((img) => img.preview);
        dispatch(
          updateImageField({
            field: "images",
            preview: JSON.stringify(allPreviews),
          })
        );
      }
    };
    reader.readAsDataURL(file);
    console.log("imageFiles", imageFiles);
  };

  const handleRemoveImage = (index: number) => {
    // Remove image from local state
    setImageFiles((prev) => {
      const newImages = prev.filter((_, i) => i !== index);

      // Update Redux with remaining previews
      dispatch(
        updateImageField({
          field: "images",
          preview: JSON.stringify(newImages.map((img) => img.preview)),
        })
      );

      return newImages;
    });

    // Re-validate if no images left
    if (imageFiles.length === 1) {
      setTimeout(() => {
        dispatch(validateUploadStep());
      }, 0);
    }
  };

  const handleSetAsCover = (index: number) => {
    setImageFiles((prev) => {
      const newImages = [...prev];
      const selectedImage = newImages[index];
      // Remove the image from its current position
      newImages.splice(index, 1);
      // Add it to the beginning of the array
      newImages.unshift(selectedImage);

      // Update Redux with the new order
      dispatch(
        updateImageField({
          field: "images",
          preview: JSON.stringify(newImages.map((img) => img.preview)),
        })
      );

      return newImages;
    });
  };

  // Helper to check if there are any images
  const hasAnyImage = () => {
    return imageFiles.length > 0;
  };

  // Only show errors if validation is active
  const shouldShowError = () => {
    return showValidation && errors.images;
  };

  // Expose image files to parent component
  React.useEffect(() => {
    // @ts-ignore - Adding custom property to window for parent component access
    window.styleImageFiles = imageFiles;
  }, [imageFiles]);

  return (
    <motion.div className="space-y-8" variants={itemVariants}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Upload Your Style Photos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Share up to 3 photos that showcase your style. The first image will be
          used as the cover image.
        </p>
      </div>

      {/* Main Content Area - Flex container for large screens */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cover Image Upload Area */}
        <div className="flex-1">
          <div
            className={`relative border-2 rounded-lg aspect-[2/3] max-w-md mx-auto flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
              dragOver
                ? "border-burgundy-600 ring-2 ring-burgundy-200 dark:ring-burgundy-800/30"
                : "border-dashed border-gray-300 dark:border-gray-600 hover:border-burgundy-400 dark:hover:border-burgundy-500"
            }
            ${shouldShowError() ? "border-red-500" : ""}
            ${imageFiles.length > 0 ? "border-solid" : ""}
              `}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {imageFiles.length === 0 ? (
              <>
                <input
                  type="file"
                  id="styleImages"
                  name="styleImages"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />
                <label
                  htmlFor="styleImages"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 mb-4 bg-burgundy-50 dark:bg-burgundy-900/30 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-burgundy-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="text-burgundy-600 dark:text-burgundy-400 font-semibold">
                        Upload Cover Image
                      </span>
                    </p>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or WEBP (MAX. 10MB)
                    </p>
                  </div>
                </label>
              </>
            ) : (
              <div className="relative w-full h-full bg-black/5 dark:bg-black/20">
                <Image
                  src={imageFiles[0].preview}
                  alt="Cover image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 pointer-events-none" />
                <div className="absolute top-2 left-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                  {imageFiles.length}/3
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  Cover Image
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(0)}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                  aria-label="Remove cover image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}
            {shouldShowError() && (
              <div className="absolute bottom-0 w-full text-center text-xs text-white bg-red-500 py-1.5 px-2">
                {errors.images}
              </div>
            )}
          </div>
        </div>

        {/* Additional Images Area */}
        <div className="lg:w-80">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Images
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {imageFiles.slice(1).map((image, index) => (
                <div
                  key={index + 1}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <Image
                    src={image.preview}
                    alt={`Additional image ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={() => handleSetAsCover(index + 1)}
                      className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 transition-colors mb-2"
                    >
                      Set as Cover
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index + 1)}
                      className="p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      aria-label="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {imageFiles.length < 3 && (
                <div
                  className={`relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
                    dragOver
                      ? "border-burgundy-600 ring-2 ring-burgundy-200 dark:ring-burgundy-800/30"
                      : "border-gray-300 dark:border-gray-600 hover:border-burgundy-400 dark:hover:border-burgundy-500"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="additionalImages"
                    name="additionalImages"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor="additionalImages"
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Drag & drop or click to add
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tips section */}
      <div className="mt-8 bg-burgundy-50/50 dark:bg-burgundy-900/10 p-5 rounded-lg border border-burgundy-100 dark:border-burgundy-800/20">
        <h3 className="font-medium text-burgundy-800 dark:text-burgundy-200 mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Tips for great style photos
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
          <li>Use good lighting to showcase colors and details</li>
          <li>Take photos from different angles to show the complete style</li>
          <li>Make sure your outfit is the main focus in the images</li>
          <li>Include full-body shots for outfits when possible</li>
          <li>High-resolution images look best, but keep files under 10MB</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default StyleUploadStep;
