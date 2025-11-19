import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BackButton = () => {
    const { pathname } = useLocation();

    // Default back route
    let backRoute = '/projects';

    // Hide back button on these pages
    if (pathname === '/projects') {
        return null;
    }

    // If inside bootstrap single projet
    if (pathname.startsWith("/projects/bootstrap_projects/")) {
        backRoute = "/projects/bootstrap_projects"
    }

    // If inside react js single project
    else if (pathname.startsWith("/projects/reactjs_projects/")) {
        backRoute = "/projects/reactjs_projects"
    }

    // If inside normal prjects go back to  ➡️ '/projects'
    else if (pathname.startsWith("/projects/")) {
        backRoute = "/projects";
    }

    return (
        <Link
            to={backRoute}
            className='text-indigo-600 mb-4 inline-block'
        >
            👈 back
        </Link>
    )
}

export default BackButton