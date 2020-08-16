import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signupRequest} from '../../store/actions/authActions';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signup(this.state);
  }

  render() {
    const {authStatus} = this.props;
    const user = this.props.user;
    if (user && user.uid) return <Redirect to="/"/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h5 className="text-dark">Sign Up</h5>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="email" className="float-left">Email</label>
            <input type="email" id='email' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="password" className="float-left">Password</label>
            <input type="password" id='password' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="firstName" className="float-left">First Name</label>
            <input type="text" id='firstName' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="lastName" className="float-left">Last Name</label>
            <input type="text" id='lastName' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto pt-2">
            <button className="btn btn-success btn-block">SignUp</button>
          </div>
          <div className="col-md-12 col-lg-6 mx-auto">
            {authStatus ? <p className="alert alert-danger">{authStatus}</p> : null}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authStatus: state.auth.errMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (credentials) => dispatch(signupRequest(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)