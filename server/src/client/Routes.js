import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

// export default () => {
//
//   return (
//
//     <div>
//       <Route exact path="/" component={Home} />
//     <Route path="/users" component={UsersList} />
//
//     </div>
//
//   );
//
// };

////////////////////////////////
//ABOVE CODE REFACTORED TO BE ...
//////////////////////////////

// snytax needed for react-router-config library (have to do this if want to use SSR)
export default [

  // root route
  {
    ...App, // since no path tied to this, will always display on screen no matter what
    routes: [    // nest Homepage and UsersList routes inside App component

      {
        // ''...'' is ES6 spread syntax
        ...HomePage,
        path: '/',    //  > when user visits the exact path '/' show Home component
        exact: true

      },
      {

        ...AdminsListPage,
        path: '/admins'

      },
      {

        ...UsersListPage,
        path: '/users'

      },
      {

        ...NotFoundPage

      }

    ]

  }

];
