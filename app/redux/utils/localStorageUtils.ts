/**
 * Safely gets an item from localStorage with error handling
 * @param key The key to get from localStorage
 * @returns The value from localStorage or null if not found/error
 */
export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window === "undefined") {
    return null; // Return null on server-side
  }

  try {
    const item = localStorage.getItem(key);
    return item;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * Safely sets an item in localStorage with error handling
 * @param key The key to set in localStorage
 * @param value The value to store
 * @returns true if successful, false if there was an error
 */
export const setInLocalStorage = (key: string, value: string): boolean => {
  if (typeof window === "undefined") {
    return false; // Can't set on server-side
  }

  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Safely removes an item from localStorage with error handling
 * @param key The key to remove from localStorage
 * @returns true if successful, false if there was an error
 */
export const removeFromLocalStorage = (key: string): boolean => {
  if (typeof window === "undefined") {
    return false; // Can't remove on server-side
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};
