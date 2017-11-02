import React from 'react';

// internally static router (from src's index.js file) renames 'context' to staticContext
// if try to receive prop staticContext on browser side, it won't exist (b/c in browser are rendering with browser router), so..
// need to default value of staticContext as empty object
const NotFoundPage = ({ staticContext = {} }) => {

  staticContext.notFound = true;

  return <h1>Oops, page not found.</h1>

};

export default {

  component: NotFoundPage

};
