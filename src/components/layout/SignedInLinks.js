import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutRequest} from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  const userInitials = props.profile && props.profile.initials;
  return (
    <div>
      <ul className="navbar-nav">
        <li><NavLink to='/create' className="btn btn-link nav-link text-light">New Project</NavLink></li>
        <li><button onClick={props.signOut} className="btn btn-link nav-link text-light">Log Out</button></li>
        <li><NavLink to='/' className="nav-link text-light rounded-circle bg-success">{userInitials}</NavLink></li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.auth.userprofile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
