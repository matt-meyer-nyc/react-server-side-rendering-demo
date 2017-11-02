/*
const express = require ('express');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Home = require('./client/components/Home').default;
//////////////////////////////////////////////////////
because Babel and Webpack are running over entire code base,
including server side nodeJS code in this file,
we can now refactor the code above to code based on
ES2015 modules to keep code consistent with client side code
/////////////////////////////////////////////////////
*/
import 'babel-polyfill'; // so can use async dispatch in actions > index.js
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

/*
Tell proxy we want to send requests from any request into route /api
if browser makes request to our render server with request that being '/api'
we will attempt to send it off to proxy server
*/
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {  // >> 2nd argument here re: { proxyReqOptDecorator... } only related to course and how API is set up for course

  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;

  }

 })

);

//  tells express to treat public directory as a static (or 'public') directory available to outside world
app.use(express.static('public'));

// * = consider ALL routes
app.get('*', (req, res) => {
  // request (req) passed here has tons of data from user's browswer INCLUDING COOOKIE
  const store = createStore(req);

  // take req (path that user is trying to access) and decide what components need to be rendered
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {    // looks at first argument (list of routes 'Routes'), look at route user is trying to visit (2nd agrument)
                                                          // and return array of components about to be rendered

    // returns array of promises representing all the pending network requests from any actions creators that might be called
  return route.loadData ? route.loadData(store) : null;

// to ensure EVERY promise either gets resolved or rejected, mapping over promises (or null values) returned from above ()
}).map(promise => {

  // check to make sure is a promise (checks to make sure it's not null)
  if(promise) {

    // when creating new promise MUST pass in a function that immediately gets called with two funtions (built it to Promise)
    return new Promise((resolve, reject) => {
      // no matter what, will always resolve inner promise being passed in via map function
      promise.then(resolve).catch(resolve)

    });

  }

});


  // when promises resolve, all of data loading requests must be completed
  // note: if just 1 promise fails, method '.all' will not proceed with 'then' part of function; instead invoked
  Promise.all(promises).then(() => {

    const context = {};
    const content = renderer(req, store, context);

    // look at context.url property, if url property is defined on context object, need to redirect users request to new url
    if (context.url) {

      return res.redirect(301, context.url);

    }


    // res.send(renderer(req, store, context));
    // b/c can't render application and immediately pass it off to be sent
    // renderer function being reassigned to content variable above

    // look at content object first before sending response, if has not found property on it, set response status to 404
    if (context.notFound) {
      res.status(404)
    }

    res.send(content);

  });

  // users response from this endpoint (generated in renderer.js file) includes both HTML generated in content with <Home />
  //  and tells users browser to go back to server and downloan bundle.js


});

app.listen(3000, () => {

  console.log('Listening on port 3000');

});
