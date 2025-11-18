import React from 'react'
import { useParams, Link } from 'react-router-dom'
import RsSingleOpenAccordion from './RsSingleOpenAccordion';
import RsMultiOpenAccordion from './RsMultiOpenAccordion';

const ReactJs_Projects = () => {

    const projectMap = {

        // React Projects
        rs_singleopenaccordion: {
            title: 'Single Open',
            component: <RsSingleOpenAccordion />,
            code: ``
        },
        rs_multiopenaccordion: {
            title: 'Multiple Open',
            component: <RsMultiOpenAccordion />,
            code: ``
        },

        

    };

    const ProjectDetails = () => {
        const { id } = useParams();
        const project = projectMap[id];

        if (!project) {
            return (
                <div className='p-6'>
                    <Link
                        to='/projects' className='text-indigo-600 mb-4'>
                        👈 Back
                    </Link>
                    <p className='text-center'> ❌ Project not Found</p>
                </div>
            )
        }
        return (
            <div className="p-6">
                <Link to="/projects" className="text-indigo-600">
                    👈 Back to Projects
                </Link>
                <h1 className="text-3xl font-bold mt-4">{project.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 border rounded-lg bg-gray-100">
                        <h2 className="font-semibold mb-2 text-lg">💻 Code:</h2>
                        <pre className="bg-white text-green-400 p-4 rounded-lg overflow-x-auto " style={{ maxHeight: 'calc(100vh - 275px)' }}>
                            {project.code.trim()}
                        </pre>
                    </div>

                    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-200">
                        <h2 className="font-semibold mb-2 text-lg">👀 Preview:</h2>
                        <div className="p-4 bg-white dark:bg-gray-300 rounded-md">
                            {project.component}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default ReactJs_Projects