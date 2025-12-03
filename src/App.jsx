import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './main.css';

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import SidebarLayout from './components/shared/SidebarLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/pages/Login';

// ✅ Layout wrapper that can access auth
const AppLayout = () => {
  const { user } = useAuth();

  return (
    <>
      {/* ✅ HEADER ONLY WHEN USER IS LOGGED IN */}
      {user && <Header />}

      <Routes>

        {/* ✅ LOGIN ROUTE (BLOCKED IF ALREADY LOGGED IN) */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/intro" replace /> : <Login />
          }
        />

        {/* ✅ ROOT ALWAYS REDIRECTS TO /intro */}
        <Route path="/" element={<Navigate to="/intro" replace />} />

        {/* ✅ PROTECTED ROUTES */}
        {user ? (
          <Route path="/*" element={<SidebarLayout />} />
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}

        {/* ❌ ❌ DO NOT ADD ANY GLOBAL * REDIRECT HERE */}

      </Routes>

      {/* ✅ FOOTER ONLY WHEN USER IS LOGGED IN */}
      {user && <Footer />}
    </>
  );
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
