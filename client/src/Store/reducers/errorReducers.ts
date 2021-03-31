import {
  SET_ERROR,
  REMOVE_ERROR,
  SET_AUTH_ERROR,
  SET_PWA_ERROR,
} from '../actions/ActionTypes';
import { AnyAction } from 'redux';

interface errorState {
  error: string;
  pwaError: string;
}

const initialState: errorState = {
  error: '',
  pwaError: '',
};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_AUTH_ERROR:
      return { ...state, error: 'Unauthorised, No access token!' };

    case SET_PWA_ERROR:
      return {
        ...state,
        pwaError:
          'This app is optimised to be a PWA, download it to your Home Screen to get the full experience:',
      };

    case REMOVE_ERROR:
      return { ...initialState };
  }
  return state;
}

export default reducer;
