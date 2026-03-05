import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight, HiCalendarDays } from 'react-icons/hi2'
import './MonthPicker.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const MonthPicker = ({ value = '', onChange, id, placeholder = 'Select month', disabled = false, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)

    const [y, m] = value ? String(value).split('-') : []
    const year = y ? parseInt(y, 10) : new Date().getFullYear()
    const month = m ? parseInt(m, 10) - 1 : -1

    const displayText = value ? `${MONTHS[month] || month + 1} ${year}` : placeholder

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (selectedMonth) => {
        const yyyyMm = `${year}-${String(selectedMonth + 1).padStart(2, '0')}`
        onChange(yyyyMm)
        setIsOpen(false)
    }

    const handleYearChange = (delta) => {
        const newYear = year + delta
        const m = month >= 0 ? month : new Date().getMonth()
        onChange(`${newYear}-${String(m + 1).padStart(2, '0')}`)
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
        <div ref={containerRef} className={`month-picker ${className}`} style={{ position: 'relative', width: '100%' }}>
            <button
                type="button"
                id={id}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                disabled={disabled}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                className="month-picker-trigger"
            >
                <HiCalendarDays className="month-picker-icon" />
                <span className="month-picker-value">{displayText}</span>
                <motion.span
                    className="month-picker-chevron"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <HiChevronRight />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                        aria-label="Select month"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="month-picker-popover"
                    >
                        <div className="month-picker-header">
                            <button type="button" onClick={() => handleYearChange(-1)} className="month-picker-nav" aria-label="Previous year">
                                <HiChevronLeft />
                            </button>
                            <span className="month-picker-year">{year}</span>
                            <button type="button" onClick={() => handleYearChange(1)} className="month-picker-nav" aria-label="Next year">
                                <HiChevronRight />
                            </button>
                        </div>

                        <div className="month-picker-grid">
                            {MONTHS.map((name, i) => (
                                <motion.button
                                    key={i}
                                    type="button"
                                    onClick={() => handleSelect(i)}
                                    className={`month-picker-cell ${month === i ? 'month-picker-cell-selected' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MonthPicker
