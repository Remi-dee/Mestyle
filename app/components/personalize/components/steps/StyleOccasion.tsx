import React from "react";
import OccasionSelection from "./OccasionSelection";
import DisplayNameInput from "./DisplayNameInput";

const StyleOccasionStep = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <OccasionSelection />
      <DisplayNameInput />
    </div>
  );
};

export default StyleOccasionStep;
