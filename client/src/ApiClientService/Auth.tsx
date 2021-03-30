import { fetchRequest } from './fetchRequest';

const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const path = '/auth/register';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  };
  return fetchRequest(path, options);
};

const login = (email: string, password: string) => {
  const path = '/auth/login';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  return fetchRequest(path, options);
};

const logout = (accessToken: string) => {
  const path: string = '/auth/logout';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetchRequest(path, options);
};

const googleLogin = (googleData: any) => {
  const path = '/auth/google';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({
      token: googleData.tokenId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetchRequest(path, options);
};

export { register, login, logout, googleLogin };
