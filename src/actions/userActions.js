import axios from 'axios';
import * as api from '../constants/api';

export const USER_DELETE = 'user_delete';
export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';

export const SHOW_FIREPLACE_MODAL = 'SHOW_FIREPLACE_MODAL';
export const HIDE_FIREPLACE_MODAL = 'HIDE_FIREPLACE_MODAL';

export const USER_ADD = 'user_add';

export const GET_FIREPLACES_LOADING = 'GET_FIREPLACES_LOADING';
export const GET_FIREPLACES_SUCCESS = 'GET_FIREPLACES_SUCCESS';
export const GET_FIREPLACES_FAIL = 'GET_FIREPLACES_FAIL';

export const CREATE_FIREPLACE_LOADING = 'CREATE_FIREPLACE_LOADING';
export const CREATE_FIREPLACE_SUCCESS = 'CREATE_FIREPLACE_SUCCESS';
export const CREATE_FIREPLACE_FAIL = 'CREATE_FIREPLACE_FAIL';

export const DELETE_USER_LOADING = 'DELETE_USER_LOADING';
export const DELETE_USER__SUCCESS = 'DELETE_USER__SUCCESS';
export const DELETE_USER__FAIL = 'DELETE_USER__FAIL';

export const DELETE_FIREPLACE_LOADING = 'DELETE_FIREPLACES_LOADING';
export const DELETE_FIREPLACE_SUCCESS = 'DELETE_FIREPLACES_SUCCESS';
export const DELETE_FIREPLACE_FAIL = 'DELETE_FIREPLACES_FAIL';

export const CREATE_CLAIM_LOADING = 'CREATE_CLAIM_LOADING';
export const CREATE_CLAIM_SUCCESS = 'CREATE_CLAIM_SUCCESS';
export const CREATE_CLAIM_FAIL = 'CREATE_CLAIM_FAIL';

export const APPROVE_CLAIM_LOADING = 'APPROVE_CLAIM_LOADING';
export const APPROVE_CLAIM_SUCCESS = 'APPROVE_CLAIM_SUCCESS';
export const APPROVE_CLAIM_FAIL = 'APPROVE_CLAIM_FAIL';

export const CANCEL_CLAIM_LOADING = 'CANCEL_CLAIM_LOADING';
export const CANCEL_CLAIM_SUCCESS = 'CANCEL_CLAIM_SUCCESS';
export const CANCEL_CLAIM_FAIL = 'CANCEL_CLAIM_FAIL';

export const GET_ALL_CLAIMS_LOADING = 'GET_ALL_CLAIMS_LOADING';
export const GET_ALL_CLAIMS_SUCCESS = 'GET_ALL_CLAIMS_SUCCESS';
export const GET_ALL_CLAIMS_FAIL = 'GET_ALL_CLAIMS_FAIL';

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

export const showFireplaceModal = () => {
  return {
    type: SHOW_FIREPLACE_MODAL
  };
};

export const hideFireplaceModal = () => {
  return {
    type: HIDE_FIREPLACE_MODAL
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

export const deactivateUser = (token, id) => async dispatch => {
  dispatch({
    type: DELETE_USER_LOADING
  });

  try {
    const response = await axios.delete(api.deleteUser(id), {
      headers: {Authorization: token}
    });
    if (response.data.code !== 204) {
      throw Error(response.data.message);
    }
    return dispatch({
      type: DELETE_USER__SUCCESS
    });
  } catch (error) {
    return dispatch({
      type: DELETE_USER__FAIL
    });
  }
};

export const getFireplaces = token => async dispatch => {
  dispatch({
    type: GET_FIREPLACES_LOADING
  });

  try {
    const res = await axios.get(api.getFireplaces(), {
      headers: {Authorization: token}
    });
    dispatch({
      type: GET_FIREPLACES_SUCCESS,
      payload: res.data.message.content
    });
  } catch (error) {
    dispatch({
      type: GET_FIREPLACES_FAIL,
      error
    });
  }
};

export const createFireplace = (token, lat, lng, description) => async dispatch => {
  dispatch({
    type: CREATE_FIREPLACE_LOADING
  });

  try {
    const res = await axios.post(
      api.createFireplace(),
      {lat, lng, description},
      {
        headers: {Authorization: token}
      }
    );
    return dispatch({
      type: CREATE_FIREPLACE_SUCCESS,
      payload: res.data.message.content
    });
  } catch (error) {
    return dispatch({
      type: CREATE_FIREPLACE_FAIL,
      error
    });
  }
};

export const deleteFireplace = (token, fireplaceId) => async dispatch => {
  dispatch({
    type: DELETE_FIREPLACE_LOADING
  });

  try {
    const res = await axios.delete(api.deleteFireplace(fireplaceId), {
      headers: {Authorization: token}
    });
    dispatch({
      type: DELETE_FIREPLACE_SUCCESS,
      payload: res.data.message.content
    });
  } catch (error) {
    dispatch({
      type: DELETE_FIREPLACE_FAIL,
      error
    });
  }
};

export const getAllClaims = token => async dispatch => {
  dispatch({
    type: GET_ALL_CLAIMS_LOADING
  });

  try {
    const res = await axios.get(api.getAllClaims(), {
      headers: {Authorization: token}
    });
    dispatch({
      type: GET_ALL_CLAIMS_SUCCESS,
      payload: res.data.message.content
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CLAIMS_FAIL,
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

    if (res.data.code !== 201) throw Error();

    return dispatch({
      type: CREATE_CLAIM_SUCCESS
    });
  } catch (error) {
    return dispatch({
      type: CREATE_CLAIM_FAIL,
      error: error.message
    });
  }
};

export const approveClaim = (token, claimId, approve) => async dispatch => {
  dispatch({
    type: APPROVE_CLAIM_LOADING
  });

  try {
    const res = await axios.put(
      api.approveClaim(claimId, approve),
      {},
      {
        headers: {Authorization: token}
      }
    );

    if (res.data.code !== 204) throw Error();

    return dispatch({
      type: APPROVE_CLAIM_SUCCESS,
      payload: {claimId, approve}
    });
  } catch (error) {
    return dispatch({
      type: APPROVE_CLAIM_FAIL,
      error: error.message
    });
  }
};

export const cancelClaim = (token, claimId, cancel) => async dispatch => {
  dispatch({
    type: CANCEL_CLAIM_LOADING
  });

  try {
    const res = await axios.delete(api.cancelClaim(claimId, cancel), {
      headers: {Authorization: token}
    });

    if (res.data.code !== 204) throw Error();

    return dispatch({
      type: CANCEL_CLAIM_SUCCESS,
      payload: {claimId, cancel}
    });
  } catch (error) {
    return dispatch({
      type: CANCEL_CLAIM_FAIL,
      error: error.message
    });
  }
};

export const del = () => {
  return {
    type: USER_DELETE
  };
};
