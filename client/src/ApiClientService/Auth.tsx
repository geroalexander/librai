import { responsiveFontSizes } from "@material-ui/core";

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
  // call client function
  return fetch(`${REACT_APP_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(res => res.ok ? res: Promise.reject(res.status))
  .then(res => res.json())
  .catch(err => err)
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


// single client function(endpoint, options)

// interface Config {
//   method: string,
//   credentials: string,
//   mode: string,
//   headers: {
//     [key: string] : string,
//     Authorization: string
//   }
//   body?: any;
// }

// const fetchRequest = (path: string, body: any, customConfig: Config) => {
//   const token = localStorage.getItem('accessToken')
//   const headers = {'content-type': 'application/json'}
//   const config: Config = {
//     method: body ? 'POST' : 'GET',
//     ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     }
//   }
//   if (token) {
//     headers.Authorization = `Bearer ${token}`
//   }
//   if (body) {
//     config.body = JSON.stringify(body)
//   }

//   return fetch(REACT_APP_BASE_URL + path, options)
//     .then(async (res) => {
//       if (res.ok) {
//         return await res.json();
//       } else {
//         const errorMessage = await res.text()
//         return Promise.reject(new Error(errorMessage))
//       }
//     }
// }



export { register, login, addFormInfo, logout };
