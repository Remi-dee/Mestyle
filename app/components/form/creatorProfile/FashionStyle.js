"use client";

import React from "react";
import useFormContext from "@/hooks/creatorProfile/useFormContext";

function FashionStyle() {
  const { formData, handleChange, errors } = useFormContext();

  const checkboxClass =
    "form-checkbox md:h-5 md:w-5 xl:w-5 xl:h-5 lg:h-5 lg:w-5 focus:checked:bg-black checked:bg-black focus:ring-0 lg:rounded-md xl:rounded-md md:rounded-md rounded-sm hover:checked:bg-black";

  return (
    <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row space-y-3 md-space-y-0 lg:space-y-0 xl:space-y-0 lg:justify-between md:justify-between xl:justify-between">
      <div className="space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-4">
        <fieldset>
          <legend className="text-base font-medium">Occasion</legend>
          {["Formal", "Hangout", "Party", "Work"].map((occasion) => (
            <label key={occasion} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="occasion"
                value={occasion}
                checked={formData.occasion.includes(occasion)}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="ml-1">{occasion}</span>
            </label>
          ))}
          {errors.occasion && (
            <p className="text-red-500 text-sm">{errors.occasion}</p>
          )}
        </fieldset>

        <div>
          <label htmlFor="DisplayName" className="block text-base font-medium">
            Display Name/Nickname (Visible to your audience)
          </label>
          <input
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="border-none focus:ring-0 w-full max-w-md py-2 px-3 bg-white bg-opacity-25 placeholder:text-black/50 focus-visible:text-black"
            placeholder='"Enter a Display Name (e.g., FashionIcon123)"'
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm">{errors.displayName}</p>
          )}
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-4">
        <fieldset>
          <legend className="text-base font-medium">Gender</legend>
          {["Male", "Female", "Non-binary", "Prefer not to say"].map(
            (gender) => (
              <label key={gender} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="gender"
                  value={gender}
                  checked={formData.gender.includes(gender)}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="ml-1">{gender}</span>
              </label>
            )
          )}
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </fieldset>

        <fieldset>
          <legend className="text-base font-medium">Age Group</legend>
          {["Under 18", "18-34", "35-54", "55-74", "75 and over"].map(
            (ageGroup) => (
              <label key={ageGroup} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="ageGroup"
                  value={ageGroup}
                  checked={formData.ageGroup.includes(ageGroup)}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="ml-1">{ageGroup}</span>
              </label>
            )
          )}
          {errors.ageGroup && (
            <p className="text-red-500 text-sm">{errors.ageGroup}</p>
          )}
        </fieldset>
      </div>
    </div>
  );
}

export default FashionStyle;
