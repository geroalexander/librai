const { REACT_APP_BASE_URL } = process.env;

const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return fetch(`${REACT_APP_BASE_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with register', err));
};

const login = (email: string, password: string) => {
  return fetch(`${REACT_APP_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with login', err));
};

const addFormInfo = (accessToken: string, info: object) => {
  return fetch(`${REACT_APP_BASE_URL}/auth/form`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ info }),
  });
};

const logout = (accessToken: string) => {
  return fetch(`${REACT_APP_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch((err) => console.log('error with logout', err));
};

export { register, login, addFormInfo, logout };
