import React from 'react';


const ReusableButton = ({
    children,
    variant = "customPrimary",
    size = "md",
    full = false,
    disabled = false,
    loading = false,
    loadingText = "loading...",
    startIcon = null,
    endIcon = null,
    iconOnly = false,
    animation = true,
    type = "button",
    btn_style = "rb_style",
    className = "",
    onClick,

}) => {
    const baseStyles = "inline-flex item-center justify-center gap-2 rounded-md font-medium transition-all duration-200 select-none ";

    const rb_style = "rb_style";

    // 🌟 Animations (Only when animation = true)
    const animatedEffects = animation
        ? `
      hover:scale-[1.05]
      active:scale-[0.96]
      hover:shadow-lg
      hover:opacity-95
    `
        : ""; // animation off

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-700 text-white hover:bg-gray-800",
        outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
        soft: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-white",
        ghost: "hover:bg-gray-200 dark:hover:bg-gray-800",
        danger: "bg-red-600 text-white hover:bg-red-700",
        dangerOutline: "border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900",
        success: "bg-green-600 text-white hover:bg-green-700",
        successSoft: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        dark: "bg-black text-white hover:bg-gray-900",
        light: "bg-white text-black border hover:bg-gray-100",
        customPrimary: " text-[var(--btn-text)] bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] transition-colors duration-300"
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-5 py-3 text-lg",
        xl: "px-6 py-4 text-xl",
        icon: "p-2 text-xl aspect-square rounded-full",
    };

    const finalSize = iconOnly ? sizes.icon : size[size];

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${finalSize}
                ${animatedEffects}
                ${full ? "w-full" : ""}
                ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
                ${btn_style}
                ${className}

            `}
        >
            {/* Loading Spinner */}
            {loading && (
                <span className="animate spin h-4 w-4 border-2 border-white border-t-transparent rounde-full" ></span>
            )}

            {/* Start Icon */}
            {!loading && !iconOnly && startIcon}

            {/* Main Text */}
            {!iconOnly && (loading ? loadingText : children)}

            {/* End Icon */}
            {!loading && !iconOnly && endIcon}

            {/* Icon Only Button */}
            {iconOnly && !loading && children}

        </button>
    )
}

export default ReusableButton