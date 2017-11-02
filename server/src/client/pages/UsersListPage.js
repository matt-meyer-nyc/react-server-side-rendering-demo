import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {

  componentDidMount() {

    this.props.fetchUsers();

  }

  renderUsers() {

    return this.props.users.map(user => {

      return <li key={user.id}>{user.name}</li>;

    });

  }

  // this function allows us to make Helmet info being passed into head of app more dynamic (ex. # of users loaded)
  //note: Helmet expects string for title, so have to use string interpolation
  head() {

    return (

      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>

    );

  }

  // helmet tag can be placed anywhere below, but MUST be rendered as part of component...alternative method, use helper function like 'head' above
  render() {

    return (

      <div>
        {this.head()}
        Here's a big list of users...
        <ul>
          {this.renderUsers()}
        </ul>
      </div>

    );

  }

}

function mapStateToProps(state) {

  return { users: state.users };

}

function loadData(store) {

 //manual dispatch... fetchUser called, makes network request to API, returns promise representing the network request
 return store.dispatch(fetchUsers());

}



export default {

  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)

};
