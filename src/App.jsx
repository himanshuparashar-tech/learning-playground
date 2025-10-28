import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import TabsViewFancy from './components/pages/TabsViewFancy';
import './main';
import Projects from "./components/pages/Projects";
import ProjectDetails from './components/pages/ProjectDetails';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<TabsViewFancy />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
