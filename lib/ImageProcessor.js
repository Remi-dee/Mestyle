const MAX_FILE_SIZE = 20971520; // 20MB
const VALID_IMAGE_HEADERS = {
  jpeg: ["ffd8ffe0", "ffd8ffe1", "ffd8ffe2", "ffd8ffe3", "ffd8ffe8"],
  png: "89504e47",
  gif: "47494638",
};

/**
 * Validates the image file size and type.
 * @param {File} file - The file to be validated.
 * @returns {string[]} - An array of error messages if the file is invalid.
 */
const validateImageFile = (file) => {
  const errors = [];

  if (file.size > MAX_FILE_SIZE) {
    errors.push("File is too large. Please upload an image less than 20MB.");
  }

  if (!file.type.startsWith("image/")) {
    errors.push(
      "Invalid file type. Please upload an image (JPG, PNG, or GIF)."
    );
  }

  return errors;
};

/**
 * Reads the first few bytes of the file to validate its header.
 * @param {File} file - The file to be validated.
 * @returns {Promise<object>} - A promise that resolves with an object containing either an error message or an empty object.
 */
const validateImageHeader = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const array = new Uint8Array(evt.target.result);
        const header = array
          .subarray(0, 4)
          .reduce((acc, byte) => acc + byte.toString(16), "");

        if (
          !VALID_IMAGE_HEADERS.jpeg.includes(header) &&
          header !== VALID_IMAGE_HEADERS.png &&
          header !== VALID_IMAGE_HEADERS.gif
        ) {
          resolve({
            errorMessage:
              "Invalid file content. Please upload a valid image (JPG, PNG, or GIF).",
          });
        } else {
          resolve({});
        }
      }
    };

    reader.onerror = () => {
      resolve({
        errorMessage: "There was a problem reading the file. Please try again.",
      });
    };

    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

const imageProcessor = {
  /**
   * Processes the file by validating its size, type, and header, and then reading its content.
   * @param {File} file - The file to be processed.
   * @returns {Promise<object>} - A promise that resolves with an object containing either an error message or imageSrc.
   */
  async processFile(file) {
    const sizeAndTypeErrors = validateImageFile(file);
    if (sizeAndTypeErrors.length > 0) {
      return { errorMessage: sizeAndTypeErrors.join(" ") };
    }

    const headerValidationResult = await validateImageHeader(file);
    if (headerValidationResult.errorMessage) {
      return headerValidationResult;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({ imageSrc: event.target.result });
      };

      reader.onerror = () => {
        resolve({
          errorMessage:
            "There was a problem reading the file. Please try again.",
        });
      };

      reader.readAsDataURL(file);
    });
  },
};

export default imageProcessor;
