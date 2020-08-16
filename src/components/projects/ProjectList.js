import React from 'react';
import ProjectSummary from './ProjectSummary';
import {Link} from 'react-router-dom';

const ProjectList = ({projects}) => {
  return (
    <div className="list-group">
      {projects && projects.map(project => {
        return (
          <Link to={'/project/' + project.id} key={project.id} className="text-decoration-none">
            <ProjectSummary project={project}/>
          </Link>
        )
      })}
    </div>
  )
}

export default ProjectList
