// components/dashboard/StylePersonaModal.tsx
"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPen,
  FaPlus,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
} from "react-icons/fa";
import {
  useGetPersonasQuery,
  useDeletePersonaMutation,
  useActivatePersonaMutation,
} from "@/app/redux/features/persona/personaApi";
import { useRouter } from "next/navigation";

const glassStyles =
  "dark:bg-white/10 dark:backdrop-blur-md dark:border-white/20 dark:shadow-xl " +
  "bg-white border border-gray-200 shadow-md";

interface StylePersona {
  _id: string;
  personaName: string;
  ageGroup: string;
  bodyShape: string;
  skinTone: string;
  heightGroup: string;
  occasion: string[];
  colorPreference: string[];
  isActive: boolean;
}

export default function StylePersonaModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const {
    data: personas = [],
    isLoading,
    error,
    refetch,
  } = useGetPersonasQuery();
  const [deletePersona] = useDeletePersonaMutation();
  const [activatePersona] = useActivatePersonaMutation();
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    // For now, we'll just close the modal and navigate to edit page
    onClose();
    router.push(`/personalize/edit/${id}`);
  };

  const handleAddNew = () => {
    // Navigate to the personalize page to create a new persona
    onClose();
    router.push("/personalize");
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this persona? This cannot be undone."
      )
    ) {
      try {
        await deletePersona(id).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete persona:", err);
        alert("Failed to delete persona. Please try again.");
      }
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await activatePersona(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to activate persona:", err);
      alert("Failed to activate persona. Please try again.");
    }
  };

  // Toggle expanded state for a persona
  const toggleExpanded = (id: string) => {
    if (expandedPersona === id) {
      setExpandedPersona(null);
    } else {
      setExpandedPersona(id);
    }
  };

  // Function to render color swatches
  const renderColorSwatches = (colors: string[]) => {
    if (!colors || colors.length === 0) return null;

    // Map common color names to hex values for visual representation
    const colorMap: Record<string, string> = {
      red: "#f87171",
      blue: "#60a5fa",
      green: "#4ade80",
      yellow: "#fcd34d",
      purple: "#a78bfa",
      pink: "#f472b6",
      orange: "#fb923c",
      black: "#1f2937",
      white: "#f9fafb",
      grey: "#9ca3af",
      brown: "#92400e",
      navy: "#1e3a8a",
      teal: "#14b8a6",
    };

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {colors.map((color, index) => {
          const bgColor = colorMap[color.toLowerCase()] || "#9ca3af";
          return (
            <div
              key={index}
              className="w-5 h-5 rounded-full border dark:border-white/20 border-gray-300"
              style={{ backgroundColor: bgColor }}
              title={color}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`max-w-2xl w-full rounded-2xl p-6 ${glassStyles}`}
        >
          <Dialog.Title className="text-2xl font-semibold dark:text-white text-gray-900 mb-4 flex justify-between items-center">
            <span>My Style Personas</span>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 text-sm dark:text-white/80 text-gray-700 
                      hover:text-burgundy-600 dark:hover:text-burgundy-300 px-3 py-1 rounded-md 
                      dark:bg-white/10 bg-gray-100 dark:hover:bg-white/20 hover:bg-gray-200 
                      transition-colors"
            >
              <FaPlus size={16} /> New Persona
            </button>
          </Dialog.Title>

          {isLoading ? (
            <div className="text-center py-6 dark:text-white/70 text-gray-500">
              Loading personas...
            </div>
          ) : error ? (
            <div className="text-center py-6 text-red-500 dark:text-red-400">
              Error loading personas.
            </div>
          ) : personas.length === 0 ? (
            <div className="text-center py-8 dark:text-white/70 text-gray-500">
              <p className="mb-4">
                You don&apos;t have any style personas yet.
              </p>
              <p className="text-sm">
                Create a persona to get personalized style recommendations.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {personas.map((persona: StylePersona) => (
                <div
                  key={persona._id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    persona.isActive
                      ? "border-burgundy-500 dark:bg-burgundy-900/30 bg-burgundy-50"
                      : "dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white"
                  }`}
                >
                  {/* Header row with name and actions */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="dark:text-white text-gray-900 font-medium text-lg">
                          {persona.personaName}
                        </p>
                        {persona.isActive && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-burgundy-500 text-white">
                            <FaCheck className="inline mr-1" size={10} /> Active
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!persona.isActive && (
                        <button
                          onClick={() => handleActivate(persona._id)}
                          className="dark:text-white/70 text-gray-500 hover:text-green-600 dark:hover:text-green-300 p-2"
                          aria-label={`Activate ${persona.personaName}`}
                        >
                          <span className="text-xs">Set Active</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(persona._id)}
                        className="dark:text-white/70 text-gray-500 hover:text-burgundy-600 dark:hover:text-burgundy-300 p-2"
                        aria-label={`Edit ${persona.personaName}`}
                      >
                        <FaPen size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(persona._id)}
                        className="dark:text-white/70 text-gray-500 hover:text-red-600 dark:hover:text-red-400 p-2"
                        aria-label={`Delete ${persona.personaName}`}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Primary info (always visible) */}
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                    {/* Occasions Section - Left Side */}
                    <div>
                      <h4 className="text-xs dark:text-white/60 text-gray-500 uppercase mb-1">
                        Occasions
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {persona.occasion && persona.occasion.length > 0 ? (
                          persona.occasion.slice(0, 3).map((occ, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-sm rounded-full dark:bg-white/10 bg-gray-100
                                       dark:border-burgundy-500/30 border-burgundy-200 dark:text-white text-gray-800"
                            >
                              {occ}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm dark:text-white/60 text-gray-500">
                            No occasions specified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Colors Section - Right Side */}
                    <div>
                      <h4 className="text-xs dark:text-white/60 text-gray-500 uppercase mb-1">
                        Colors
                      </h4>
                      {persona.colorPreference &&
                      persona.colorPreference.length > 0 ? (
                        renderColorSwatches(persona.colorPreference)
                      ) : (
                        <span className="text-sm dark:text-white/60 text-gray-500">
                          No colors specified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand/collapse section */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => toggleExpanded(persona._id)}
                      className="inline-flex items-center gap-1 text-sm text-center dark:text-white/60 text-gray-500 hover:text-burgundy-600 dark:hover:text-burgundy-300"
                      aria-label={
                        expandedPersona === persona._id
                          ? "Show less details"
                          : "Show more details"
                      }
                    >
                      {expandedPersona === persona._id ? (
                        <>
                          <FaChevronUp size={14} /> Show less
                        </>
                      ) : (
                        <>
                          <FaChevronDown size={14} /> Show more
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expandedPersona === persona._id && (
                      <motion.div
                        id={`details-${persona._id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t dark:border-white/10 border-gray-100">
                          <div>
                            <h4 className="text-xs dark:text-white/60 text-gray-500 uppercase mb-1">
                              Body Shape
                            </h4>
                            <p className="text-sm dark:text-white text-gray-800">
                              {persona.bodyShape || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs dark:text-white/60 text-gray-500 uppercase mb-1">
                              Height
                            </h4>
                            <p className="text-sm dark:text-white text-gray-800">
                              {persona.heightGroup || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs dark:text-white/60 text-gray-500 uppercase mb-1">
                              Skin Tone
                            </h4>
                            <p className="text-sm dark:text-white text-gray-800">
                              {persona.skinTone || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs dark:text-white/60 text-gray-500 uppercase mb-1">
                              Age Group
                            </h4>
                            <p className="text-sm dark:text-white text-gray-800">
                              {persona.ageGroup || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* Close button at bottom */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md dark:bg-white/10 bg-gray-100 dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
