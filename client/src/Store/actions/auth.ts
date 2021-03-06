import {
  register,
  login,
  logout,
  googleLogin,
} from '../../ApiClientService/Auth';
import { Login } from '../../Interfaces/loginObject';
import { RegistrationInfo } from '../../Interfaces/registrationObject';
import { AppDispatch } from '../../index';

import {
  SET_LOGIN,
  SET_LOGOUT,
  SET_REGISTER,
  LOG_USER_OUT,
} from './ActionTypes';

export const setLogin = (loginObject: Login) => async (
  dispatch: AppDispatch
) => {
  const { email, password } = loginObject;
  try {
    const response = await login(email, password);
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      dispatch({ type: SET_LOGIN });
    }
    return response;
  } catch (error) {
    return { error };
  }
};

export const setGoogleLogin = (googleData: any) => async (
  dispatch: AppDispatch
) => {
  const data = await googleLogin(googleData);
  let accessType;
  let accessToken;
  if (data) {
    accessType = data.accessType;
    accessToken = data.accessToken;
  }
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (accessType === 'login') dispatch({ type: SET_LOGIN });
  else if (accessType === 'register') dispatch({ type: SET_REGISTER });
  return accessType;
};

export const setLogout = () => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');

  if (accessToken) await logout(accessToken);
  localStorage.removeItem('accessToken');
  dispatch({ type: SET_LOGOUT });
  dispatch({ type: LOG_USER_OUT });
};

export const setRegister = (form: RegistrationInfo) => async (
  dispatch: AppDispatch
) => {
  const { firstName, lastName, email, password } = form;
  try {
    const response = await register(firstName, lastName, email, password);
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      dispatch({ type: SET_REGISTER });
    }
    return response;
  } catch (error) {
    return { error };
  }
};
