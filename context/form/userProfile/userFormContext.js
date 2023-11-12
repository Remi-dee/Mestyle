"use client";

import React, { createContext, useState } from "react";
import {
  validateBodyType,
  validateStylePreference,
} from "../../../app/components/form/userProfileForm/validationStrategies";

const FormContext = createContext();

function FormProvider({ children }) {
  const formTitle = {
    0: "Your Style Preferences",
    1: "Your Body Type",
  };

  const formDescription = {
    0: "Tell us about what styles you prefer for better outfit recommendations.",
    1: "Tell us a bit about your body type for a tailored experience.",
  };

  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    occasion: [],
    ageGroup: [],
    gender: [],
    styleInspiration: "",
    skinTone: [],
    heightGroup: [],
    bodyShape: [],
    colorPreference: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...(prev[name] || []), value]
            : prev[name].filter((v) => v !== value)
          : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    const newErrors = validateCurrentStep();
    if (
      Object.keys(newErrors).length === 0 &&
      formStep < Object.keys(formTitle).length - 1
    ) {
      setFormStep((current) => current + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateCurrentStep();
    if (Object.keys(newErrors).length === 0) {
      console.log("FormData:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const validateCurrentStep = () => {
    const inputsToValidate =
      formStep === 0 && !formData.styleInspiration
        ? { ...formData, styleInspiration: undefined }
        : formData;
    const validationFunction =
      formStep === 0 ? validateStylePreference : validateBodyType;
    return validationFunction(inputsToValidate);
  };

  const contextValue = {
    formTitle,
    formDescription,
    formStep,
    setFormStep,
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleNext,
    handleSubmit,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}

export { FormContext, FormProvider };
