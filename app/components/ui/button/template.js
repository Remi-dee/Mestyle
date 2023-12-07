function Button({
  className = "",
  variant = "primary",
  children,
  style = {},
  ...props
}) {
  const baseStyle =
    "px-3 py-1 md:py-2 md:px-4 focus:outline-none focus:ring text-base md:font-medium";
  const variants = {
    primary: "bg-white ",
    secondary: "bg-black text-white",
    inverted: "border border-neutral-700 text-white",
  };

  const isVariant = variants[variant] || variants.primary;
  return (
    <button
      {...props}
      className={`${baseStyle} ${isVariant} ${className}`}
      style={{ ...style }}
    >
      {children}
    </button>
  );
}

export default Button;
