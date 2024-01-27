import { appAuth, firebaseConfig } from "@/app/fireBase/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

const handleSignIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      appAuth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
    return { success: true, user };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { success: false, error: error.message };
    // Handle the error, display a message, etc.
  }
};

export { handleSignIn };
