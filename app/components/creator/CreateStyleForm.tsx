"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useCreateStyleMutation } from "@/app/redux/features/styleContent/styleApi";
import { useGetCurrentUserQuery } from "@/app/redux/features/user/user.api";
import { uploadImageToStorage } from "@/lib/database/databaseService";
import {
  selectFormStep,
  selectFormData,
  selectErrors,
  selectIsLoading,
  selectShowValidation,
  nextStep,
  previousStep,
  validateUploadStep,
  validateDetailsStep,
  validateTagsStep,
  selectValidationState,
  setLoading,
  setErrors,
  resetForm,
  setShowValidation,
} from "@/app/redux/features/styleContent/styleContentSlice";
import { useGetPersonasQuery } from "@/app/redux/features/persona/personaApi";

import StyleUploadStep from "./steps/StyleUploadStep";
import StyleDetailsStep from "./steps/StyleDetailsStep";
import StyleTagsStep from "./steps/StyleTagsStep";
import SubmitStep from "./steps/SubmitStep";
import {
  containerVariants,
  itemVariants,
} from "@/app/composables/motion/motionConfigs";

import FormError from "../ui/form/FormError";
import FormNotification from "../ui/form/FormNotification";
import Button from "../ui/button/Button";
import {
  validateUploadStep as utilsValidateUploadStep,
  validateDetailsStep as utilsValidateDetailsStep,
} from "./utils/validation";

interface ImageFile {
  file: File;
  preview: string;
}

const CreateStyleForm: React.FC = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectFormStep);
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const isLoading = useSelector(selectIsLoading);
  const isStepValid = useSelector(selectValidationState);
  const showValidation = useSelector(selectShowValidation);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  const [createStyle] = useCreateStyleMutation();
  const { data: signedInProfile } = useGetCurrentUserQuery({});
  const { data: personas = [] } = useGetPersonasQuery();
  const activePersona = personas.find((p) => p.isActive);

  const steps = [
    { id: 0, name: "Upload", component: <StyleUploadStep /> },
    { id: 1, name: "Details", component: <StyleDetailsStep /> },
    { id: 2, name: "Tags", component: <StyleTagsStep /> },
    { id: 3, name: "Submit", component: <SubmitStep /> },
  ];
  console.log("errors", errors);
  // Make sure validation errors aren't shown on initial render
  useEffect(() => {
    // Hide validation on initial render
    dispatch(setShowValidation(false));

    // Reset to ensure no errors from previous sessions
    if (currentStep === 0) {
      // Reset any errors from previous sessions, but don't validate yet
      dispatch(setErrors({}));
    }
  }, [dispatch]);

  const validateCurrentStep = async () => {
    setIsValidating(true);
    dispatch(setShowValidation(true));

    let validationErrors = {};
    if (currentStep === 0) {
      validationErrors = utilsValidateUploadStep(formData);
      dispatch(validateUploadStep());
    } else if (currentStep === 1) {
      validationErrors = utilsValidateDetailsStep(formData);
      dispatch(validateDetailsStep());
    }

    setIsValidating(false);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      dispatch(nextStep());
    }
  };

  const handlePrevious = () => {
    dispatch(setShowValidation(false));
    dispatch(previousStep());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateCurrentStep();
    if (isValid) {
      setIsSubmitting(true);
      dispatch(setLoading(true));

      try {
        // Get image files from the StyleUploadStep component
        // @ts-ignore - Accessing custom property from window
        const imageFiles = (window.styleImageFiles || []) as ImageFile[];

        // Create FormData to send files
        const submitData = new FormData();

        // Add style data
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("altText", formData.altText);
        submitData.append("occasions", JSON.stringify(formData.occasions));
        submitData.append("season", formData.season);
        submitData.append("categories", JSON.stringify(formData.categories));
        submitData.append("tags", JSON.stringify(formData.tags));
        submitData.append("colors", JSON.stringify(formData.colors));
        submitData.append(
          "flatteringBodyShapes",
          JSON.stringify(formData.flatteringBodyShapes)
        );
        submitData.append(
          "suitableSkinTones",
          JSON.stringify(formData.suitableSkinTones)
        );
        submitData.append("priceRange", formData.priceRange);
        submitData.append("createdAt", new Date().toISOString());
        if (activePersona?._id) {
          submitData.append("persona", activePersona._id);
        }

        // Add image files
        imageFiles.forEach((imageFile: ImageFile, index: number) => {
          if (imageFile.file) {
            submitData.append("files", imageFile.file);
          }
        });

        // Create the style using FormData
        await createStyle(submitData).unwrap();

        // Show success notification
        setNotification({
          message: "Style created successfully! Redirecting to dashboard...",
          type: "success",
          visible: true,
        });

        // Reset the form
        dispatch(resetForm());

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } catch (error) {
        console.error("Error creating style: ", error);
        setNotification({
          message: "Failed to create style. Please try again.",
          type: "error",
          visible: true,
        });
        dispatch(
          setErrors({ submit: "Failed to create style. Please try again." })
        );
      } finally {
        setIsSubmitting(false);
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step indicator */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Create a New Style
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      index < currentStep
                        ? "bg-burgundy-600 border-burgundy-600 text-white"
                        : index === currentStep
                        ? "border-burgundy-600 text-burgundy-600"
                        : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {index < currentStep ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      index <= currentStep
                        ? "text-burgundy-600"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`w-5 h-0.5 ${
                      index <= currentStep
                        ? "bg-burgundy-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === steps.length - 1) {
              handleSubmit(e);
            }
          }}
        >
          <div className="p-6">
            {/* Display validation errors at the top of the form */}
            {/* <FormError
              errors={errors}
              visible={showValidation && Object.keys(errors).length > 0}
            /> */}

            {/* Display notification */}
            <FormNotification
              message={notification.message}
              type={notification.type}
              visible={notification.visible}
              onClose={() =>
                setNotification((prev) => ({ ...prev, visible: false }))
              }
            />

            {/* Current step component */}
            <div className="py-4">{steps[currentStep].component}</div>
          </div>

          {/* Form navigation */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0 || isSubmitting}
            >
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isLoading || isSubmitting}
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isLoading || isSubmitting}
                isLoading={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit Style"}
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateStyleForm;
