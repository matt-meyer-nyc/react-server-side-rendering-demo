

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// since want direct access to this component to make use of in connect function assign to variable instead of immediately exporting
const Header = ({ auth }) => {
  // console.log('auth status', auth);

  // terniary expression assigned to variable authButton looking at whether user is logged in (auth is true or false)
  const authButton = auth ? (
    // using a tags to make fully qualified request to browswer to upate page (not just navigating React app with Link tag)
      <a href="/api/logout">Logout</a>

    ) : (

      <a href="/api/auth/google">Login</a>

  );

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">React SSR</Link>
        <ul className="right">
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>
            {authButton}
          </li>
        </ul>
      </div>
    </nav>

  );

};

/* would pass in state object, but only property from state object we care about is if user is authenticated or not
   so destructure off auth piece of state
*/
function mapStateToProps({ auth }) {


  return { auth };  // remember, ES2015 this is shorthand for { auth: auth }

}

export default connect(mapStateToProps)(Header);
