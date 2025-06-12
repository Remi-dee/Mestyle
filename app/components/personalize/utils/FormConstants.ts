export const PERSONA_INITIAL_STATE = {
  // Basic Info - Step 1
  personaName: "",
  gender: "",
  ageGroup: "",

  // Style Preferences - Step 2
  occasion: [] as string[],
  colorPreference: [] as string[],

  // Body Profile - Step 3
  bodyShape: "",
  skinTone: "",
  heightGroup: "",

  // Legacy fields (kept for backward compatibility)
  //   uploadTitle: "",
  //   description: "",
  //   altText: "",
  //   imageUpload: "",
};

// const PERSONA_INITIAL_STATE = {
//   occasion: [],
//   ageGroup: [],
//   gender: [],
//   displayName: "",
//   skinTone: [],
//   heightGroup: [],
//   bodyShape: [],
//   colorPreference: [],
// };
