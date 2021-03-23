import {
  register,
  login,
  addFormInfo,
  logout,
} from '../../ApiClientService/Auth';
import { Login } from '../../Interfaces/loginObject';
import { Form } from '../../Interfaces/formObject';
import { AppDispatch } from '../../App';
import {
  SET_LOGIN,
  SET_LOGOUT,
  SET_REGISTER,
  SET_ADD_FORM_INFO,
} from './ActionTypes';

export const setLogin = (loginObject: Login) => async (
  dispatch: AppDispatch
) => {
  const { email, password } = loginObject;
  const { accessToken } = await login(email, password);
  localStorage.setItem('accessToken', accessToken);
  dispatch({ type: SET_LOGIN });
};

export const setLogout = () => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  localStorage.removeItem('accessToken');
  if (accessToken) await logout(accessToken);
  dispatch({ type: SET_LOGOUT });
};

export const setRegister = (form: Form) => async (dispatch: AppDispatch) => {
  const { firstName, lastName, email, password } = form;
  const { accessToken } = await register(firstName, lastName, email, password);
  localStorage.setItem('accessToken', accessToken);
  dispatch({ type: SET_REGISTER });
};

// const setAddFormInfo = () => async (dispatch: AppDispatch) => {}
