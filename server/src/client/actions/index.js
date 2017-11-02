export const FETCH_USERS = 'fetch_users';                 // api here essentially is axiosInstance (from client.js) renamed
export const fetchUsers = () => async (dispatch, getState, api) => {

  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res // response from api
  });

};

export const FETCH_CURRENT_USER = 'fetch_current_user';                 // api here essentially is axiosInstance (from client.js) renamed
export const fetchCurrentUser = () => async (dispatch, getState, api) => {

  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });

};

export const FETCH_ADMINS = 'fetch_admins';                 // api here essentially is axiosInstance (from client.js) renamed
export const fetchAdmins = () => async (dispatch, getState, api) => {

  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });

};
