import { createContext, useEffect, useState } from "react";

import {
  FORM_DESCRIPTIONS,
  FORM_INITIAL_STATE,
  FORM_TITLES,
} from "@/app/components/form/creatorProfile/utils/FormConstants";

import {
  validateBodyType,
  validateFashionStyle,
  validateUploadContent,
} from "@/app/components/form/creatorProfile/utils/Validation";

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

  const handleNext = (event) => {
    event.preventDefault();

    const validationFunctions = [
      validateFashionStyle,
      validateBodyType,
      validateUploadContent,
    ];

    // we use the formStep as an index to get the correct validation function
    const validate = validationFunctions[formStep];
    if (!validate) {
      console.warn(`No validation defined for form step ${formStep}`);
      return;
    }

    const validationErrors = validate(formData);

    if (
      Object.keys(validationErrors).length === 0 &&
      formStep < validationFunctions.length - 1
    ) {
      setFormStep((current) => current + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FormData:", JSON.stringify(formData));
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
