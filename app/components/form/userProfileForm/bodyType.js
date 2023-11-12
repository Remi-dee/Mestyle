import React from "react";
import useFormData from "../../../../hooks/userProfile/userForm/useFormData";

function BodyType() {
  const { formData, handleChange, errors } = useFormData();
  const checkboxClass =
    "form-checkbox md:h-5 md:w-5 xl:w-5 xl:h-5 lg:h-5 lg:w-5 focus:checked:bg-black checked:bg-black focus:ring-0 lg:rounded-md xl:rounded-md md:rounded-md rounded-sm hover:checked:bg-black";

  return (
    <div className="flex flex-col items-center justify-center select-none mx-auto">
      <div className="grid lg:grid-cols-2 md:justify-between xl:justify-between space-y-2">
        <div className="space-y-4">
          <fieldset className="mb-4">
            <legend className="text-base font-medium mb-2">Skin Tone</legend>
            {["Fair", "Light", "Medium", "Olive", "Deep"].map((tone) => (
              <label key={tone} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="skinTone"
                  value={tone}
                  checked={formData.skinTone.includes(tone)}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="ml-1">{tone}</span>
              </label>
            ))}
            {errors.skinTone && (
              <p className="text-red-500 text-sm">{errors.skinTone}</p>
            )}
          </fieldset>

          <fieldset className="mb-4">
            <legend className="text-base font-medium mb-2">Body Shape</legend>
            {[
              "Hourglass",
              "Rectangle",
              "Triangle",
              "Inverted Triangle",
              "Oval",
            ].map((shape) => (
              <label key={shape} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="bodyShape"
                  value={shape}
                  checked={formData.bodyShape.includes(shape)}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="ml-1">{shape}</span>
              </label>
            ))}
            {errors.bodyShape && (
              <p className="text-red-500 text-sm">{errors.bodyShape}</p>
            )}
          </fieldset>
        </div>

        <div className="space-y-4">
          <fieldset className="space-y-2">
            <legend className="text-base font-medium">
              Height (in feet and inches)
            </legend>
            {[
              "Under 5'",
              "5' - 5'4\"",
              "5'5\" - 5'9\"",
              "5'10\" - 6'",
              "Over 6'",
            ].map((height) => (
              <label key={height} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="heightGroup"
                  value={height}
                  checked={formData.heightGroup.includes(height)}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="ml-1">{height}</span>
              </label>
            ))}
            {errors.heightGroup && (
              <p className="text-red-500 text-sm">{errors.heightGroup}</p>
            )}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-base font-medium">
              Your Color Preferences
            </legend>
            {[
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
            ].map((color) => (
              <label key={color} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="colorPreference"
                  value={color}
                  checked={formData.colorPreference.includes(color)}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="ml-1">{color}</span>
              </label>
            ))}
            {errors.colorPreference && (
              <p className="text-red-500 text-sm">{errors.colorPreference}</p>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default BodyType;
