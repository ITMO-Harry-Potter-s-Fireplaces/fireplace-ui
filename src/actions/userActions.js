import axios from 'axios';

export const USER_DELETE = 'user_delete';
export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';
export const USER_ADD = 'user_add';

export const GET_COORD_LOADING = 'GET_COORD_LOADING';
export const GET_COORD_SUCCESS = 'get_coord_success';
export const GET_COORD_FAIL = 'get_coord_fail';

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

// export const getCoordinates = (lat, lng) => async dispatch => {
//   dispatch({
//     type: GET_COORD_LOADING
//   });

//   try {
//     const res = await axios.post(LOGIN_REQUEST, {
//       login,
//       password
//     });
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       error
//     });
//   }
// };

export const del = () => {
  return {
    type: USER_DELETE
  };
};
