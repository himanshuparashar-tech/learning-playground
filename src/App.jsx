import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './main.css';

import SidebarLayout from './components/shared/SidebarLayout';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/pages/Login';

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/intro" replace /> : <Login />
          }
        />
        <Route path="/" element={<Navigate to="/intro" replace />} />
        {user ? (
          <Route path="/*" element={<SidebarLayout />} />
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
