import { register, login, addFormInfo, logout } from '../../ApiClientService/Auth';
import { User } from '../../Interfaces/user';
import { AppDispatch } from '../../App';
import { SET_LOGIN, SET_LOGOUT } from './ActionTypes';

export const setLogin = (user: User) => async (dispatch: AppDispatch) => {
  const { email, password } = user;
  const {accessToken} = await login(email, password);
  localStorage.setItem('accessToken', accessToken);
  dispatch({
    type: SET_LOGIN,
    payload: {
      isLoggedIn: true,
    },
  });
};

export const setLogout = () => async (dispatch: AppDispatch) => {
  const accessToken: string = localStorage.getItem('accessToken');
  localStorage.removeItem('accessToken');
  await logout(accessToken);
  dispatch({
    type: SET_LOGOUT,
    payload: {
      isLoggedIn: false,
    },
  });
};

const setRegister = () => async (dispatch: AppDispatch) => {
  
}

const setAddFormInfo = () => async (dispatch: AppDispatch) => {
  
}