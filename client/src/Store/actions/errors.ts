import {
  SET_ERROR,
  REMOVE_ERROR,
  SET_AUTH_ERROR,
  SET_PWA_ERROR,
} from './ActionTypes';

export const setError = (error: string) => {
  return { type: SET_ERROR, payload: error };
};

export const setAuthError = () => ({
  type: SET_AUTH_ERROR,
});

export const setPwaError = () => ({
  type: SET_PWA_ERROR,
});

export const removeError = () => ({
  type: REMOVE_ERROR,
});
