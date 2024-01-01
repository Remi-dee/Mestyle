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
    // You can redirect the user or perform other actions upon successful sign-up
  } catch (error) {
    console.error("Error signing up:", error.message);
    // Handle the error, display a message, etc.
  }
};

export { handleSignUp };
