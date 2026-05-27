// Typewriter.js

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Typewriter({ text }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the cursor after the animation is complete
    const timeout = setTimeout(() => setIsVisible(false), text.length * 100);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          key="typewriter"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          exit={{ opacity: 0, width: 0 }}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default Typewriter;
