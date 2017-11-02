import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';


// store passed here is loaded up with data from actions, etc. and loadData call
export default (req, store, context) => {

  //  generate HTML for application
  const content = renderToString(

    // 1. context variable must be passed here, or will get error
    // 2. staticrouter needs to be told what path user is trying to access; this can be found
    //     in request object ('req') in index.js file .get function (which passes req in the renderer function call, and req is received above)
    // 3. context prop and object passed in gives ability to communicate from rendered components back to this renderer file
    // 4. context passed in from index.js file (of src) - now gets passes to all components/pages
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // renderStatic function returns little object that represents all the tags loaded in Helmit library...will inject into head in return statement below
  const helmet = Helmet.renderStatic();

  /*
  ES6 template string that includes script tag that will tell browser
  it needs to download bundle.js file available in public directory (from index.js file)
   :note - when express in index.js file sees bundle.js below, it knows to just go right
    into static public file called in index.js an look for it
  */
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  // note: above...if had multiple meta tags, would all be injected via function above '${helmet.meta.toString()}'

};
