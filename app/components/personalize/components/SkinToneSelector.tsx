"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const SKIN_TONES = [
  { label: "Fair", color: "#f2d6cb" },
  { label: "Light", color: "#eac8b1" },
  { label: "Medium", color: "#d1a06d" },
  { label: "Olive", color: "#9f7353" },
  { label: "Deep", color: "#5d3b2e" },
];

const SkinToneSelector = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);
  const selectedTones = formData.skinTone;

  const toggleTone = (label: string) => {
    const updated = selectedTones.includes(label)
      ? selectedTones.filter((t) => t !== label)
      : [...selectedTones, label];

    dispatch(updateFormData({ skinTone: updated }));
  };

  return (
    <fieldset>
      <legend className="text-base font-medium mb-2 text-white">
        Skin Tone
      </legend>
      <div className="flex flex-wrap gap-4">
        {SKIN_TONES.map(({ label, color }) => (
          <button
            key={label}
            onClick={() => toggleTone(label)}
            style={{ backgroundColor: color }}
            className={clsx(
              "w-12 h-12 rounded-full border-2 transition-all",
              selectedTones.includes(label)
                ? "ring-2 ring-purple-500 border-white"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={label}
            type="button"
          />
        ))}
      </div>
      {errors?.skinTone && (
        <p className="text-red-400 text-sm mt-2">{errors.skinTone}</p>
      )}
    </fieldset>
  );
};

export default SkinToneSelector;
