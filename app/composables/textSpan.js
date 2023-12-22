import { motion, AnimatePresence } from "framer-motion";

function TextSpan({children}) {
  return <motion.span whileHover={{ scale: 1.5 }}>{children}</motion.span>;
}

export default TextSpan;
