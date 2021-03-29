import { SET_ERROR, REMOVE_ERROR } from './ActionTypes';

export const setError = (error: string) => {
  return { type: SET_ERROR, payload: error };
};

export const removeError = () => ({
  type: REMOVE_ERROR,
});
