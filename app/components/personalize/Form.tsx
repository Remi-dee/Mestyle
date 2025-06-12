// Form.tsx
"use client";

import {
  selectPersona,
  resetForm,
} from "@/app/redux/features/persona/personaSlice";
import FormContainer from "./components/FormContainer";
import StepNavigation from "./components/StepNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import BasicInfoStep from "./components/steps/BasicInfoStep";
import StylePreferencesStep from "./components/steps/StylePreferencesStep";
import BodyProfileStep from "./components/steps/BodyProfileSetup";
import { useSelector, useDispatch } from "react-redux";
import { pageVariants } from "../../composables/motion/motionConfigs";
import ProgressBar from "./components/ui/ProgressBar";

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

interface FormProps {
  isEditMode?: boolean;
  personaId?: string;
}

export default function Form({ isEditMode = false, personaId }: FormProps) {
  const dispatch = useDispatch();
  const { formStep } = useSelector(selectPersona);

  // Only reset form when in create mode (not edit mode)
  useEffect(() => {
    if (!isEditMode) {
      dispatch(resetForm());
    }
  }, [dispatch, isEditMode]);

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
        <motion.div key={formStep} {...pageVariants}>
          {steps[formStep]?.component}
        </motion.div>
      </AnimatePresence>

      <StepNavigation
        steps={steps}
        isEditMode={isEditMode}
        personaId={personaId}
      />
    </FormContainer>
  );
}
