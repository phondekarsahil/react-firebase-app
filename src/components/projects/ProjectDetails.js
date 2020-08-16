import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import moment from 'moment';

const ProjectDetails = (props) => {
  const {project} = props;
  const user = props.user;
  if (!(user && user.uid)) return <Redirect to="/signin"/>
  if (project) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-2">{project.title}</h4>
            <p>{project.content}</p>
          </div>
          <div className="card-text mb-5">
            <small className="text-muted d-block">Posted by {project.authorFirstName} {project.authorLastName}</small>
            <small className="text-muted d-block">{moment(project.createdAt.toDate()).calendar()}</small>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.project.projects;
  const project = projects && projects.filter((project) => {
    return project['id'] === id
  });
  return {
    project: project[0],
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(ProjectDetails)
