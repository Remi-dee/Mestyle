import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import {
  validateBasicInfo,
  validateStylePreferences,
  validateBodyProfile,
} from "@/app/components/personalize/components/utils/validation";
import { PERSONA_INITIAL_STATE } from "@/app/components/personalize/components/utils/FormConstants";


export type PersonaDataType = typeof PERSONA_INITIAL_STATE;

interface personaState {
  formStep: number;
  formData: PersonaDataType;
  errors: Partial<Record<keyof PersonaDataType, string>>;
}

const initialState: personaState = {
  formStep: 0,
  formData: PERSONA_INITIAL_STATE,
  errors: {},
};

const personaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    updateField: <K extends keyof PersonaDataType>(
      state,
      action: PayloadAction<{ name: K; value: PersonaDataType[K] }>
    ) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
      delete state.errors[name];
    },

    updateFormData: (
      state,
      action: PayloadAction<Partial<PersonaDataType>>
    ) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };

      // Clear errors for updated fields
      for (const key in action.payload) {
        delete state.errors[key as keyof PersonaDataType];
      }
    },

    setErrors: (
      state,
      action: PayloadAction<Partial<Record<keyof PersonaDataType, string>>>
    ) => {
      state.errors = action.payload;
    },

    nextStep: (state) => {
      // Define which validation function to use based on current step
      const validations = [
        validateBasicInfo,
        validateStylePreferences,
        validateBodyProfile,
      ];

      const validator = validations[state.formStep];

      if (!validator) {
        console.log("No validator found for step", state.formStep);
        return;
      }

      // Run validation and check if there are errors
      const errors = validator(state.formData);

      console.log("Step:", state.formStep);
      console.log("Form data:", JSON.stringify(state.formData));
      console.log("Errors:", JSON.stringify(errors));

      if (Object.keys(errors).length === 0) {
        // No errors, proceed to next step
        state.formStep += 1;
        state.errors = {};
        console.log("Moving to step:", state.formStep);
      } else {
        // Errors found, update state with error messages
        state.errors = errors;
        console.log("Validation failed, staying on step:", state.formStep);
      }
    },

    goToStep: (state, action: PayloadAction<number>) => {
      state.formStep = action.payload;
    },

    resetForm: (state) => {
      state.formStep = 0;
      state.formData = PERSONA_INITIAL_STATE;
      state.errors = {};
    },
  },
});

export const {
  updateField,
  updateFormData,
  setErrors,
  nextStep,
  resetForm,
  goToStep,
} = personaSlice.actions;

export default personaSlice.reducer;

// Selectors
export const selectPersona = (state: RootState) => state.persona;

export const selectFormErrors = (state: RootState) => state.persona.errors;
export const selectFormStep = (state: RootState) => state.persona.formStep;
