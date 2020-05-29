import {
  USER_ADD,
  USER_DELETE,
  SHOW_MODAL,
  HIDE_MODAL,
  GET_ALL_USERS_SUCCESS
} from '../actions/userActions';

export const initialState = {
  isModal: false,
  user: null,
  usersList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD:
      return {
        ...state,
        user: action.payload
      };

    case USER_DELETE:
      return {
        ...state,
        user: null
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersList: action.payload
      };

    case SHOW_MODAL:
    case HIDE_MODAL:
      return {
        ...state,
        isModal: action.payload
      };

    default:
      return state;
  }
};
