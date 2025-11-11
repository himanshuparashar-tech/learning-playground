import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); //null means no user is logged in
    const [loading, setLoading] = useState(true); // TO avoid flicker on refresh

    // ✅ Run once on app load to check whether the use is logged In or not
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [])

    // ✅ Save user to local storage whenever login happens
    const login = (username) => {
        const userData = { name: username };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // ✅ Remove user from local storage when click on log out
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // ✅ Prevent flashing before local storage check finish
    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContext