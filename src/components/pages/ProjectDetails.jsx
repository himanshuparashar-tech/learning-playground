import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectMap } from './ProjectMap';
import BackButton from '../BackButton/BackButton';



const ProjectDetails = () => {
  const { id } = useParams();
  // const isBootstrapProject = id.startsWith("bs_");
  const project = projectMap[id];

  // Prefix → Back Route Mapping with plain object
  const backRouteMap = {
    bs_: '/projects/bootstrap_projects',
    rjs_: '/projects/reactjs_projects'
  }

  // Find prefix matching the ID
  const matchedPrefix = Object.keys(backRouteMap).find(prefix =>
    id.startsWith(prefix)
  )

  // Choose back route also
  const backRoute = matchedPrefix ? backRouteMap[matchedPrefix] : '/projects';

  if (!project) {
    return (
      <div className='p-6'>
        <BackButton />
        <p className='text-center'> ❌ Project not Found</p>
      </div>
    )
  }
  return (
    <div className="p-6">
      <Link to={backRoute} className="text-indigo-600">
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

      </div>
    </div>
  );
};

export default ProjectDetails