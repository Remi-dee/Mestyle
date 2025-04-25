// Form.tsx
"use client";

import { selectPersona } from "@/app/redux/features/persona/personaSlice";
import FormContainer from "./components/FormContainer";
import StepNavigation from "./components/StepNavigation";
import { motion, AnimatePresence } from "framer-motion";

import BasicInfoStep from "./components/steps/BasicInfoStep";
import StylePreferencesStep from "./components/steps/StylePreferencesStep";
import BodyProfileStep from "./components/steps/BodyProfileSetup";
import { useSelector } from "react-redux";

const steps = [
  {
    label: "Basic Info",
    component: <BasicInfoStep />,
    validate: "validateBasicInfo",
  },
  {
    label: "Style Preferences",
    component: <StylePreferencesStep />,
    validate: "validateStylePreferences",
  },
  {
    label: "Body Profile",
    component: <BodyProfileStep />,
    validate: "validateBodyProfile",
  },
];

export default function Form() {
  const { formStep } = useSelector(selectPersona);

  return (
    <FormContainer>
      <div className="mb-6">
        <ProgressBar
          currentStep={formStep}
          totalSteps={steps.length}
          labels={steps.map((s) => s.label)}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={formStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {steps[formStep]?.component}
        </motion.div>
      </AnimatePresence>

      <StepNavigation steps={steps} />
    </FormContainer>
  );
}

const ProgressBar = ({ currentStep, totalSteps, labels }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${
              index <= currentStep ? "text-purple-500" : "text-gray-400"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <motion.div
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </div>
  );
};
