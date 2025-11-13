import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './main.css';
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import SidebarLayout from './components/shared/SidebarLayout';
import NotFound from './components/pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import Login from './components/pages/Login';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Default Route — redirect "/" to "/home" */}
          <Route path="/" element={<Navigate to="/intro" replace />} />

          {/* Protected Sidebar Layout */}
          <Route path="/*" element={<SidebarLayout />} />

          {/* 404 Page or Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App;
