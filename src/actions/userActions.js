import axios from 'axios';
import * as api from '../constants/api';

export const USER_DELETE = 'user_delete';
export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';
export const USER_ADD = 'user_add';

export const GET_COORD_LOADING = 'GET_COORD_LOADING';
export const GET_COORD_SUCCESS = 'get_coord_success';
export const GET_COORD_FAIL = 'get_coord_fail';

export const CREATE_CLAIM_LOADING = 'CREATE_CLAIM_LOADING';
export const CREATE_CLAIM_SUCCESS = 'CREATE_CLAIM_SUCCESS';
export const CREATE_CLAIM_FAIL = 'CREATE_CLAIM_FAIL';

export const GET_CURRENT_CLAIMS_LOADING = 'GET_CURRENT_CLAIMS_LOADING';
export const GET_CURRENT_CLAIMS_SUCCESS = 'GET_CURRENT_CLAIMS_SUCCESS';
export const GET_CURRENT_CLAIMS_FAIL = 'GET_CURRENT_CLAIMS_FAIL';

export const GET_ALL_USERS_LOADING = 'GET_ALL_USERS_LOADING';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

export const add = user => {
  return {
    type: USER_ADD,
    payload: user
  };
};

export const showModal = selectedItem => {
  return {
    type: SHOW_MODAL,
    payload: {isShown: true, item: selectedItem}
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
    payload: {isShown: false}
  };
};

export const getAllUsers = token => async dispatch => {
  dispatch({
    type: GET_ALL_USERS_LOADING
  });

  try {
    const response = await axios.get(api.getAllUsers(), {
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

export const getFireplaces = token => async dispatch => {
  dispatch({
    type: GET_COORD_LOADING
  });

  try {
    const res = await axios.get(api.getFireplaces(), {
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

export const getCurrentClaims = token => async dispatch => {
  dispatch({
    type: GET_CURRENT_CLAIMS_LOADING
  });

  try {
    const res = await axios.get(api.getCurrentClaims(), {
      headers: {Authorization: token}
    });
    dispatch({
      type: GET_CURRENT_CLAIMS_SUCCESS,
      payload: res.data.message.content
    });
  } catch (error) {
    dispatch({
      type: GET_CURRENT_CLAIMS_FAIL,
      error
    });
  }
};

export const createClaim = (token, arrivalId, departureId) => async dispatch => {
  dispatch({
    type: CREATE_CLAIM_LOADING
  });

  try {
    const res = await axios.post(
      api.createClaim(),
      {arrivalId, departureId, departureTime: new Date().toISOString()},
      {
        headers: {Authorization: token}
      }
    );
    return dispatch({
      type: CREATE_CLAIM_SUCCESS
    });
  } catch (error) {
    return dispatch({
      type: CREATE_CLAIM_FAIL,
      error
    });
  }
};

export const del = () => {
  return {
    type: USER_DELETE
  };
};
