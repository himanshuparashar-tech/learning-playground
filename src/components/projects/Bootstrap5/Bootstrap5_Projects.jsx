import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { ArrayData } from '../../pages/ArrayData';
import BsSingleOpenAccordion from './BsSingleOpenAccordion';

const projectMap = {
    bs_singleopenaccordion: {
        title: "Single Open Ac b5p",
        component: <BsSingleOpenAccordion />,
        showCode: true,
        code: ``,
    },
}

const Bootstrap5_Projects = () => {
    const { id } = useParams();
    const project = projectMap[id];

    if (!project) {
        return (
            <div className='p-6'>
                <Link
                    to='/projects/bootstrap_projects' className='text-indigo-600 mb-4'>
                    👈 Back
                </Link>
                <p className='text-center'> ❌ Project not Found</p>
            </div>
        )
    }
    return (
        <div className="p-6">
            <Link to="/projects/bootstrap_projects" className="text-indigo-600">
                👈 Back to Projects
            </Link>
            <h1 className="text-3xl font-bold mt-4">{project.title}</h1>

            <div className={`grid gap-6 mt-6
        ${project.showCode === false
                    ? 'grid-cols-1'
                    : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2'
                }`}>
                {
                    project.showCode !== false && (

                        <div className="p-4 border rounded-lg bg-gray-100">
                            <h2 className="font-semibold mb-2 text-lg">💻 Code:</h2>
                            <pre className="bg-white text-green-400 p-4 rounded-lg overflow-x-auto " style={{ maxHeight: 'calc(100vh - 275px)' }}>
                                {project.code.trim()}
                            </pre>
                        </div>
                    )
                }
                {project.showCode === true && (

                    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-200">
                        <h2 className="font-semibold mb-2 text-lg">👀 Preview:</h2>
                        <div className="p-4 bg-white dark:bg-gray-300 rounded-md">
                            {project.component}
                        </div>
                    </div>
                )}

                {/* Show projects cards only when showCode is  === false */}
                {project.showCode === false && (

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
                )}

            </div>
        </div>
    );
};

export default Bootstrap5_Projects