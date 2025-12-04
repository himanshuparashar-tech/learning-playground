import React, { useEffect } from "react";

export default function ReusableModal({
  isOpen,
  onClose,

  title,
  children,
  footer,

  size = "md", // sm | md | lg | xl | full
  closeOnBackdrop = true,
  closeOnEsc = true,

  loading = false,
  bootstrap = false,
}) {
  // ✅ ESC KEY CLOSE
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && closeOnEsc) onClose();
    };

    document.addEventListener("keydown", handleEsc);

    // ✅ SCROLL LOCK
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  // ✅ SIZE CONTROL
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    full: "w-screen h-screen rounded-none",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ✅ BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 animate-fade"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* ✅ MODAL BOX */}
      <div
        role="dialog"
        aria-modal="true"
        className={`
          relative bg-white w-full ${sizes[size]} 
          mx-4 rounded-lg shadow-lg 
          animate-scale
          ${loading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        {/* ✅ HEADER */}
        {title && (
          <div className="flex justify-between items-center px-5 py-3 border-b">
            <h2 className="font-bold text-lg">{title}</h2>
            <button onClick={onClose} className="text-xl">✖</button>
          </div>
        )}

        {/* ✅ BODY */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* ✅ FOOTER */}
        {footer && (
          <div className="px-5 py-3 border-t bg-gray-50">{footer}</div>
        )}

        {/* ✅ LOADING OVERLAY */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/70">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
