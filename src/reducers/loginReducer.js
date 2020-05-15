import {LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_FAIL} from '../actions/loginActions';

export const initialState = {
  user: null,
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
