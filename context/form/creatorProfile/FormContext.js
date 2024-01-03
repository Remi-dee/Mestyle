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
import imageProcessor from "@/lib/ImageProcessor";

const FormContext = createContext();

function FormProvider({ children }) {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

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

  const handleChange = async (e) => {
    const { name, type } = e.target;

    // Handle file input
    if (type === "file") {
      const file = e.target.files[0];
      if (!file) {
        setErrors({ [name]: "No file selected" });
        return;
      }

      setIsLoading(true);
      const result = await imageProcessor.processFile(file);

      if (result.errorMessage) {
        setErrors({ [name]: result.errorMessage });
        setImageSrc("");
      } else if (result.imageSrc) {
        setImageSrc(result.imageSrc);
        setErrors({});
        setFormData((prev) => ({ ...prev, [name]: file }));
      }

      setIsLoading(false);
    } else {
      handleOtherInputChange(e);
    }
  };

  const handleOtherInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
          ? [...(formData[name] || []), value]
          : formData[name].filter((v) => v !== value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
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
    const error = validateUploadContent(formData);

    if (Object.keys(error).length === 0) {
      const data = new FormData();
      for (const key in formData) {
        if (key !== "imageUpload") {
          data.append(key, formData[key]);
        }
      }

      data.append("imageUpload", formData.imageUpload);

      // checking out the url of the uploaded image
      const fileUrl = URL.createObjectURL(formData.imageUpload);
      console.log("Image URL:", fileUrl);

      // checking out FormData
      for (let pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      // Sending `data` to the server can go here
    } else {
      setErrors(error);
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
    setIsLoading,
    isLoading,
    imageSrc,
    setImageSrc,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}

export { FormContext, FormProvider };
