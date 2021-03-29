import { SET_ERROR, REMOVE_ERROR } from "../actions/ActionTypes";
import { AnyAction } from 'redux';
import { initial } from "lodash";

interface userState {
  error: string | '';
}

const initialState: userState = {
  error: '',

};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload.error};

    case REMOVE_ERROR:
      return { ...state, error: action.payload};
  }
  return state;
}

export default reducer