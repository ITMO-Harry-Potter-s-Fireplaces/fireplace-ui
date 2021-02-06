import axios from 'axios';
import * as api from '../constants/api';

export const USER_DELETE = 'user_delete';
export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';

export const SET_MODAL_1 = 'set_modal_1';
export const SET_MODAL_2 = 'set_modal_2';

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

export const REJECT_CLAIM_LOADING = 'REJECT_CLAIM_LOADING';
export const REJECT_CLAIM_SUCCESS = 'REJECT_CLAIM_SUCCESS';
export const REJECT_CLAIM_FAIL = 'REJECT_CLAIM_FAIL';

export const COMPLETE_CLAIM_LOADING = 'COMPLETE_CLAIM_LOADING';
export const COMPLETE_CLAIM_SUCCESS = 'COMPLETE_CLAIM_SUCCESS';
export const COMPLETE_CLAIM_FAIL = 'COMPLETE_CLAIM_FAIL';

export const REPORT_CLAIM_LOADING = 'REPORT_CLAIM_LOADING';
export const REPORT_CLAIM_SUCCESS = 'REPORT_CLAIM_SUCCESS';
export const REPORT_CLAIM_FAIL = 'REPORT_CLAIM_FAIL';

export const GET_ALL_CLAIMS_LOADING = 'GET_ALL_CLAIMS_LOADING';
export const GET_ALL_CLAIMS_SUCCESS = 'GET_ALL_CLAIMS_SUCCESS';
export const GET_ALL_CLAIMS_FAIL = 'GET_ALL_CLAIMS_FAIL';

export const GET_CURRENT_CLAIMS_LOADING = 'GET_CURRENT_CLAIMS_LOADING';
export const GET_CURRENT_CLAIMS_SUCCESS = 'GET_CURRENT_CLAIMS_SUCCESS';
export const GET_CURRENT_CLAIMS_FAIL = 'GET_CURRENT_CLAIMS_FAIL';

export const GET_ALL_USERS_LOADING = 'GET_ALL_USERS_LOADING';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

export const SET_STARTING_POINT = 'SET_STARTING_POINT';
export const SET_FINAL_POINT = 'SET_FINAL_POINT';
export const CLEAR_ALL_ST_POINTS = 'CLEAR_ALL_ST_POINTS';

export const GET_CLAIM_BY_ID_LOADING = 'GET_CLAIM_BY_ID_LOADING';
export const GET_CLAIM_BY_ID_SUCCESS = 'GET_CLAIM_BY_ID_SUCCESS';
export const GET_CLAIM_BY_ID_FAIL = 'GET_CLAIM_BY_ID_FAIL';

export const CLEAR_CLAIM_BY_ID = 'CLEAR_CLAIM_BY_ID';

export const GET_DEPARTURE_FIREPLACES_SUCCESS = 'GET_DEPARTURE_FIREPLACES_SUCCESS';
export const GET_ARRIVAL_FIREPLACES_SUCCESS = 'GET_ARRIVAL_FIREPLACES_SUCCESS';
export const GET_DEPARTURE_FIREPLACES_FAIL = 'GET_DEPARTURE_FIREPLACES_FAIL';
export const GET_ARRIVAL_FIREPLACES_FAIL = 'GET_ARRIVAL_FIREPLACES_FAIL';

export const add = user => {
  return {
    type: USER_ADD,
    payload: user
  };
};

export const setModal1 = status => {
  return {
    type: SET_MODAL_1,
    payload: {isShown: status}
  };
};

export const setModal2 = status => {
  return {
    type: SET_MODAL_2,
    payload: {isShown: status}
  };
};

export const clearAllStPoints = () => {
  return {
    type: CLEAR_ALL_ST_POINTS
  };
};

export const setStartingPoint = (lat, lng) => {
  return {
    type: SET_STARTING_POINT,
    payload: {lat, lng}
  };
};

