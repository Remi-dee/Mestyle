import { useContext } from "react";
import { FormContext } from "@/context/form/userProfile/FormContext";

function useFormContext() {
  return useContext(FormContext);
}

export default useFormContext;
