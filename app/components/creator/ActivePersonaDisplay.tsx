import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { useGetPersonasQuery } from "@/app/redux/features/persona/personaApi";

export default function ActivePersonaDisplay() {
  const { data: personas = [] } = useGetPersonasQuery();
  const activePersona = personas.find((p) => p.isActive);

  if (!activePersona) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 rounded-lg border dark:border-gray-700 border-gray-200 
                   dark:bg-gray-800/50 bg-gray-50"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full dark:bg-burgundy-900/30 bg-burgundy-50">
          <FaUser className="w-5 h-5 text-burgundy-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-medium dark:text-white text-gray-900">
              Creating style for your active persona
            </h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-burgundy-500 text-white">
              Active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="dark:text-gray-400 text-gray-600">Name</p>
              <p className="dark:text-white text-gray-900 font-medium">
                {activePersona.personaName}
              </p>
            </div>
            <div>
              <p className="dark:text-gray-400 text-gray-600">Age Group</p>
              <p className="dark:text-white text-gray-900 font-medium">
                {activePersona.ageGroup}
              </p>
            </div>
            <div>
              <p className="dark:text-gray-400 text-gray-600">Body Shape</p>
              <p className="dark:text-white text-gray-900 font-medium">
                {activePersona.bodyShape}
              </p>
            </div>
            <div>
              <p className="dark:text-gray-400 text-gray-600">
                Style Preferences
              </p>
              <p className="dark:text-white text-gray-900 font-medium">
                {activePersona.occasion?.slice(0, 2).join(", ")}
                {activePersona.occasion?.length > 2 ? "..." : ""}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm dark:text-gray-400 text-gray-600">
            This style will be associated with your active persona, helping it
            reach the right audience.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
