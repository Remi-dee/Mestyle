import React from "react";

type FormContextType = {
    formTitle: string;
    formDescription: string;
    formStep: number;
    setFormStep: (step: number) => void;
    formData: {};
    setFormData: (data: {}) => void;
    errors: {};
    setErrors: (errors: {}) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setIsLoading: (loading: boolean) => void;
    isLoading: boolean;
    imageSrc: string;
    setImageSrc: (src: string) => void;
  };
  
  
 const FormContext = React.createContext<FormContextType | undefined>(undefined);

 export {FormContext}