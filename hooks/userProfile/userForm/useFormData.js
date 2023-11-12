import { useContext } from "react";
import { FormContext } from "../../../context/form/userProfile/userFormContext";

function useFormData() {
  return useContext(FormContext);
}

export default useFormData;
