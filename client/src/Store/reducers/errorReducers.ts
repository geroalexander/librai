import { SET_ERROR, REMOVE_ERROR } from '../actions/ActionTypes';
import { AnyAction } from 'redux';

interface userState {
  error: string | '';
}

const initialState: userState = {
  error: '',
};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };

    case REMOVE_ERROR:
      return { ...initialState };
  }
  return state;
}

export default reducer;
