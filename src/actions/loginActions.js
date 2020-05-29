import axios from 'axios';
import Cookies from 'js-cookie';
import {LOGIN_REQUEST, REGISTER_REQUEST} from '../constants/api';

export const LOGIN_LOADING = 'login_loading';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const loginUser = (login, password) => async dispatch => {
  dispatch({
    type: LOGIN_LOADING
  });

  try {
    const res = await axios.post(LOGIN_REQUEST, {
      login,
      password
    });
    if (res.data.code !== 200) {
      throw Error(res.data.message);
    }
    Cookies.set('token', res.data.message.token);
    dispatch({
      type: LOGIN_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      error
    });
  }
};

export const registerUser = (login, password) => async dispatch => {
  dispatch({
    type: REGISTER_LOADING
  });

  try {
    const res = await axios.post(REGISTER_REQUEST, {
      login,
      password
    });
    if (res.data.code !== 200) {
      throw Error(res.data.message);
    }
    Cookies.set('token', res.data.message.token);
    dispatch({
      type: REGISTER_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      error
    });
  }
};
