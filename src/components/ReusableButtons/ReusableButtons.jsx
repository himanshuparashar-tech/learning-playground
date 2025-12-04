import React from "react";

export default function ReusableButtons({
  children,

  type = "button", // button | submit | reset

  variant = "primary", // primary | secondary | danger | outline | success | warning | ghost
  size = "md", // xs | sm | md | lg | xl

  full = false,
  disabled = false,
  loading = false,

  leftIcon,
  rightIcon,

  rounded = "md", // sm | md | lg | pill
  shadow = false,

  bootstrap = false, // ✅ Optional Bootstrap 5 support

  onClick,
}) {
  // ✅ BASE STYLES
  const base = bootstrap
    ? "btn"
    : "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none";

  // ✅ VARIANTS
  const variants = bootstrap
    ? {
        primary: "btn-primary",
        secondary: "btn-secondary",
        danger: "btn-danger",
        success: "btn-success",
        warning: "btn-warning",
        outline: "btn-outline-primary",
        ghost: "btn-light",
      }
    : {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
        outline:
          "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        ghost: "bg-transparent text-blue-600 hover:bg-blue-100",
      };

  // ✅ SIZES
  const sizes = bootstrap
    ? {
        xs: "btn-sm",
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
        xl: "btn-lg",
      }
    : {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1 text-sm",
        md: "px-5 py-2",
        lg: "px-7 py-3 text-lg",
        xl: "px-9 py-4 text-xl",
      };

  // ✅ RADIUS
  const radius = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    pill: "rounded-full",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${bootstrap ? "" : radius[rounded]}
        ${full ? "w-full" : ""}
        ${shadow && !bootstrap ? "shadow-md hover:shadow-lg" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {/* ✅ LOADING SPINNER */}
      {loading && (
        <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}

      {/* ✅ LEFT ICON */}
      {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}

      {children}

      {/* ✅ RIGHT ICON */}
      {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
