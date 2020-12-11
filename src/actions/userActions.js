import axios from 'axios';
import {GET_ALL_USERS, GET_COORDINATES} from '../constants/api';

export const USER_DELETE = 'user_delete';
export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';
export const USER_ADD = 'user_add';

export const GET_COORD_LOADING = 'GET_COORD_LOADING';
export const GET_COORD_SUCCESS = 'get_coord_success';
export const GET_COORD_FAIL = 'get_coord_fail';

export const GET_ALL_USERS_LOADING = 'GET_ALL_USERS_LOADING';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

export const add = user => {
  return {
    type: USER_ADD,
    payload: user
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
    payload: true
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
    payload: false
  };
};

export const getAllUsers = token => async dispatch => {
  dispatch({
    type: GET_ALL_USERS_LOADING
  });

  try {
    const response = await axios.get(GET_ALL_USERS, {
      headers: {Authorization: token}
    });
    console.log(response);
    if (response.data.code !== 200) {
      throw Error(response.data.message);
    }
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: response.data.message.content
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL
    });
  }
};

export const getCoordinates = (lat, lng, token) => async dispatch => {
  dispatch({
    type: GET_COORD_LOADING
  });

  try {
    const res = await axios.get(GET_COORDINATES, {
      headers: {Authorization: token}
    });
    dispatch({
      type: GET_COORD_SUCCESS,
      payload: res.data.message.content
    });
  } catch (error) {
    dispatch({
      type: GET_COORD_FAIL,
      error
    });
  }
};

export const del = () => {
  return {
    type: USER_DELETE
  };
};
