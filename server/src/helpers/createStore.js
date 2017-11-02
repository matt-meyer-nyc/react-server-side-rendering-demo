import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

// req passed from index.js of src file
export default req => {
    // no proxy here b/c is for server side, have to use full url
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' } // if user has cookie copy to outgoing request, otherwise, set to empty string (can't have it null)
  });                                            // tricks api into thinking request came from a real user

  const store = createStore(

    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))

  );

  return store;

};
