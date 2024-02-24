import { appAuth, appFirestore } from "@/app/fireBase/firebase";
import {
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { UseUserSession, updateUserDetails } from "./databaseService";
import { useStateContext } from "../context/stateContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";

async function handleEmailUpdate(newEmail) {
  try {
    await updateEmail(appAuth.currentUser, newEmail);
    await updateUserDetails(newEmail);
    return { success: true };
  } catch (error) {
    console.error("Error updating email:", error);
    alert(`Error updating email:", ${error}`);
  }
}

async function handlePasswordUpdate(newPassword) {
  try {
    await updatePassword(appAuth.currentUser, newPassword);

    return { success: true };
  } catch (error) {
    console.error("Error updating email:", error);
    alert(`Error updating email:", ${error}`);
  }
}

const UpdateUsername = async (username, userData) => {
  try {
    const user = appAuth.currentUser;
    const owner = doc(appFirestore, user.uid, user.displayName);
    if (user) {
      await updateProfile(user, { displayName: username });

      const { email, phoneNumber } = userData;
     

      const dataToUpdate = {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      };
      await updateDoc(owner, dataToUpdate);
    
      return { success: true };
    }
  } catch (error) {
    console.error("Error Updating Username:", error.message);
    alert(`Error updating Username:, ${error.message}`);
    return { success: false, error: error.message };
  }
};

async function completeSignUp(user, uid) {
  const newDocRef = doc(appFirestore, uid, user.username);

  const dataToSet = {
    username: user.username,
    email: user.email,
    phoneNumber: user.mobile,
    createdAt: new Date(),
  };

  try {
    await setDoc(newDocRef, dataToSet);
  
    return { success: true };
  } catch (error) {
    console.error("Error writing document: ", error);
    return { success: false, error: error.message };
  }
}

async function logoutUser() {
  try {
    await signOut(appAuth);
    return { success: true };
  } catch (error) {
    console.log(error.message);
  }
}

export {
  handleEmailUpdate,
  handlePasswordUpdate,
  logoutUser,
  UpdateUsername,
  completeSignUp,
};
