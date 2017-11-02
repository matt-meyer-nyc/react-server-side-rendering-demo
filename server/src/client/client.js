// this file is start up (boot up) point for client side application
import 'babel-polyfill'; // so can use async dispatch in actions > index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({

  baseURL: '/api'

});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// #root pulled from index.js on server app
// 'hydrate' is new React17 syntax, if change to 'render' will see warning message in browser console expanding on usage of hydrate
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
