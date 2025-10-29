import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 'todo',
        title: 'Todo App',
        description: 'A Simple Task Manager'
    },

]

const Projects = () => {
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map(project => (
                    <div key={project.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className='text-xl font-semibold mb-4'>{project.title}</h2>
                        <p className='text-gray-600 mb-4'>{project.description}</p>
                        <Link
                            to={`/projects/${project.id}`}
                            className='text-indigo-600 hover:underline'
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects