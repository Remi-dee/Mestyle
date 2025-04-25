// OccasionSelection.tsx
"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const options = ["Formal", "Hangout", "Party", "Work"];

const OccasionSelection = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formData.occasion, value]
      : formData.occasion.filter((item) => item !== value);

    dispatch(updateFormData({ occasion: updated }));
    console.log(formData);
  };

  return (
    <fieldset className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-3">
      <legend className="text-lg font-semibold text-white">
        What occasions do you typically dress for?
      </legend>
      <div className="flex flex-wrap gap-4">
        {options.map((occasion) => (
          <label
            key={occasion}
            className="inline-flex items-center gap-2 text-white"
          >
            <input
              type="checkbox"
              value={occasion}
              checked={formData.occasion.includes(occasion)}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 accent-black"
            />
            {occasion}
          </label>
        ))}
      </div>
      {errors.occasion && (
        <p className="text-red-400 text-sm">{errors.occasion}</p>
      )}
    </fieldset>
  );
};

export default OccasionSelection;
