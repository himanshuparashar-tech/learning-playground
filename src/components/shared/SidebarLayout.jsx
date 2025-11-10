import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';

// Import Pages
import TabsViewFancy from '../pages/TabsViewFancy';
import Projects from "../pages/Projects";
import ProjectDetails from '../pages/ProjectDetails';
import About from '../pages/About';
import Demo from '../pages/Demo';
import Faq from '../pages/Faq';
import Introduction from '../pages/Introduction';

const SidebarLayout = () => {
    return (
        <div className='flex' style={{
            maxHeight: 'calc(100vh - 7rem)', overflow: 'hidden'
        }} >
            <Sidebar />

            <main className="flex-1 p-2 bg-zinc-50 overflow-auto" style={{ minHeight: 'calc(100vh - 7rem)' }}>
                <Routes>
                    {/* Default redirect inside sidebar layout */}
                    <Route path="/" element={<Navigate to="/tabsLayout" replace />} />

                    {/* All pages */}
                    <Route path="tabsLayout" element={<TabsViewFancy />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="intro" element={<Introduction />} />
                    <Route path="about" element={<About />} />
                    <Route path="demo" element={<Demo />} />
                    <Route path="faq" element={<Faq />} />

                </Routes>

                {/* Optional <Outlet /> if you want nested routes */}
                <Outlet />
            </main>
        </div>
    )
}

export default SidebarLayout