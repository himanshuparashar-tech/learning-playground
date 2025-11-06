import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import TabsViewFancy from './components/pages/TabsViewFancy';
import './main';
import Projects from "./components/pages/Projects";
import ProjectDetails from './components/pages/ProjectDetails';
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';
import Demo from './components/pages/Demo';
import Faq from './components/pages/Faq';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Default Route — redirect "/" to "/home" */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Actual Pages */}
          <Route path="/home" element={<TabsViewFancy />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/faq" element={<Faq />} />

          {/* 404 Pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
