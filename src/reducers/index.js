import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import userReducer from './userReducer';

export const appReducer = combineReducers({
  login: loginReducer,
  user: userReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
