import {
  USER_ADD,
  USER_DELETE,
  SHOW_MODAL,
  HIDE_MODAL,
  GET_ALL_USERS_SUCCESS,
  GET_FIREPLACES_SUCCESS,
  GET_CURRENT_CLAIMS_SUCCESS,
  GET_ALL_CLAIMS_SUCCESS,
  APPROVE_CLAIM_SUCCESS,
  CANCEL_CLAIM_SUCCESS,
  SHOW_FIREPLACE_MODAL,
  HIDE_FIREPLACE_MODAL,
  SET_MODAL_1,
  SET_MODAL_2,
  SET_STARTING_POINT,
  SET_FINAL_POINT,
  CLEAR_ALL_ST_POINTS
} from '../actions/userActions';

export const initialState = {
  isModal: false,
  isModal1: false,
  isModal2: false,
  startingPoint: null,
  finalPoint: null,
  isFireplaceModal: false,
  selectedModalItem: null,
  user: null,
  usersList: [],
  fireplacesList: [],
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

    case GET_FIREPLACES_SUCCESS:
      return {
        ...state,
        fireplacesList: action.payload
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

    case CLEAR_ALL_ST_POINTS:
      return {
        ...state,
        startingPoint: null,
        finalPoint: null
      };

    case SET_MODAL_1:
      return {
        ...state,
        isModal1: action.payload.isShown
      };

    case SET_STARTING_POINT:
      return {
        ...state,
        startingPoint: {lat: action.payload.lat, lng: action.payload.lng}
      };

    case SET_FINAL_POINT:
      return {
        ...state,
        finalPoint: {lat: action.payload.lat, lng: action.payload.lng}
      };

    case SET_MODAL_2:
      return {
        ...state,
        isModal2: action.payload.isShown
      };

    case SHOW_MODAL:
      return {
        ...state,
        isModal: action.payload.isShown
      };

    case HIDE_MODAL:
      return {
        ...state,
        isModal: action.payload.isShown
      };

    case SHOW_FIREPLACE_MODAL:
      return {
        ...state,
        isFireplaceModal: true
      };

    case HIDE_FIREPLACE_MODAL:
      return {
        ...state,
        isFireplaceModal: false
      };

    default:
      return state;
  }
};
