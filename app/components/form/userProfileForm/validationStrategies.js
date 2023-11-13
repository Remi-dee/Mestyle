const isNonEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;
const isSafeText = (str) => /^[a-zA-Z0-9\s.,'!?-]+$/.test(str);

const errorMessages = {
  occasion: "Please select at least one occasion.",
  ageGroup: "Please select an age group.",
  gender: "Please select a gender option.",
  styleInspiration:
    "Please provide your style inspiration using safe characters.",
  skinTone: "Please select a skin tone option.",
  heightGroup: "Please select a height group.",
  bodyShape: "Please select a body shape.",
  colorPreference: "Please select your color preference.",
};

class Validator {
  constructor(nextValidator) {
    this.nextValidator = nextValidator;
  }

  validate(data, errors) {
    if (this.nextValidator != null) {
      return this.nextValidator.validate(data, errors);
    }
    return errors;
  }
}

class OccasionValidator extends Validator {
  validate(data, errors) {
    errors.occasion = isNonEmptyArray(data.occasion)
      ? ""
      : errorMessages.occasion;
    return super.validate(data, errors);
  }
}

class AgeGroupValidator extends Validator {
  validate(data, errors) {
    errors.ageGroup = isNonEmptyArray(data.ageGroup)
      ? ""
      : errorMessages.ageGroup;
    return super.validate(data, errors);
  }
}

class GenderValidator extends Validator {
  validate(data, errors) {
    errors.gender = isNonEmptyArray(data.gender) ? "" : errorMessages.gender;
    return super.validate(data, errors);
  }
}

class StyleInspirationValidator extends Validator {
  validate(data, errors) {
    errors.styleInspiration = isSafeText(data.styleInspiration)
      ? ""
      : errorMessages.styleInspiration;
    return super.validate(data, errors);
  }
}

class SkinToneValidator extends Validator {
  validate(data, errors) {
    errors.skinTone = isNonEmptyArray(data.skinTone)
      ? ""
      : errorMessages.skinTone;
    return super.validate(data, errors);
  }
}

class HeightGroupValidator extends Validator {
  validate(data, errors) {
    errors.heightGroup = isNonEmptyArray(data.heightGroup)
      ? ""
      : errorMessages.heightGroup;
    return super.validate(data, errors);
  }
}

class BodyShapeValidator extends Validator {
  validate(data, errors) {
    errors.bodyShape = isNonEmptyArray(data.bodyShape)
      ? ""
      : errorMessages.bodyShape;
    return super.validate(data, errors);
  }
}

class ColorPreferenceValidator extends Validator {
  validate(data, errors) {
    errors.colorPreference = isNonEmptyArray(data.colorPreference)
      ? ""
      : errorMessages.colorPreference;
    return super.validate(data, errors);
  }
}

function removeEmptyErrors(errors) {
  Object.keys(errors).forEach((key) => {
    if (errors[key] === "") {
      delete errors[key];
    }
  });
}

function validateStylePreference(data) {
  const chain = new OccasionValidator(
    new AgeGroupValidator(
      new GenderValidator(new StyleInspirationValidator(null))
    )
  );
  const errors = {};
  chain.validate(data, errors);
  removeEmptyErrors(errors);
  return errors;
}

function validateBodyType(data) {
  const chain = new SkinToneValidator(
    new HeightGroupValidator(
      new BodyShapeValidator(new ColorPreferenceValidator(null))
    )
  );
  const errors = {};
  chain.validate(data, errors);
  removeEmptyErrors(errors);
  return errors;
}

export { validateStylePreference, validateBodyType };
