"use client";

import { createContext, useEffect, useState } from "react";

import {
  FORM_DESCRIPTIONS,
  FORM_INITIAL_STATE,
  FORM_TITLES,
} from "@/app/components/form/userProfile/utils/FormConstants";

import {
  validateBodyType,
  validateStylePreference,
} from "@/app/components/form/userProfile/utils/Validation";

const FormContext = createContext();

function FormProvider({ children }) {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (Object.keys(formData).some((key) => formData[key].length > 0)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData]);

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

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = validateStylePreference(formData);
    if (
      Object.keys(newErrors).length === 0 &&
      formStep < Object.keys(FORM_TITLES).length - 1
    ) {
      setFormStep((current) => current + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateBodyType(formData);
    if (Object.keys(newErrors).length === 0) {
      console.log("FormData:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const contextValue = {
    formTitle: FORM_TITLES[formStep],
    formDescription: FORM_DESCRIPTIONS[formStep],
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
