import {combineReducers} from 'redux';
import loginReducer from './loginReducer';

export const appReducer = combineReducers({
  login: loginReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
