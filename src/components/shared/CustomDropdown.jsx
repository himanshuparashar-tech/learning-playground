import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CustomDropdown.css'

/**
 * Custom animated dropdown — replaces native <select>.
 * Options: [{ value, label }] or [{ value }] (label defaults to value)
 */
const CustomDropdown = ({
    value = '',
    onChange,
    options = [],
    placeholder = 'Select...',
    placeholderAsOption = true,
    disabled = false,
    id,
    name,
    className = '',
    triggerClassName = '',
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)

    const normalizedOptions = options.map((opt) => ({
        value: String(opt.value ?? ''),
        label: opt.label ?? String(opt.value ?? '')
    }))

    const selectedOption = normalizedOptions.find((o) => o.value === value)
    const displayText = selectedOption ? selectedOption.label : placeholder

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (opt) => {
        onChange(opt.value)
        setIsOpen(false)
    }

    const handleKeyDown = (e) => {
        if (disabled) return
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen((prev) => !prev)
        }
        if (e.key === 'Escape') setIsOpen(false)
    }

    return (
        <div
            ref={containerRef}
            className={`custom-dropdown ${className}`}
            style={{ position: 'relative', width: '100%' }}
        >
            <button
                type="button"
                id={id}
                name={name}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={id ? `${id}-listbox` : undefined}
                disabled={disabled}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                className={`custom-dropdown-trigger ${triggerClassName}`.trim()}
            >
                <span className="custom-dropdown-value">{displayText}</span>
                <motion.span
                    className="custom-dropdown-chevron"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    ▼
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        id={id ? `${id}-listbox` : undefined}
                        role="listbox"
                        aria-label={placeholder}
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="custom-dropdown-list"
                    >
                        {placeholder && placeholderAsOption && (
                            <li
                                role="option"
                                aria-selected={!value}
                                className={`custom-dropdown-option ${!value ? 'custom-dropdown-option-selected' : ''}`}
                                onClick={() => handleSelect({ value: '', label: placeholder })}
                            >
                                {placeholder}
                            </li>
                        )}
                        {normalizedOptions.map((opt) => (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={value === opt.value}
                                className={`custom-dropdown-option ${value === opt.value ? 'custom-dropdown-option-selected' : ''}`}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CustomDropdown
