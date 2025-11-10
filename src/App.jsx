import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './main';
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import SidebarLayout from './components/shared/SidebarLayout';
import NotFound from './components/pages/NotFound';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>

        {/* Default Route — redirect "/" to "/home" */}
        <Route path="/" element={<Navigate to="/intro" replace />} />

        {/* Sidebar Layout */}
        <Route path="/*" element={<SidebarLayout />} />

        {/* 404 Page or Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
