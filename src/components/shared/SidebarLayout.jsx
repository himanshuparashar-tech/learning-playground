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

// Project Category Pages
import Bootstrap_Projects from '../projects/Bootstrap5/Bootstrap_Projects';
import ReactJs_Projects from '../projects/ReactJs/ReactJs_Projects';
import Display from '../Display/Display';

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
                    {/* ALL PROJECT ROUTES */}
                    {/* 1️⃣ Main Projects list */}
                    <Route
                        path="projects"
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />
                    {/* 2️⃣ Single Project (normal) */}
                    <Route
                        path="projects/:id"
                        element={
                            <ProtectedRoute>
                                <ProjectDetails />
                            </ProtectedRoute>
                        }
                    />
                    {/* 3️⃣ Bootstrap Projects List */}
                    <Route
                        path="projects/bootstrap_projects"
                        element={
                            <ProtectedRoute>
                                <Bootstrap_Projects />
                            </ProtectedRoute>
                        }
                    />

                    {/* 4️⃣ Bootstrap Single Project */}
                    <Route
                        path="projects/bootstrap_projects/:id"
                        element={
                            <ProtectedRoute>
                                <ProjectDetails />
                            </ProtectedRoute>
                        }
                    />

                    {/* 5️⃣ ReactJS Projects List */}
                    <Route
                        path="projects/reactjs__projects"
                        element={
                            <ProtectedRoute>
                                <ReactJs_Projects />
                            </ProtectedRoute>
                        }
                    />

                    {/* 6️⃣ ReactJS Single Project */}
                    <Route
                        path="projects/reactjs__projects/:id"
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
                    <Route
                        path="display"
                        element={
                            <ProtectedRoute >
                                <Display />
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