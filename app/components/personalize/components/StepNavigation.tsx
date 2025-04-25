// components/StepNavigation.tsx
"use client";

import {
  goToStep,
  nextStep,
  selectPersona,
} from "@/app/redux/features/persona/personaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  steps: Array<{ label: string; component: React.ReactNode; validate: string }>;
};

export default function StepNavigation({ steps }: Props) {
  const dispatch = useDispatch();
  const { formStep, errors } = useSelector(selectPersona);
  const [hasErrors, setHasErrors] = useState(false);

  // Check if there are any validation errors
  useEffect(() => {
    setHasErrors(Object.keys(errors).length > 0);
  }, [errors]);

  const isLastStep = formStep === steps.length - 1;
  const isFirstStep = formStep === 0;

  const handleNext = () => {
    // Log current state to help debugging
    console.log("Current step:", formStep);
    console.log("Current errors:", errors);

    // Dispatch action to validate and move to next step
    dispatch(nextStep());
  };

  const handlePrev = () => {
    dispatch(goToStep(formStep - 1));
  };

  const handleSubmit = () => {
    // Replace with actual submission logic later
    console.log("Submitting form...");
    alert("Form submitted successfully!");
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.15 } },
    tap: { scale: 0.95, transition: { duration: 0.08 } },
    disabled: { scale: 1, opacity: 0.6 },
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Error summary - show if there are validation errors */}
      <AnimatePresence>
        {hasErrors && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-3 bg-red-500/20 border border-red-500 rounded-md"
          >
            <h3 className="text-red-400 font-medium mb-1">
              Please fix the following errors:
            </h3>
            <ul className="list-disc pl-5">
              {Object.entries(errors).map(([field, message]) => (
                <motion.li
                  key={field}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                  className="text-red-400 text-sm"
                >
                  {message}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <motion.button
          disabled={isFirstStep}
          onClick={handlePrev}
          variants={buttonVariants}
          whileHover={isFirstStep ? "disabled" : "hover"}
          whileTap={isFirstStep ? "disabled" : "tap"}
          className={`px-4 py-2 rounded-md ${
            isFirstStep
              ? "bg-gray-600/40 text-gray-400 cursor-not-allowed"
              : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
          }`}
        >
          Back
        </motion.button>

        {isLastStep ? (
          <motion.button
            onClick={handleSubmit}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-4 py-2 rounded-md bg-green-500 text-white"
          >
            Submit
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-4 py-2 rounded-md bg-purple-600 text-white"
          >
            Next
          </motion.button>
        )}
      </div>
    </div>
  );
}
