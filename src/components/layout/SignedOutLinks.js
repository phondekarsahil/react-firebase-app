import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="navbar-nav">
        <li><NavLink to='/signup' className="nav-link text-light">Signup</NavLink></li>
        <li><NavLink to='/signin' className="nav-link text-light">Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks