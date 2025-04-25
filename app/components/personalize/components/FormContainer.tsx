import { motion } from "framer-motion";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full max-w-xl bg-white/10 backdrop-blur-md mx-auto rounded-2xl shadow-lg p-8 border border-white/20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.175, 0.885, 0.32, 1.275], // Custom easing for a premium feel
      }}
    >
      {children}
    </motion.div>
  );
}
