// DisplayNameInput.tsx
"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

const DisplayNameInput = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFormData({ displayName: e.target.value }));
    console.log(formData);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-2">
      <label htmlFor="displayName" className="text-white text-lg font-semibold">
        Display Name / Nickname
      </label>
      <input
        id="displayName"
        name="displayName"
        value={formData.displayName}
        onChange={handleChange}
        placeholder='"e.g., FashionIcon123"'
        className="w-full max-w-md p-2 bg-white/20 text-white placeholder-white/50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {errors.displayName && (
        <p className="text-red-400 text-sm">{errors.displayName}</p>
      )}
    </div>
  );
};

export default DisplayNameInput;
