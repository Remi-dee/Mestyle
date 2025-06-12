"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import PersonaliseScreen from "@/app/components/personalize/PersonalizeScreen";
import NavBar from "@/app/components/landingPage/NavBar/NavBar";
import Form from "@/app/components/personalize/Form";
import { useGetPersonaByIdQuery } from "@/app/redux/features/persona/personaApi";
import { useDispatch } from "react-redux";
import { setFormData } from "@/app/redux/features/persona/personaSlice";

export default function EditPersona() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: persona,
    isLoading,
    error,
  } = useGetPersonaByIdQuery(id as string, {
    skip: !id,
  });

  useEffect(() => {
    // When persona data is loaded, populate the form
    if (persona) {
      dispatch(setFormData(persona));
    }
  }, [persona, dispatch]);

  if (isLoading) {
    return (
      <main className="bg-grayLight dark:bg-grayDark font-lexend flex justify-center min-h-screen">
        <div className="max-w-screen-2xl w-full">
          <NavBar isProfile={true} />
          <div className="h-screen flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-pulse mb-4">Loading persona data...</div>
              <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !persona) {
    return (
      <main className="bg-grayLight dark:bg-grayDark font-lexend flex justify-center min-h-screen">
        <div className="max-w-screen-2xl w-full">
          <NavBar isProfile={true} />
          <div className="h-screen flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-red-500 text-xl mb-4">
                Error loading persona
              </div>
              <div className="text-white/70">
                Unable to load the persona data. Please try again later.
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-grayLight dark:bg-grayDark font-lexend flex justify-center">
      <div className="max-w-screen-2xl w-full">
        <NavBar isProfile={true} />
        <PersonaliseScreen
          title="Edit Your Style Persona"
          description="Update your style preferences to get more accurate outfit recommendations."
        >
          <Form isEditMode={true} personaId={id as string} />
        </PersonaliseScreen>
      </div>
    </main>
  );
}
