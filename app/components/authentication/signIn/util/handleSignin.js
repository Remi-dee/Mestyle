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
    // You can redirect the user or perform other actions upon successful sign-in
  } catch (error) {
    console.error("Error signing in:", error.message);
    // Handle the error, display a message, etc.
  }
};

export { handleSignIn };
