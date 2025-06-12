"use client";

import React from "react";
import CreateStyleForm from "../components/creator/CreateStyleForm";
import NavBar from "../components/landingPage/NavBar/NavBar";

const CreatorPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-lexend">
      <NavBar isProfile={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create New Style
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Share your personal style with the MeStyle community. Upload photos
            and add details to inspire others.
          </p>
        </div>

        <CreateStyleForm />
      </div>
    </main>
  );
};

export default CreatorPage;
