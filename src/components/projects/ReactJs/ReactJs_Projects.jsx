import React from 'react'
import BackButton from '../../BackButton/BackButton';
import { Link } from 'react-router-dom';
import { ArrayData } from '../../pages/ArrayData';


const ReactJs_Projects = () => {

    return (
        <div className="p-6d">
            <div className="mb-2">
                <BackButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ArrayData.bs_projects.map(project => (
                    <div key={project.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className='text-xl font-semibold mb-4'>{project.title}</h2>
                        <p className='text-gray-600 mb-4'>{project.description}</p>
                        <Link
                            to={`/projects/bootstrap_projects/${project.id}`}
                            className='text-indigo-600 hover:underline'
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReactJs_Projects