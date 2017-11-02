// note: there's no actual 'App' page, but we want this to help render things that will show up on EVERY page (like header, etc.)

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// any route matched during renderRoute process passed in as prop 'route'
const App = ({ route }) => {

  return <div>
            <Header />
            {renderRoutes(route.routes)}
          </div>; // any route components matched will be turned into routes via this function call

};

/*
 b/c Header should basically always know if user is signed in or not to display proper buttons,
 will call loadData function here with fetchCurrentUser from actions > index.js file
 b/c login in loadData function is so small, not breaking it out into separate function like UserListPage.js file

*/



export default {

  component: App,
  // remember loadData function gets called with redux store, and only function we care from redux store is dispatch function
  // so are destructuring it off here
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()) // REMEMBER arrow funcion with no curly braces has implicit funtionality of
                                                            // a return statement (which we need here)
};
