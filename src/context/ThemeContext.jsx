import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'theme'
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() => {
        if (typeof window === 'undefined') return 'light'
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved === 'dark' || saved === 'light') return saved
            return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        } catch {
            return 'light'
        }
    })

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch (e) { /* ignore */ }
    }, [theme])

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, [])

    const getCurrentTheme = useCallback(() => theme, [theme])

    const value = { theme, toggleTheme, getCurrentTheme, setTheme: setThemeState }
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return ctx
}
