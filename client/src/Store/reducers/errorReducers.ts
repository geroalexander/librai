import {
  SET_ERROR,
  REMOVE_ERROR,
  SET_AUTH_ERROR,
} from '../actions/ActionTypes';
import { AnyAction } from 'redux';

interface errorState {
  error: string;
}

const initialState: errorState = {
  error: '',
};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_AUTH_ERROR:
      return { ...state, error: 'Unauthorised, No access token!' };

    case REMOVE_ERROR:
      return { ...initialState };
  }
  return state;
}

export default reducer;
