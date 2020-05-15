import axios from 'axios';
import Cookies from 'js-cookie';
import {LOGIN_REQUEST} from '../constants/api';

export const LOGIN_LOADING = 'login_loading';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

export const loginUser = (login, password) => async dispatch => {
  dispatch({
    type: LOGIN_LOADING
  });

  try {
    const res = await axios.post(LOGIN_REQUEST, {
      login,
      password
    });
    Cookies.set('token', '111');
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      error
    });
  }
};
