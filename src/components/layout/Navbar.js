import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';
import {getUserRequest} from '../../store/actions/authActions';

class Navbar extends Component {
  componentDidMount() {
    const user = this.props.user;
    if (user && user.uid) {
      this.props.getUser(user.uid);
    }
  }

  render() {
    const user = this.props.user;
    const links = (user && user.uid) ? <SignedInLinks/> : <SignedOutLinks/>
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-dark">
        <div className="container">
          <Link to='/' className="navbar-brand text-light">React Firebase</Link>
          {links}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (uid) => dispatch(getUserRequest(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
