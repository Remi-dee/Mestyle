"use client";

import {
  PersonaDataType,
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import SkinToneSelector from "../SkinToneSelector";
import BodyShapeSelector from "../BodyShape";

function BodyProfileStep() {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleRadioChange = (field: string, value: string) => {
    dispatch(updateFormData({ [field]: value }));
  };

  return (
    <div className="min-h-[60vh] px-4 py-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Your Body Profile</h2>
        <p className="text-sm text-white/70">
          Help us understand your physical features to recommend the most
          flattering styles.
        </p>
      </div>

      {/* Body Shape */}
      <BodyShapeSelector />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skin Tone */}
        <SkinToneSelector />

        {/* Height */}
        <fieldset className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-2">
          <legend className="text-white text-lg font-semibold">
            Your Height
          </legend>
          <div className="space-y-2">
            {[
              "Under 5'",
              "5' - 5'4\"",
              "5'5\" - 5'9\"",
              "5'10\" - 6'",
              "Over 6'",
            ].map((height) => (
              <label
                key={height}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="heightGroup"
                  value={height}
                  checked={formData.heightGroup?.toString() === height}
                  onChange={() => handleRadioChange("heightGroup", height)}
                  className="form-radio h-5 w-5 text-purple-600 focus:ring-purple-500"
                />
                <span>{height}</span>
              </label>
            ))}
          </div>
          {errors?.heightGroup && (
            <p className="text-red-500 text-sm mt-2">{errors.heightGroup}</p>
          )}
        </fieldset>
      </div>
    </div>
  );
}

export default BodyProfileStep;
