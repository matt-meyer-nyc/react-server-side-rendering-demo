import { FETCH_CURRENT_USER } from '../actions';

export default function(state = null, action)  { // start with 'state = null' for authentication files indicating we don't know if user is signed in
                                        // receive action
  // switch action's type
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return action.payload.data || false; // if action.payload.data is not defined (user not signed in), make this even clearer by returning false
// above, if user is authenticated
    default:
      return state;

  }

}
