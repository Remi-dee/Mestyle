"use client";

import { appAuth, appFirestore } from "@/app/fireBase/firebase";
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";

import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

// Function to upload an image to Firestore Storage
const uploadImageToStorage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw error;
  }
};

const storeDocumentWithImage = async (
  title: string,
  description: string,
  imageUrl: string
): Promise<void> => {
  try {
    const user = appAuth.currentUser;
    if (user == null) {
      throw new Error("User not found!");
    }

    const creatorContent = doc(appFirestore, "creatorContent");

    const data = {
      title,
      description,
      imageUrl,
      // Add other fields based on your data model
    };
    const docRef = await setDoc(creatorContent, data);

    return docRef;
  } catch (error) {
    console.error("Error storing document with image:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export { storeDocumentWithImage, uploadImageToStorage };
