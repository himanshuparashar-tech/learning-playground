import React, { createContext, useContext, useState, useCallback } from "react";

const LoaderContext = createContext();

export function useLoader() {
    return useContext(LoaderContext);
}

export function LoaderProvider({ children }) {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");

    // Start a loading session
    const startLoading = useCallback((msg = "Loading...") => {
        setCount((prev) => prev + 1);
        setMessage(msg);
    }, []);

    // End a loading session
    const stopLoading = useCallback(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, []);

    const resetLoading = useCallback(() => {
        setCount(0);
        setMessage("");
    }, []);

    const isLoading = count > 0;

    return (
        <LoaderContext.Provider
            value={{ isLoading, message, startLoading, stopLoading, resetLoading }}
        >
            {children}

            {isLoading && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg px-6 py-4 flex flex-col items-center gap-3 shadow-lg">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-medium">{message || "Loading..."}</p>
                    </div>
                </div>
            )}
        </LoaderContext.Provider>
    );
}
