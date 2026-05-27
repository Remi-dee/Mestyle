import { PERSONA_INITIAL_STATE } from "@/app/components/personalize/utils/FormConstants";

type CreatorFormData = typeof PERSONA_INITIAL_STATE;

const isNonEmptyArray = (arr: any): boolean =>
  Array.isArray(arr) && arr.length > 0;

const isSafeText = (str: string): boolean => /^[a-zA-Z0-9\s.,'!?-]+$/.test(str);

const errorMessages = {
  occasion: "Please select at least one occasion.",
  ageGroup: "Please select an age group.",
  gender: "Please select a gender option.",
  personaName: "Please provide a name for this persona.",
  skinTone: "Please select a skin tone option.",
  heightGroup: "Please select a height group.",
  bodyShape: "Please select a body shape.",
  colorPreference: "Please select your color preference.",
  uploadTitle: "Please provide a title for your content.",
  imageUpload: "Please provide an image for your content.",
  description: "Please provide a description for your content.",
  altText: "Please provide an alt text for your content.",
  isBadCharacter: "Please provide a valid character.",
};

type ValidationErrors = Record<string, string>;

abstract class Validator {
  protected nextValidator?: Validator;

  constructor(nextValidator?: Validator) {
    this.nextValidator = nextValidator;
  }

  validate(data: CreatorFormData, errors: ValidationErrors): ValidationErrors {
    if (this.nextValidator) {
      return this.nextValidator.validate(data, errors);
    }
    return errors;
  }
}

class OccasionValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    if (!isNonEmptyArray(data.occasion)) {
      errors.occasion = errorMessages.occasion;
    }
    return super.validate(data, errors);
  }
}

class AgeGroupValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    console.log("Validating ageGroup:", data.ageGroup);
    // Check if ageGroup is a non-empty string
    if (!data.ageGroup) {
      console.log("Age group is empty or invalid");
      errors.ageGroup = errorMessages.ageGroup;
    }
    return super.validate(data, errors);
  }
}

class GenderValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    console.log("Validating gender:", data.gender);
    // Check if gender is a non-empty string
    if (!data.gender) {
      console.log("Gender is empty or invalid");
      errors.gender = errorMessages.gender;
    }
    return super.validate(data, errors);
  }
}

class PersonaNameValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    console.log("Validating personaName:", data.personaName);
    if (!data.personaName) {
      errors.personaName = errorMessages.personaName;
    } else if (!isSafeText(data.personaName)) {
      errors.personaName = errorMessages.isBadCharacter;
    }
    return super.validate(data, errors);
  }
}

class SkinToneValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    if (!data.skinTone) {
      errors.skinTone = errorMessages.skinTone;
    }
    return super.validate(data, errors);
  }
}

class HeightGroupValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    if (!data.heightGroup) {
      errors.heightGroup = errorMessages.heightGroup;
    }
    return super.validate(data, errors);
  }
}

class BodyShapeValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    if (!data.bodyShape) {
      errors.bodyShape = errorMessages.bodyShape;
    }
    return super.validate(data, errors);
  }
}

class ColorPreferenceValidator extends Validator {
  validate(data: CreatorFormData, errors: ValidationErrors) {
    if (!isNonEmptyArray(data.colorPreference)) {
      errors.colorPreference = errorMessages.colorPreference;
    }
    return super.validate(data, errors);
  }
}

// class UploadTitleValidator extends Validator {
//   validate(data: CreatorFormData, errors: ValidationErrors) {
//     if (!data.uploadTitle) {
//       errors.uploadTitle = errorMessages.uploadTitle;
//     } else if (!isSafeText(data.uploadTitle)) {
//       errors.uploadTitle = errorMessages.isBadCharacter;
//     }
//     return super.validate(data, errors);
//   }
// }

// class ImageUploadValidator extends Validator {
//   validate(data: CreatorFormData, errors: ValidationErrors) {
//     if (!data.imageUpload) {
//       errors.imageUpload = errorMessages.imageUpload;
//     }
//     return super.validate(data, errors);
//   }
// }

// class DescriptionValidator extends Validator {
//   validate(data: CreatorFormData, errors: ValidationErrors) {
//     if (!data.description) {
//       errors.description = errorMessages.description;
//     } else if (!isSafeText(data.description)) {
//       errors.description = errorMessages.isBadCharacter;
//     }
//     return super.validate(data, errors);
//   }
// }

// class AltTextValidator extends Validator {
//   validate(data: CreatorFormData, errors: ValidationErrors) {
//     if (!data.altText) {
//       errors.altText = errorMessages.altText;
//     } else if (!isSafeText(data.altText)) {
//       errors.altText = errorMessages.isBadCharacter;
//     }
//     return super.validate(data, errors);
//   }
// }

function removeEmptyErrors(errors: ValidationErrors) {
  for (const key in errors) {
    if (errors[key] === "") delete errors[key];
  }
}

// Step 1: Basic Info (Persona Name, Gender, Age Group)
export function validateBasicInfo(data: CreatorFormData): ValidationErrors {
  console.log("Running basic info validation with data:", JSON.stringify(data));
  const chain = new PersonaNameValidator(new AgeGroupValidator(null));

  const errors: ValidationErrors = {};
  chain.validate(data, errors);
  removeEmptyErrors(errors);
  console.log("Basic info validation result:", JSON.stringify(errors));
  return errors;
}

// Step 2: Style Preferences (Occasions, Color Preferences)
export function validateStylePreferences(
  data: CreatorFormData
): ValidationErrors {
  console.log("Running style preferences validation");
  const chain = new OccasionValidator(new ColorPreferenceValidator(null));
  const errors: ValidationErrors = {};
  chain.validate(data, errors);
  removeEmptyErrors(errors);
  return errors;
}

// Step 3: Body Profile (Body Shape, Skin Tone, Height)
export function validateBodyProfile(data: CreatorFormData): ValidationErrors {
  console.log("Running body profile validation");
  const chain = new BodyShapeValidator(
    new SkinToneValidator(new HeightGroupValidator(null))
  );
  const errors: ValidationErrors = {};
  chain.validate(data, errors);
  removeEmptyErrors(errors);
  return errors;
}

// Legacy validation functions - keep for backward compatibility
export function validateFashionStyle(data: CreatorFormData): ValidationErrors {
  return validateBasicInfo(data);
}

export function validateBodyType(data: CreatorFormData): ValidationErrors {
  return validateStylePreferences(data);
}

export function validateUploadContent(data: CreatorFormData): ValidationErrors {
  return validateBodyProfile(data);
}

// For backward compatibility
export function validateOccasionStep(data: CreatorFormData): ValidationErrors {
  return validateBasicInfo(data);
}

export function validateDemographicsStep(
  data: CreatorFormData
): ValidationErrors {
  return validateStylePreferences(data);
}

export function validateBodyProfileStep(
  data: CreatorFormData
): ValidationErrors {
  return validateBodyProfile(data);
}
