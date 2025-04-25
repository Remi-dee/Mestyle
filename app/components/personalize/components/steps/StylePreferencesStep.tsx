"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Define color options with visual information
const colorOptions = [
  { name: "Black", hex: "#000000", group: "Neutral" },
  { name: "White", hex: "#FFFFFF", group: "Neutral" },
  { name: "Gray", hex: "#808080", group: "Neutral" },
  { name: "Red", hex: "#FF0000", group: "Warm" },
  { name: "Yellow", hex: "#FFFF00", group: "Warm" },
  { name: "Orange", hex: "#FFA500", group: "Warm" },
  { name: "Green", hex: "#008000", group: "Cool" },
  { name: "Blue", hex: "#0000FF", group: "Cool" },
  { name: "Purple", hex: "#800080", group: "Cool" },
  { name: "Pink", hex: "#FFC0CB", group: "Warm" },
  { name: "Brown", hex: "#A52A2A", group: "Neutral" },
  { name: "Navy", hex: "#000080", group: "Cool" },
];

// Group colors by category
const colorGroups = {
  Neutral: colorOptions.filter((color) => color.group === "Neutral"),
  Warm: colorOptions.filter((color) => color.group === "Warm"),
  Cool: colorOptions.filter((color) => color.group === "Cool"),
};

const occasionOptions = [
  { name: "Casual", icon: "🏡", description: "Everyday relaxed attire" },
  { name: "Work", icon: "💼", description: "Professional office wear" },
  { name: "Formal", icon: "✨", description: "Special events & celebrations" },
  { name: "Sports", icon: "🏃", description: "Athletic & active wear" },
  { name: "Party", icon: "🎉", description: "Social & nightlife events" },
  { name: "Date", icon: "❤️", description: "Romantic occasions" },
];

const StylePreferencesStep = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleCheckboxChange = (field: string, value: string) => {
    const current =
      (formData[field as keyof typeof formData] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    dispatch(updateFormData({ [field]: updated }));
  };

  return (
    <div className="min-h-[60vh] px-4 py-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Your Style Preferences</h2>
        <p className="text-sm text-white/70">
          Tell us what occasions you dress for and colors you love to wear.
        </p>
      </div>

      {/* Occasions Section */}
      <fieldset className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-3">
        <legend className="text-lg font-semibold text-white">
          What occasions do you typically dress for?
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {occasionOptions.map(({ name, icon, description }) => (
            <label
              key={name}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
                formData.occasion?.includes(name)
                  ? "bg-purple-600/20 border-purple-500"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <input
                type="checkbox"
                value={name}
                checked={formData.occasion?.includes(name) || false}
                onChange={() => handleCheckboxChange("occasion", name)}
                className="sr-only"
              />
              <span className="text-2xl mb-1">{icon}</span>
              <span className="font-medium">{name}</span>
              <span className="text-xs text-center text-white/70">
                {description}
              </span>
            </label>
          ))}
        </div>
        {errors.occasion && (
          <p className="text-red-400 text-sm">{errors.occasion}</p>
        )}
      </fieldset>

      {/* Color Preferences Section */}
      <fieldset className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-4">
        <legend className="text-lg font-semibold text-white">
          What colors do you prefer to wear?
        </legend>

        {Object.entries(colorGroups).map(([groupName, colors]) => (
          <div key={groupName} className="space-y-2">
            <h3 className="text-md font-medium text-white/80">
              {groupName} Colors
            </h3>
            <div className="flex flex-wrap gap-3">
              {colors.map(({ name, hex }) => (
                <label
                  key={name}
                  className={`inline-flex flex-col items-center cursor-pointer`}
                >
                  <div className="relative">
                    <div
                      style={{ backgroundColor: hex }}
                      className={`w-10 h-10 rounded-full border transition-all ${
                        formData.colorPreference?.includes(name)
                          ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black/50"
                          : "opacity-70 hover:opacity-100 border-gray-600"
                      }`}
                    ></div>
                    <input
                      type="checkbox"
                      value={name}
                      checked={
                        formData.colorPreference?.includes(name) || false
                      }
                      onChange={() =>
                        handleCheckboxChange("colorPreference", name)
                      }
                      className="sr-only"
                    />
                    {formData.colorPreference?.includes(name) && (
                      <svg
                        className="absolute -top-1 -right-1 text-purple-500 bg-black rounded-full w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="mt-1 text-xs">{name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {errors.colorPreference && (
          <p className="text-red-400 text-sm mt-1">{errors.colorPreference}</p>
        )}
      </fieldset>
    </div>
  );
};

export default StylePreferencesStep;
