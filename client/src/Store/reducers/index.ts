import { combineReducers } from 'redux';
import authReducer from './authReducers';
import userReducer from './userReducers';

const reducers = combineReducers({
  authReducer,
  userReducer,
});

export default reducers;
