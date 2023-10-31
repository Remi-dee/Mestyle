function Button({
  className = "",
  variant = "primary",
  children,
  style = {},
  ...props
}) {
  const baseStyle = "px-4 py-2 focus:outline-none focus:ring text-base";
  const variants = {
    primary: "bg-white text-black",
    secondary: "bg-black text-white",
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
