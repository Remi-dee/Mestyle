import React from "react";

/**
 * PersonaliseScreen Component - Displays screens for personalized recommendations with a title, description, and overlay content.
 * @param {string} title - Title for the screen.
 * @param {string} description - Description or additional content.
 * @param {string} className - Additional custom class names for styling.
 * @param {node} children - Overlay component will be rendered as the child component.
 */

function PersonaliseScreen({
  title = "",
  description = "",
  className = "",
  children,
}) {
  const baseStyle =
    "relative flex flex-col items-center justify-center lg:p-12 xl:p-12 " +
    "py-8 px-4 select-none antialiased";

  return (
    <div className={`${baseStyle} ${className}`}>
      <div className="lg:space-y-4 md:space-y-4 space-y-2 xl:space-y-6 font-lexend mx-auto">
        <div className="space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-4">
          {title && (
            <h1 className="text-black dark:text-white text-center md:text-4xl xl:text-5xl font-medium lg:text-5xl text-2xl capitalize">
              {title}
            </h1>
          )}

          {description && (
            <p className="text-center dark:text-white text-black lg:text-2xl text-sm md:text-2xl xl:text-2xl">
              {description}
            </p>
          )}
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

export default PersonaliseScreen;
