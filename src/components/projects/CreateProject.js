import React, {Component} from 'react';
import {createProjectRequest} from '../../store/actions/projectActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push('/');
  }

  render() {
    const user = this.props.user;
    if (!(user && user.uid)) return <Redirect to="/signin"/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h5 className="text-dark">Create New Project</h5>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="title" className="float-left">Title</label>
            <input type="text" id='title' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="content" className="float-left">Project Content</label>
            <textarea id='content' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto pt-2">
            <button className="btn btn-success btn-block">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    profile: state.auth.userprofile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (data) => dispatch(createProjectRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
