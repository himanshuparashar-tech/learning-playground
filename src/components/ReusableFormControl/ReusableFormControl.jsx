import React from 'react'

const ReusableFormControl = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    options = [], // For select or radio
    error,
    helper = "",
    success = false,
    full = true,
    name, // required for radio button


}) => {
    const baseClasses = `px-4 py-2 border rounded-md outline-none focus:ring-2 transition-all`;
    const stateClasses = error
        ? 'border-red-500 focus:ring-red-400'
        : success
            ? 'border-green-500 focus:ring-green-400'
            : 'border-gray-300 focus:ring-blue-400';

    return (
        <div className={`flex flex-col gap-1 ${full ? 'w-full' : ''}`}>
            {/* Label */}
            {label && (
                <label className='font-medium text-gray-700'>{label}</label>
            )}

            {/* Textarea */}
            {type === 'textarea' && (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${baseClasses} ${stateClasses} min-h-[120px]`}
                />
            )}

            {/* Select */}
            {type === "select" && (
                <select
                    value={value}
                    onChange={onChange}
                    className={`${baseClasses} ${stateClasses} custom-select`}
                >
                    <button>
                        <selectedcontent></selectedcontent>
                    </button>
                    <option value="">
                        <div>
                            <span>Select</span>
                        </div>
                    </option>
                    {options.map((item) => {
                        return (
                            <option key={item.value} value={item.value}>
                                <div>
                                    <span>{item.label}</span>
                                </div>
                            </option>
                        )
                    })}
                </select>
            )}

            {/* Radio Button */}
            {type === 'radio' && (
                <div className='flex flex-col gap-2'>
                    {options.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={onChange}
                                className="w-4 h-4"
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            )}

            {/* Checkbox */}
            {type === 'checkbox' && (
                <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                        className="w-4 h-4 p-0"
                    />
                    <span>{placeholder}</span>
                </label>
            )}

            {/* File Upload */}
            {type === "file" && (
                <input
                    type="file"
                    onChange={onChange}
                    className="file:px-4 file:py-2 file:border file:rounded-md file:bg-gray-100"
                />
            )}

            {/* RANGE */}
            {type === "range" && (
                <input
                    type="range"
                    value={value}
                    onChange={onChange}
                    className="w-full accent-blue-500"
                />
            )}

            {/* Default Input (If Missing or the Fall Back) */}
            {
                ["text", "email", "password", "number", "tel", "date"].includes(type)
                && (
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseClasses} ${stateClasses}`}
                    />
                )
            }
            {/* Error */}
            {
                error && (
                    <p className='text-sm text-red-500'>{error}</p>
                )
            }

            {/* Helper */}
            {
                helper && !error && !success && (
                    <p className='text-sm text-gray-500'>{helper}</p>
                )
            }
        </div>
    )
}

export default ReusableFormControl