import React, {Component} from 'react';
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';
import {connect} from 'react-redux';
import {getProjects} from '../../store/actions/projectActions';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const {projects} = this.props;
    const user = this.props.user;
    if (!(user && user.uid)) return <Redirect to="/signin"/>
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 mt-5">
            <ProjectList projects={projects}/>
          </div>
          <div className="col-sm-12 col-md-6 mt-5">
            <Notifications/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => dispatch(getProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
