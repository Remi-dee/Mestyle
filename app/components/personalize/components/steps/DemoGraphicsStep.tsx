// DemographicsStep.tsx
"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
const ageGroups = ["Under 18", "18-34", "35-54", "55-74", "75 and over"];
const colorOptions = [
  "Black",
  "White",
  "Red",
  "Yellow",
  "Green",
  "Blue",
  "Gray",
  "Neutral",
  "Pink",
  "Purple",
];

function DemographicsStep() {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleCheckboxChange = (name: string, value: string) => {
    const current = formData[name as keyof typeof formData] as string[];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    dispatch(updateFormData({ [name]: updated }));
  };

  const checkboxClass =
    "form-checkbox md:h-5 md:w-5 focus:checked:bg-black checked:bg-black focus:ring-0 rounded-sm hover:checked:bg-black";

  return (
    <div className="min-h-[60vh] px-4 py-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Tell us a bit more about you</h2>
        <p className="text-sm text-white/70">
          These help us better tailor your recommendations and showcase your
          creator persona.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <fieldset>
          <legend className="text-base font-medium mb-2">Gender</legend>
          {genderOptions.map((gender) => (
            <label key={gender} className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                name="gender"
                value={gender}
                checked={formData.gender.includes(gender)}
                onChange={() => handleCheckboxChange("gender", gender)}
                className={checkboxClass}
              />
              <span className="ml-2">{gender}</span>
            </label>
          ))}
          {errors.gender && (
            <p className="text-red-500 text-sm mt-2">{errors.gender}</p>
          )}
        </fieldset>

        <fieldset>
          <legend className="text-base font-medium mb-2">Age Group</legend>
          {ageGroups.map((age) => (
            <label key={age} className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                name="ageGroup"
                value={age}
                checked={formData.ageGroup.includes(age)}
                onChange={() => handleCheckboxChange("ageGroup", age)}
                className={checkboxClass}
              />
              <span className="ml-2">{age}</span>
            </label>
          ))}
          {errors.ageGroup && (
            <p className="text-red-500 text-sm mt-2">{errors.ageGroup}</p>
          )}
        </fieldset>

        {/* Color Preferences */}
        <fieldset className="md:col-span-2">
          <legend className="text-base font-medium mb-2">
            Color Preferences
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4">
            {colorOptions.map((color) => (
              <label key={color} className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  name="colorPreference"
                  value={color}
                  checked={formData.colorPreference?.includes(color) || false}
                  onChange={() =>
                    handleCheckboxChange("colorPreference", color)
                  }
                  className={checkboxClass}
                />
                <span className="ml-2">{color}</span>
              </label>
            ))}
          </div>
          {errors.colorPreference && (
            <p className="text-red-500 text-sm mt-2">
              {errors.colorPreference}
            </p>
          )}
        </fieldset>
      </div>
    </div>
  );
}

export default DemographicsStep;
