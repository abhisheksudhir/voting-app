import { addError, removeError } from './error';
import { SET_CURRENT_USER } from '../actionTypes';
import api from '../../services/api';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user,
  });

export const setToken = token => {
    api.setToken(token);
  };

//getting user is async and therefore we must call the api. For that we use thunk
export const authUser = (path, data) => {
    return async dispatch => {
      try {
        const { token, ...user } = await api.call('post', `auth/${path}`, data);
        localStorage.setItem('jwtToken', token);    //localStorage is the browser. This line helps the user stay logged in even if they close the window
        api.setToken(token);
        dispatch(setCurrentUser(user));
        dispatch(removeError());
      } catch (err) {
        const error  = err.response.data;
        dispatch(addError(error.message));  //dispatch comes from redux thunk and it calls the action we created(addError). dispatch then sends it to redux
      }
    };
  };

export const logout = () => {
    return dispatch => {
      localStorage.clear();
      api.setToken(null);   //to get rid of the token saved in axios
      dispatch(setCurrentUser({}));
      dispatch(removeError());
    };
  };
