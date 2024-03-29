import React from "react";

/**
 * Overlay component - displays a modal-like overlay with title, description, and children elements.
 * @param {string} title - Title for the Overlay.
 * @param {string} description - Short description or content.
 * @param {node} children - Children components to be rendered inside the Overlay.
 * @param {string} className - Additional custom class names.
 */

function Overlay({ title = "", description = "", children, className = "" }) {
  const baseStyle =
    "relative backdrop-blur-md z-50 bg-black/25 dark:bg-white/30 " +
    "bg-opacity-10 dark:bg-opacity-10 rounded-xl " +
    "shadow-lg antialiased select-none";

  return (
    <div className={`${baseStyle} ${className}`}>
      <div className="flex flex-col items-center justify-center xl:px-10 xl:py-12 lg:py-10 lg:px-8 md:px-6 md:py-8 px-4 py-6 space-y-6 mx-auto font-lexend">
        {title && (
          <div className="space-y-2 w-full">
            <h2 className="text-2xl text-center capitalize md:text-3xl xl:text-3xl lg:text-3xl font-medium dark:text-white ">
              {title}
            </h2>
            <hr
              aria-hidden="true"
              className="border dark:border-neutral-500 border-neutral-100 w-full"
            />
          </div>
        )}
        {description && (
          <p className="text-black/60 text-center dark:text-white/70 text-xs md:text-xl lg:text-xl xl:text-xl">
            {description}
          </p>
        )}
        <div className="w-3/4 mx-auto">{children}</div>
      </div>
    </div>
  );
}

export default Overlay;
