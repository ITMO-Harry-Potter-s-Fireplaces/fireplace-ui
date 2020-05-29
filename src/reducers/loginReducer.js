import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS
} from '../actions/loginActions';

export const initialState = {
  user: null,
  type: null,
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
    case REGISTER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        type: action.type,
        isLoading: false
      };

    default:
      return state;
  }
};
