import { combineReducers } from 'redux';
import authReducer from './authReducers';
import userReducer from './userReducers';
import errorReducer from './errorReducers';

const reducers = combineReducers({
  authReducer,
  userReducer,
  errorReducer,
});

export default reducers;
