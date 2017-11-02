//note: this file is a higher order component (hoc) - hence named with lower case at beginning of file
//hocs are techniques for reusing component logic (not quite part of React API, but a pattern created from React's compositional nature)
// sp. A HIGHER ORDER COMPONENT IS A FUNCTION THAT TAKES A COMPONENT AND RETURNS A NEW COMPONENT

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {

  // new component that wraps child component 'ChildComponent'
  class RequireAuth extends Component {

    render() {

      switch(this.props.auth) {
        // value producer by auth reducer, with these 3 possible results: false, null, object representing current user (action.payload.data)

        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>
        // object representing current user...since this is difficult to write into case statement, will default instead
        default:
          // if user is signed in, want to show child component, whenver create higher order component, want to make sure to
          // take any props passed into higher order component, and pass them into child component as well (i.e. via {...this.props})
          return <ChildComponent {...this.props} />;

      }

    }

  }

  function mapStateToProps({ auth }) {
    return { auth }
  }

  // using connect function because RequireAuth inner componone needs to be aware of users auth status
  // auth status created authReducer file
  // since need to export final wrapped version of component, so gets returned below
  return connect(mapStateToProps)(RequireAuth);

};