export const setFinalPoint = (lat, lng) => {
  return {
    type: SET_FINAL_POINT,
    payload: {lat, lng}
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

export const clearClaimById = () => {
  return {
    type: CLEAR_CLAIM_BY_ID
  };
};

export const getClaimById = (token, id) => async dispatch => {
  dispatch({
    type: GET_CLAIM_BY_ID_LOADING
  });

  try {
    const response = await axios.get(api.getClaimById(id), {
      headers: {Authorization: token}
    });
    if (response.data.code !== 200) {
      throw Error(response.data.message);
    }
    return dispatch({
      type: GET_CLAIM_BY_ID_SUCCESS,
      payload: response.data.message
    });
  } catch (error) {
    return dispatch({
      type: GET_CLAIM_BY_ID_FAIL
    });
  }
};

export const getAllUsers = token => async dispatch => {
  dispatch({
    type: GET_ALL_USERS_LOADING
  });

  try {
    const response = await axios.get(api.getAllUsers(), {
      params: {'size': 100000},
      headers: {Authorization: token}
    });
    if (response.data.code !== 200) {
      throw Error(response.data.message);
    }
    return dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: response.data.message.content
    });
  } catch (error) {
    return dispatch({
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

export const getFireplaces = (token, lng, lat, radius, travelDate, _type) => async dispatch => {
  dispatch({
    type: GET_FIREPLACES_LOADING
  });
  if (_type === 'departure') {
     try {
      const res = await axios.get(api.getFireplaces(), 
        {params: {'lat': lat, 'lng': lng, 'radius': radius,
        'travelDate': travelDate.substring(6,) + '-' + travelDate.substring(3, 5) + '-' + travelDate.substring(0, 2)},
        headers: {Authorization: token}
      });
      if (res.data.code !== 200) {
        throw Error(res.data.message);
      }
      return dispatch({
        type: GET_DEPARTURE_FIREPLACES_SUCCESS,
        payload: res.data.message.content
      }); 
      } catch (error) {
        return dispatch({
        type: GET_DEPARTURE_FIREPLACES_FAIL,
        error
        });
      }
    }

    if (_type === 'arrival') {
      try {
        const res = await axios.get(api.getFireplaces(), 
          {params: {'lat': lat, 'lng': lng, 'radius': radius,
          'travelDate': travelDate.substring(6,) + '-' + travelDate.substring(3, 5) + '-' + travelDate.substring(0, 2)},
          headers: {Authorization: token}
        });
        if (res.data.code !== 200) {
          throw Error(res.data.message);
        }
        return dispatch({
          type: GET_ARRIVAL_FIREPLACES_SUCCESS,
          payload: res.data.message.content
        }); 
        } catch (error) {
          return dispatch({
          type: GET_ARRIVAL_FIREPLACES_FAIL,
          error
          });
        }
      }
      try {
        const res = await axios.get(api.getFireplaces(), 
          {headers: {Authorization: token}
        });
        if (res.data.code !== 200) {
          throw Error(res.data.message);
        }
      return dispatch({
        type: GET_FIREPLACES_SUCCESS,
        payload: res.data.message.content
      });
    } catch (error) {
    return dispatch({
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
      params: {'size': 1000000},
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
      params: {'size': 1000000},
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

export const createClaim = (token, startingPoint, finalPoint, travelDate) => async dispatch => {
  dispatch({
    type: CREATE_CLAIM_LOADING
  });

  try {
    const res = await axios.post(
      api.createClaim(),
      {
        "departure": {"lng": startingPoint.lng, "lat": startingPoint.lat},
        "arrival": {"lng": finalPoint.lng, "lat": finalPoint.lat},
        "travelDate": travelDate.toISOString()
      },
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

export const approveClaim = (token, claimId, departure_id, arrival_id) => async dispatch => {
  dispatch({
    type: APPROVE_CLAIM_LOADING
  });
  var query = api.approveClaim(claimId, departure_id, arrival_id);
  try {
    var request = require('request');

    var headers = {
      'accept': 'application/json',
      'Authorization': token};

    var options = {
      url: query,
      method: 'PUT',
      headers: headers
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 204) {
          console.log(body);
      }
    }
    request(options, callback);

    

    return dispatch({
        type: APPROVE_CLAIM_SUCCESS,
        payload: {claimId, departure_id, arrival_id}
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

export const rejectClaim = (token, claimId) => async dispatch => {
  dispatch({
    type: REJECT_CLAIM_LOADING
  });

  try {
    const res = await axios.delete(api.rejectClaim(claimId), {
      headers: {Authorization: token}
    });

    if (res.data.code !== 204) throw Error();

    return dispatch({
      type: REJECT_CLAIM_SUCCESS,
      payload: {claimId}
    });
  } catch (error) {
    return dispatch({
      type: REJECT_CLAIM_FAIL,
      error
    });
  }
};

export const completeClaim = (token, id) => async dispatch => {
  dispatch({
    type: COMPLETE_CLAIM_LOADING
  });

  try {
    const res = await axios.post(
      api.completeClaim(id), {},
      {
        headers: {Authorization: token}
      }
    );
    return dispatch({
      type: COMPLETE_CLAIM_SUCCESS,
      payload: id
    });
  } catch (error) {
    return dispatch({
      type: COMPLETE_CLAIM_FAIL,
      error
    });
  }
};

export const reportClaim = (token, id) => async dispatch => {
  dispatch({
    type: REPORT_CLAIM_LOADING
  });

  try {
    const res = await axios.post(
      api.reportClaim(id), {},
      {
        headers: {Authorization: token}
      }
    );
    if (res.data.code !== 204) {
      throw Error(res.data.message);
    }
    return dispatch({
      type: REPORT_CLAIM_SUCCESS,
      payload: id
    });
  } catch (error) {
    return dispatch({
      type: REPORT_CLAIM_FAIL,
      error: "Нельзя пожаловаться на заявку"
    });
  }
};

export const del = () => {
  return {
    type: USER_DELETE
  };
};
