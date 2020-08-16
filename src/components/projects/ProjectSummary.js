import React from 'react';
import moment from 'moment';

const ProjectSummary = ({project}) => {
  return (
    <div className="card text-left mb-3">
      <div className="card-body">
        <h4 className="card-title text-secondary">{project.title}</h4>
        <p className="card-text text-decoration-none text-secondary">Posted
          by {project.authorFirstName} {project.authorLastName}</p>
        <p className="card-text"><small className="text-muted">{moment(project.createdAt.toDate()).calendar()}</small>
        </p>
      </div>
    </div>
  )
}

export default ProjectSummary
