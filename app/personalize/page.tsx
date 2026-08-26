"use client";

import React, { useEffect, useState } from "react";
import PersonaliseScreen from "../components/personalize/PersonalizeScreen";

import NavBar from "../components/landingPage/NavBar/NavBar";
import Form from "../components/personalize/Form";

function template() {
  return (
    <main className="bg-grayLight dark:bg-grayDark font-lexend flex justify-center">
      <div className="max-w-screen-2xl">
        <NavBar isProfile={true} />
        <PersonaliseScreen
          title="Get Personalized Outfit Recommendations"
          description={`At Mestyle, we're dedicated to helping you look and feel your best. To provide you with the most relevant outfit suggestions, please share some information with us. Rest assured that your data is kept secure and used only to enhance your style journey.`}
        >
          <Form />
        </PersonaliseScreen>
      </div>
    </main>
  );
}

export default template;
