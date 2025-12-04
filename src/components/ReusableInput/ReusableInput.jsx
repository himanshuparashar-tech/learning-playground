import React from "react";

export default function ReusableInput({
  label,
  type = "text",

  value,
  onChange,

  placeholder = "",
  options = [],

  name,
  error,
  success,
  disabled = false,

  full = true,

  leftIcon,
  rightIcon,

  bootstrap = false, // ✅ Bootstrap 5 support
}) {
  const baseClass = bootstrap
    ? "form-control"
    : "w-full border px-3 py-2 rounded-md outline-none transition-all";

  const stateClass = error
    ? "border-red-500"
    : success
    ? "border-green-500"
    : "border-gray-300";

  const wrapperClass = full ? "w-full mb-4" : "mb-4";

  return (
    <div className={wrapperClass}>
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <div className="relative flex items-center">
        {/* ✅ LEFT ICON */}
        {leftIcon && (
          <span className="absolute left-2 text-gray-500">{leftIcon}</span>
        )}

        {/* ✅ SELECT */}
        {type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${baseClass} ${stateClass}`}
          >
            <option value="">Select</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseClass} ${stateClass}`}
          />
        ) : type === "checkbox" ? (
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            disabled={disabled}
          />
        ) : type === "radio" ? (
          options.map((opt, i) => (
            <label key={i} className="mr-4">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
              />{" "}
              {opt.label}
            </label>
          ))
        ) : type === "file" ? (
          <input
            type="file"
            name={name}
            onChange={onChange}
            disabled={disabled}
            className={`${baseClass}`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseClass} ${stateClass} ${
              leftIcon ? "pl-9" : ""
            }`}
          />
        )}

        {/* ✅ RIGHT ICON */}
        {rightIcon && (
          <span className="absolute right-2 text-gray-500">{rightIcon}</span>
        )}
      </div>

      {/* ✅ ERROR OR SUCCESS MESSAGE */}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
    </div>
  );
}
