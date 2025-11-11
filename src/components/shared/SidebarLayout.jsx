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
import ProtectedRoute from './ProtectedRoute';

const SidebarLayout = () => {
    return (
        <div className='flex' style={{
            maxHeight: 'calc(100vh - 7rem)', overflow: 'hidden'
        }} >
            <Sidebar />

            <main className="flex-1 p-2 bg-zinc-50 overflow-auto" style={{ minHeight: 'calc(100vh - 7rem)' }}>
                <Routes>
                    {/* Default redirect inside sidebar layout */}

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Navigate to="/tabsLayout" replace />
                            </ProtectedRoute>
                        }
                    />

                    {/* All pages */}
                    <Route
                        path="tabsLayout"
                        element={
                            <ProtectedRoute>
                                <TabsViewFancy />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="projects"
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="projects/:id"
                        element={
                            <ProtectedRoute>
                                <ProjectDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="intro"
                        element={
                            <ProtectedRoute>
                                <Introduction />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <About />
                        }
                    />
                    <Route
                        path="demo"
                        element={
                            <ProtectedRoute>
                                <Demo />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="faq"
                        element={
                            <ProtectedRoute>
                                <Faq />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

                {/* Optional <Outlet /> if you want nested routes */}
                <Outlet />
            </main>
        </div>
    )
}

export default SidebarLayout