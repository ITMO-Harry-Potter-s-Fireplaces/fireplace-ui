import axios from 'axios';
import Cookies from 'js-cookie';
import * as api from '../constants/api';

export const LOGIN_LOADING = 'login_loading';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const loginUser = (email, password) => async dispatch => {
  dispatch({
    type: LOGIN_LOADING
  });

  try {
    const res = await axios.post(api.loginUser(), {
      email,
      password
    });
    if (res.data.code !== 200) {
      throw Error(res.data.message);
    }
    Cookies.set('token', res.data.message.token);
    return dispatch({
      type: LOGIN_SUCCESS
    });
  } catch (error) {
    return dispatch({
      type: LOGIN_FAIL,
      error
    });
  }
};

export const registerUser = (
  email,
  password,
  name,
  surname,
  middleName,
  dateOfBirth
) => async dispatch => {
  dispatch({
    type: REGISTER_LOADING
  });

  try {
    const res = await axios.post(api.registerUser(), {
      email,
      password,
      name,
      surname,
      middleName,
      dateOfBirth
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
