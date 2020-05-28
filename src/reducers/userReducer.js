import {USER_ADD, USER_DELETE, SHOW_MODAL, HIDE_MODAL} from '../actions/userActions';

export const initialState = {
  isModal: false,
  user: null
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
