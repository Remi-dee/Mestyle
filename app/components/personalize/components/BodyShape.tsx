// components/onboarding/BodyShapeSelector.tsx
"use client";

import {
  selectPersona,
  updateFormData,
} from "@/app/redux/features/persona/personaSlice";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const BODY_SHAPES = {
  women: [
    {
      label: "Hourglass",
      imgSrc: "/images/body/women/hourglass.svg",
      description: "Defined waist with similar bust and hip measurements",
    },
    {
      label: "Rectangle",
      imgSrc: "/images/body/women/rectangle.svg",
      description: "Straight figure with similar measurements throughout",
    },
    {
      label: "Triangle",
      imgSrc: "/images/body/women/triangle.svg",
      description: "Narrower shoulders and fuller hips",
    },
    {
      label: "Inverted Triangle",
      imgSrc: "/images/body/women/inverted_triangle.svg",
      description: "Broader shoulders and narrower hips",
    },
    {
      label: "Oval",
      imgSrc: "/images/body/women/oval.svg",
      description: "Fuller midsection with slimmer legs and arms",
    },
  ],
  men: [
    {
      label: "Rectangle",
      imgSrc: "/images/body/men/rectangle.svg",
      description:
        "Straight up and down with shoulders similar to waist and hips",
    },
    {
      label: "Triangle",
      imgSrc: "/images/body/men/triangle.svg",
      description: "Narrower shoulders and wider waist/hip area",
    },
    {
      label: "Inverted Triangle",
      imgSrc: "/images/body/men/inverted_triangle.svg",
      description: "Broad shoulders and chest with narrower waist",
    },
    {
      label: "Oval",
      imgSrc: "/images/body/men/oval.svg",
      description: "Rounded midsection with slimmer legs",
    },
    {
      label: "Trapezoid",
      imgSrc: "/images/body/men/trapezoid.svg",
      description: "Shoulders slightly wider than waist with defined chest",
    },
  ],
};

const BodyShapeSelector = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(selectPersona);
  const [gender, setGender] = useState(formData.gender || "women");
  const [showGuide, setShowGuide] = useState(false);

  const selectShape = (label: string) => {
    dispatch(updateFormData({ bodyShape: label }));
  };

  const changeGender = (newGender: string) => {
    setGender(newGender);
    dispatch(updateFormData({ gender: newGender, bodyShape: "" }));
  };

  return (
    <fieldset className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <legend className="text-base font-medium text-white">
          Which body shape best represents you?
        </legend>
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="text-sm text-purple-400 hover:text-purple-300"
        >
          {showGuide ? "Hide guide" : "Not sure?"}
        </button>
      </div>

      {showGuide && (
        <div className="mb-6 p-4 bg-purple-900/30 rounded-lg text-sm">
          <h4 className="font-medium mb-2">How to identify your body shape:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Hourglass:</strong> Defined waist with balanced shoulders
              and hips
            </li>
            <li>
              <strong>Rectangle:</strong> Straight silhouette with similar
              shoulder, waist, and hip measurements
            </li>
            <li>
              <strong>Triangle:</strong> Narrower shoulders than hips (also
              called &quot;pear&quot;)
            </li>
            <li>
              <strong>Inverted Triangle:</strong> Broader shoulders than hips
            </li>
            <li>
              <strong>Oval:</strong> Fuller midsection with proportional
              shoulders and hips
            </li>
            <li>
              <strong>Trapezoid (men):</strong> Shoulders slightly wider than
              waist with defined chest
            </li>
          </ul>
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          onClick={() => changeGender("women")}
          className={clsx(
            "px-6 py-2 rounded-full transition-all",
            gender === "women"
              ? "bg-purple-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          )}
        >
          Women
        </button>
        <button
          type="button"
          onClick={() => changeGender("men")}
          className={clsx(
            "px-6 py-2 rounded-full transition-all",
            gender === "men"
              ? "bg-purple-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          )}
        >
          Men
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {BODY_SHAPES[gender as keyof typeof BODY_SHAPES]?.map(
          ({ label, imgSrc, description }) => (
            <button
              key={label}
              onClick={() => selectShape(label)}
              type="button"
              className={clsx(
                "rounded-lg overflow-hidden border-2 transition-all flex flex-col h-full",
                formData.bodyShape?.toString() === label
                  ? "border-purple-500 ring-2 ring-purple-500"
                  : "border-gray-700 hover:border-gray-500"
              )}
            >
              <div className="w-full aspect-[3/4] relative bg-gray-900 p-2">
                <Image
                  src={imgSrc}
                  alt={`${label} body shape`}
                  fill
                  className="object-contain p-2"
                  priority
                  unoptimized={imgSrc.endsWith(".svg")}
                />
              </div>
              <div className="text-center text-white py-2 text-sm font-medium">
                {label}
              </div>
              <div className="text-center text-gray-300 pb-2 px-2 text-xs hidden md:block">
                {description}
              </div>
            </button>
          )
        )}
      </div>
      {errors?.bodyShape && (
        <p className="text-red-400 text-sm mt-2">{errors.bodyShape}</p>
      )}
      <p className="text-gray-400 text-sm mt-4">
        Select the silhouette that most closely resembles your body shape. This
        helps us recommend styles that complement your natural shape.
      </p>
    </fieldset>
  );
};

export default BodyShapeSelector;
