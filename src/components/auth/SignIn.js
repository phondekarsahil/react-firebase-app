import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginRequest} from '../../store/actions/authActions';
import {Redirect} from "react-router-dom";

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }

  render() {
    const {authStatus} = this.props;
    const user = this.props.user;
    if (user && user.uid) return <Redirect to="/"/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h5 className="text-dark">Sign In</h5>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="email" className="float-left">Email</label>
            <input type="email" id='email' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto">
            <label htmlFor="password" className="float-left">Password</label>
            <input type="password" id='password' className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group col-md-12 col-lg-6 mx-auto pt-2">
            <button className="btn btn-success btn-block">Login</button>
          </div>
          <div className="col-md-12 col-lg-6 mx-auto pt-2">
            {authStatus ? <p className="alert alert-danger">{authStatus}</p> : null}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.auth.errMsg,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(loginRequest(credentials)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
