import {
  USER_ADD,
  USER_DELETE,
  SHOW_MODAL,
  HIDE_MODAL,
  GET_ALL_USERS_SUCCESS,
  GET_COORD_SUCCESS,
  GET_CURRENT_CLAIMS_SUCCESS,
  GET_ALL_CLAIMS_SUCCESS,
  APPROVE_CLAIM_SUCCESS,
  CANCEL_CLAIM_SUCCESS
} from '../actions/userActions';

export const initialState = {
  isModal: false,
  selectedModalItem: null,
  user: null,
  usersList: [],
  coordList: [],
  claimsList: []
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

    case GET_COORD_SUCCESS:
      return {
        ...state,
        coordList: action.payload
      };

    case GET_ALL_CLAIMS_SUCCESS:
    case GET_CURRENT_CLAIMS_SUCCESS:
      return {
        ...state,
        claimsList: action.payload
      };

    case APPROVE_CLAIM_SUCCESS: {
      const array = state.claimsList;
      for (let i in array) {
        if (array[i].id === action.payload.claimId) {
          array[i].status = action.payload.approve ? 'APPROVED' : 'REJECTED';
          break; //Stop this loop, we found it!
        }
      }
      return {
        ...state,
        claimsList: [...array]
      };
    }

    case CANCEL_CLAIM_SUCCESS: {
      const array = state.claimsList;
      for (let i in array) {
        if (array[i].id === action.payload.claimId) {
          array[i].status = action.payload.cancel ? 'CANCELLED' : 'COMPLETED';
          break; //Stop this loop, we found it!
        }
      }
      return {
        ...state,
        claimsList: [...array]
      };
    }

    case SHOW_MODAL:
      return {
        ...state,
        selectedModalItem: action.payload.item,
        isModal: action.payload.isShown
      };

    case HIDE_MODAL:
      return {
        ...state,
        selectedModalItem: null,
        isModal: action.payload.isShown
      };

    default:
      return state;
  }
};
