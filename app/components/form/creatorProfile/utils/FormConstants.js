const FORM_INITIAL_STATE = {
  occasion: [],
  ageGroup: [],
  gender: [],
  displayName: "",
  skinTone: [],
  heightGroup: [],
  bodyShape: [],
  colorPreference: [],
  uploadTitle: "",
  imageUpload: null,
  imageDescription: "",
  altText: "",
};

/**
 * Titles for each step of the form
 * @type {Array}
 */
const FORM_TITLES = [
  "How would you describe your fashion style",
  "Your Body Type",
  "Upload your content",
];

/**
 * Descriptions for each step of the form
 * @type {Array}
 */
const FORM_DESCRIPTIONS = [
  "Your inputs help us showcase your fashion content to the right audience that truly appreciates it",
  "Your privacy is important to us. We will handle your data with care and never share it without your consent.",
  "",
];

export { FORM_INITIAL_STATE, FORM_TITLES, FORM_DESCRIPTIONS };
