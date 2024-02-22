import { appAuth, firebaseConfig } from "@/app/fireBase/firebase";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

const handleSignUp = async ({ email, password }) => {
  try {
    console.log(email, "see it", password);
    const userCredential = await createUserWithEmailAndPassword(
      appAuth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up:", user);
    return { success: true, user };
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }
};

export { handleSignUp };
