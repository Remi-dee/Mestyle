"use client";

import React, { useEffect, useState } from "react";
import PersonaliseScreen from "../components/ui/personaliseScreen/template";
import { FormProvider } from "@/context/form/userProfile/FormContext";
import Form from "../components/form/userProfile/template";
import NavBar from "../components/landingPage/NavBar/NavBar";

function template() {
  return (
    <main className="bg-grayLight dark:bg-grayDark font-lexend  flex justify-center">
      <div className="max-w-screen-2xl">
        <NavBar isProfile={true} />
        <PersonaliseScreen
          title="Get Personalized Outfit Recommendations"
          description={`At Mestyle, we're dedicated to helping you look and feel your best. To provide you with the most relevant outfit suggestions, please share some information with us. Rest assured that your data is kept secure and used only to enhance your style journey.`}
        >
          <FormProvider>
            <Form />
          </FormProvider>
        </PersonaliseScreen>
      </div>
    </main>
  );
}

export default template;
