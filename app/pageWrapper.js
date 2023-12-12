import {motion, AnimatePresence} from "framer-motion"

function pageWrapper({ children }) {
  return (
    <>
      <AnimatePresence>
        <div>{children}</div>
      </AnimatePresence>
    </>
  );
}

export default pageWrapper;
