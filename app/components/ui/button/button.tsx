import React, { ReactNode, CSSProperties, MouseEvent } from "react";

interface ButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "inverted";
  children: ReactNode;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  [propName: string]: any; // Additional props
}

function Button({
  className = "",
  variant = "primary",
  children,
  style = {},
  onClick,
  ...props
}: ButtonProps): JSX.Element {
  const baseStyle =
    "px-3 py-2 md:py-3 md:px-4 focus:outline-none focus:ring text-base md:font-medium ";
  const variants = {
    primary: "bg-white text-black",
    secondary: "bg-black text-white",
    inverted: "border border-neutral-700 text-white",
  };

  const isVariant = variants[variant] || variants.primary;
  return (
    <button
      {...props}
      className={`${baseStyle} ${isVariant} ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
