import { AnyAction } from 'redux';
import {
  SET_LOGIN,
  SET_REGISTER,
  SET_LOGOUT,
  SET_ADD_FORM_INFO,
} from '../actions/ActionTypes';

const initialState = {
  signedIn: false,
  fillForm: false,
};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, signedIn: true };

    case SET_LOGOUT:
      return { ...state, signedIn: false };

    case SET_REGISTER:
      return { ...state, signedIn: true, fillForm: true };

    case SET_ADD_FORM_INFO:
      return { ...state };
  }
  return state;
}

export default reducer;
