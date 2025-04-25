// components/dashboard/StylePersonaModal.tsx
"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

import { motion } from "framer-motion";
import { FaPen, FaPlus } from "react-icons/fa";

const glassStyles =
  "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";

interface StylePersona {
  id: number;
  name: string;
  attributes: string[];
}

const dummyPersonas: StylePersona[] = [
  {
    id: 1,
    name: "Soft Glam for Evenings",
    attributes: ["Pear body type", "Warm undertones", "Evening"],
  },
  {
    id: 2,
    name: "Corporate Queen",
    attributes: ["Athletic build", "Neutral tone", "Work"],
  },
];

export default function StylePersonaModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [personas, setPersonas] = useState<StylePersona[]>(dummyPersonas);

  const handleEdit = (id: number) => {
    alert("Edit style persona ID: " + id);
    // Implementation to edit would go here
  };

  const handleAddNew = () => {
    alert("Open new style persona creator");
    // You can link this to a multi-step form/modal
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
          <Dialog.Title className="text-2xl font-semibold text-white mb-4">
            My Style Persona
          </Dialog.Title>

          <div className="space-y-4">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className="flex justify-between items-start p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <div>
                  <p className="text-white font-medium text-lg">
                    {persona.name}
                  </p>
                  <div className="text-white/80 text-sm mt-1 flex flex-wrap gap-2">
                    {persona.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-white/10 border border-white/10"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(persona.id)}
                  className="text-white hover:text-purple-300"
                >
                  <FaPen size={20} />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-purple-300 mt-4"
            >
              <FaPlus size={18} /> Add New Style Persona
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
