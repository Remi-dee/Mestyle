// Define the FormData interface locally instead of importing from a deleted context
export interface FormData {
  // Image fields
  images?: string; // JSON string of image previews
  imagesPreview?: string;

  // Style details
  title?: string;
  description?: string;
  altText?: string;
  season?: string;
  occasions?: string[];
  categories?: string[];
  tags?: string[];
  priceRange?: string;
  [key: string]: any;
}

/**
 * Validates the upload step of the style creation form
 */
export const validateUploadStep = (
  formData: FormData
): Record<string, string> => {
  const errors: Record<string, string> = {};

  try {
    const images = formData.imagesPreview
      ? JSON.parse(formData.imagesPreview)
      : [];
    if (!images || !Array.isArray(images) || images.length === 0) {
      errors.imagesPreview = "At least one image is required";
    }
  } catch (e) {
    errors.imagesPreview = "At least one image is required";
  }

  return errors;
};

/**
 * Validates the details step of the style creation form
 */
export const validateDetailsStep = (
  formData: FormData
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.title || formData.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = "Description must be 500 characters or less";
  }

  return errors;
};

/**
 * Validates the tags step of the style creation form
 */
export const validateTagsStep = (
  formData: FormData
): Record<string, string> => {
  const errors: Record<string, string> = {};
  return errors;
};

/**
 * File size validation (10MB max)
 */
export const validateFileSize = (file: File): boolean => {
  // 10MB in bytes
  const maxSize = 10 * 1024 * 1024;
  return file.size <= maxSize;
};

/**
 * File type validation (image only)
 */
export const validateFileType = (file: File): boolean => {
  return file.type.startsWith("image/");
};
