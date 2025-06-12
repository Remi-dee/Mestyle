import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface StyleFormData {
  title: string;
  description: string;
  altText: string;
  occasions: string[];
  season: string;
  categories: string[];
  tags: string[];
  priceRange: string;
  imagesPreview: string; // JSON string of image previews
  [key: string]: any;
}

export interface StyleContentState {
  formStep: number;
  formData: StyleFormData;
  errors: Record<string, string>;
  isLoading: boolean;
  showValidation: boolean;
}

const initialState: StyleContentState = {
  formStep: 0,
  formData: {
    title: "",
    description: "",
    altText: "",
    occasions: [],
    season: "",
    categories: [],
    tags: [],
    priceRange: "",
    imagesPreview: "[]", // Initialize as empty JSON array string
  },
  errors: {},
  isLoading: false,
  showValidation: false,
};

export const styleContentSlice = createSlice({
  name: "styleContent",
  initialState,
  reducers: {
    setFormStep: (state, action: PayloadAction<number>) => {
      state.formStep = action.payload;
      state.showValidation = false;
    },

    nextStep: (state) => {
      state.formStep += 1;
      state.showValidation = false;
    },

    previousStep: (state) => {
      if (state.formStep > 0) {
        state.formStep -= 1;
        state.showValidation = false;
      }
    },

    updateFormField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      state.formData[action.payload.field] = action.payload.value;

      // Clear error for the updated field
      if (state.errors[action.payload.field]) {
        delete state.errors[action.payload.field];
      }
    },

    updateImageField: (
      state,
      action: PayloadAction<{
        field: string;
        preview: string;
      }>
    ) => {
      const { field, preview } = action.payload;
      state.formData.imagesPreview = preview;

      // Clear error for the updated field
      if (state.errors["imagesPreview"]) {
        delete state.errors["imagesPreview"];
      }
    },

    updateCheckboxField: (
      state,
      action: PayloadAction<{ field: string; value: string; checked: boolean }>
    ) => {
      const { field, value, checked } = action.payload;

      if (!Array.isArray(state.formData[field])) {
        state.formData[field] = [];
      }

      if (checked) {
        if (!state.formData[field].includes(value)) {
          state.formData[field].push(value);
        }
      } else {
        state.formData[field] = state.formData[field].filter(
          (item: string) => item !== value
        );
      }

      // Clear error for the updated field
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },

    addTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.trim();

      if (tag && tag.length > 0) {
        if (!state.formData.tags) {
          state.formData.tags = [tag];
        } else if (!state.formData.tags.includes(tag)) {
          state.formData.tags.push(tag);
        }
      }
    },

    removeTag: (state, action: PayloadAction<string>) => {
      state.formData.tags = state.formData.tags.filter(
        (tag) => tag !== action.payload
      );
    },

    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },

    setShowValidation: (state, action: PayloadAction<boolean>) => {
      state.showValidation = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    resetForm: (state) => {
      return initialState;
    },

    // Validation actions
    validateUploadStep: (state) => {
      const errors: Record<string, string> = {};

      try {
        const images = JSON.parse(state.formData.images || "[]");
        if (!images || images.length === 0) {
          errors.images = "At least one image is required";
        }
      } catch (e) {
        errors.images = "At least one image is required";
      }

      state.errors = errors;
      state.showValidation = true;
    },

    validateDetailsStep: (state) => {
      const errors: Record<string, string> = {};
      const { title, description, season, occasions } = state.formData;

      if (!title || title.trim() === "") {
        errors.title = "Title is required";
      }

      // if (!description || description.trim() === "") {
      //   errors.description = "Description is required";
      // } else if (description.length > 500) {
      //   errors.description = "Description must be 500 characters or less";
      // }

      // if (!season || season === "") {
      //   errors.season = "Please select a season";
      // }

      // if (!occasions || occasions.length === 0) {
      //   errors.occasions = "Please select at least one occasion";
      // }

      state.errors = errors;
      state.showValidation = true;
    },

    validateTagsStep: (state) => {
      const errors: Record<string, string> = {};
      const { categories, altText, priceRange } = state.formData;

      if (!categories || categories.length === 0) {
        errors.categories = "Please select at least one category";
      }

      if (!altText || altText.trim() === "") {
        errors.altText = "Alt text is required for accessibility";
      }

      if (!priceRange || priceRange.trim() === "") {
        errors.priceRange = "Please select a price range";
      }

      state.errors = errors;
      state.showValidation = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFormStep,
  nextStep,
  previousStep,
  updateFormField,
  updateImageField,
  updateCheckboxField,
  addTag,
  removeTag,
  setErrors,
  setShowValidation,
  setLoading,
  resetForm,
  validateUploadStep,
  validateDetailsStep,
  validateTagsStep,
} = styleContentSlice.actions;

// Selectors
export const selectFormStep = (state: RootState) => state.styleContent.formStep;
export const selectFormData = (state: RootState) => state.styleContent.formData;
export const selectErrors = (state: RootState) => state.styleContent.errors;
export const selectIsLoading = (state: RootState) =>
  state.styleContent.isLoading;
export const selectShowValidation = (state: RootState) =>
  state.styleContent.showValidation;
export const selectValidationState = (state: RootState) =>
  Object.keys(state.styleContent.errors).length === 0;

export default styleContentSlice.reducer;
