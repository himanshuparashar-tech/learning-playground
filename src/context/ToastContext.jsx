import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

const TOAST_POSITIONS = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
  "top-center",
  "bottom-center",
];

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      message,
      type = "info", // success | error | info | warning
      duration = 3000,
      position = "top-right",
    }) => {
      if (!TOAST_POSITIONS.includes(position)) position = "top-right";

      const id = Date.now() + Math.random();

      const newToast = { id, message, type, duration, position };
      setToasts((prev) => [...prev, newToast]);

      if (duration && duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  // Convenience helpers
  const success = (message, opts = {}) =>
    showToast({ message, type: "success", ...opts });

  const error = (message, opts = {}) =>
    showToast({ message, type: "error", ...opts });

  const info = (message, opts = {}) =>
    showToast({ message, type: "info", ...opts });

  const warning = (message, opts = {}) =>
    showToast({ message, type: "warning", ...opts });

  const value = {
    showToast,
    success,
    error,
    info,
    warning,
    removeToast,
  };

  // Group toasts by position
  const grouped = TOAST_POSITIONS.reduce((acc, pos) => {
    acc[pos] = toasts.filter((t) => t.position === pos);
    return acc;
  }, {});

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Containers per position */}
      {TOAST_POSITIONS.map((pos) => (
        <ToastPositionContainer key={pos} position={pos}>
          {grouped[pos]?.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </ToastPositionContainer>
      ))}
    </ToastContext.Provider>
  );
}

// Position container
function ToastPositionContainer({ position, children }) {
  if (!children || children.length === 0) return null;

  const base =
    "fixed z-[60] flex flex-col gap-2 p-4 pointer-events-none"; // toasts themselves handle pointer events

  const map = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  };

  return <div className={`${base} ${map[position]}`}>{children}</div>;
}

// Single toast UI
function ToastItem({ toast, onClose }) {
  const { message, type } = toast;

  const bgMap = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`
        pointer-events-auto min-w-[220px] max-w-xs text-white rounded-md shadow-lg px-4 py-3
        flex items-start gap-2 animate-slide-in
        ${bgMap[type] || bgMap.info}
      `}
    >
      <div className="mt-0.5">
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "info" && "ℹ️"}
        {type === "warning" && "⚠️"}
      </div>
      <div className="flex-1 text-sm">{message}</div>
      <button
        onClick={onClose}
        className="ml-2 text-sm opacity-80 hover:opacity-100"
      >
        ✖
      </button>
    </div>
  );
}
