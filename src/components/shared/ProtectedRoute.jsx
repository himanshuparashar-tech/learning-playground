import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {

    const { user } = useAuth();

    if (!user) {
        // Not logged in Redirect to login
        return (
            <Navigate to='/login' replace />
        )
    }
    // Logged in render child
    return (
        children
    )
}

export default ProtectedRoute