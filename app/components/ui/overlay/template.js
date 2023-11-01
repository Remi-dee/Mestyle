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
    "border border-solid border-black dark:border-white rounded-xl " +
    "mx-4 shadow-lg antialiased select-none";

  return (
    <div className={`${baseStyle} ${className}`}>
      <div className="flex flex-col items-center justify-center md:p-4 px-2 py-4 lg:p-4 xl:p-4 space-y-6 mx-auto">
        {title && (
          <div className="space-y-2 w-full">
            <h2 className="text-2xl text-center capitalize md:text-3xl xl:text-3xl lg:text-3xl font-medium text-black dark:text-white">
              {title}
            </h2>
            <hr
              aria-hidden="true"
              className="border border-solid dark:border-white border-black w-full"
            />
          </div>
        )}
        {description && (
          <p className="text-black text-center dark:text-white text-xs md:text-xl lg:text-xl xl:text-xl">
            {description}
          </p>
        )}
        <div className={`flex flex-row space-x-6 ${className}`}>{children}</div>
      </div>
    </div>
  );
}

export default Overlay;
