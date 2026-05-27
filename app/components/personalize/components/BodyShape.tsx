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
import { motion } from "framer-motion";

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
  const [gender, setGender] = useState(formData.gender);
  const [showGuide, setShowGuide] = useState(false);

  const selectShape = (label: string) => {
    dispatch(updateFormData({ bodyShape: label }));
  };

  const changeGender = (newGender: string) => {
    setGender(newGender);
    // Map the simplified gender selection to standard gender options and update both fields
    const genderMapping = {
      women: "Female",
      men: "Male",
    };
    dispatch(
      updateFormData({
        gender: genderMapping[newGender as keyof typeof genderMapping],
        bodyShape: "",
      })
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.fieldset
      className="mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-4">
        <legend className="text-base font-medium dark:text-white text-gray-800">
          Which body shape best represents you?
        </legend>
        <motion.button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="text-sm text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-500 dark:hover:text-burgundy-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showGuide ? "Hide guide" : "Not sure?"}
        </motion.button>
      </div>

      {showGuide && (
        <motion.div
          className="mb-6 p-4 dark:bg-burgundy-900/30 bg-burgundy-50 rounded-lg text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-medium mb-2 dark:text-white text-gray-800">
            How to identify your body shape:
          </h4>
          <ul className="list-disc pl-5 space-y-1 dark:text-white/90 text-gray-700">
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
        </motion.div>
      )}

      <div className="flex space-x-4 mb-6">
        <motion.button
          type="button"
          onClick={() => changeGender("women")}
          className={clsx(
            "px-6 py-2 rounded-full transition-all",
            gender === "women"
              ? "bg-burgundy-500 text-white"
              : "dark:bg-gray-800 bg-gray-200 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-300"
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          variants={itemVariants}
        >
          Women
        </motion.button>
        <motion.button
          type="button"
          onClick={() => changeGender("men")}
          className={clsx(
            "px-6 py-2 rounded-full transition-all",
            gender === "men"
              ? "bg-burgundy-500 text-white"
              : "dark:bg-gray-800 bg-gray-200 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-300"
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          variants={itemVariants}
        >
          Men
        </motion.button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {BODY_SHAPES[gender as keyof typeof BODY_SHAPES]?.map(
          ({ label, imgSrc, description }, index) => (
            <motion.button
              key={label}
              onClick={() => selectShape(label)}
              type="button"
              className={clsx(
                "rounded-lg overflow-hidden border-2 transition-all flex flex-col h-full",
                formData.bodyShape?.toString() === label
                  ? "border-burgundy-500 ring-2 ring-burgundy-500"
                  : "dark:border-gray-700 border-gray-300 dark:hover:border-gray-500 hover:border-gray-400"
              )}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              custom={index}
            >
              <div className="w-full aspect-[3/4] relative dark:bg-gray-900 bg-gray-100 p-2">
                <Image
                  src={imgSrc}
                  alt={`${label} body shape`}
                  fill
                  className="object-contain p-2"
                  priority
                  unoptimized={imgSrc.endsWith(".svg")}
                />
              </div>
              <div className="text-center dark:text-white text-gray-800 py-2 text-sm font-medium">
                {label}
              </div>
              <div className="text-center dark:text-gray-300 text-gray-600 pb-2 px-2 text-xs hidden md:block">
                {description}
              </div>
            </motion.button>
          )
        )}
      </div>
      {errors?.bodyShape && (
        <motion.p
          className="text-red-500 dark:text-red-400 text-sm mt-2"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors.bodyShape}
        </motion.p>
      )}
      <p className="dark:text-gray-400 text-gray-600 text-sm mt-4">
        Select the silhouette that most closely resembles your body shape. This
        helps us recommend styles that complement your natural shape.
      </p>
    </motion.fieldset>
  );
};

export default BodyShapeSelector;
