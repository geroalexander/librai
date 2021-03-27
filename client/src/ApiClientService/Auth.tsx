const { REACT_APP_BASE_URL } = process.env;

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

  // return fetch(`${REACT_APP_BASE_URL}/auth/register`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ firstName, lastName, email, password }),
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.log('error with register', err));
};

const login = (email: string, password: string) => {
  // call client function
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

  // return fetch(`${REACT_APP_BASE_URL}/auth/login`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email, password }),
  // })
  //   .then((res) => (res.ok ? res : Promise.reject(res.status)))
  //   .then((res) => res.json())
  //   .catch((err) => err);
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

  // return fetch(`${REACT_APP_BASE_URL}/auth/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }).catch((err) => console.log('error with logout', err));
};

async function fetchRequest(path: string, options: RequestInit) {
  const url: RequestInfo = REACT_APP_BASE_URL + path;
  const res = await fetch(url, options);
  if (res.ok) return await res.json();
  else {
    const { msg } = await res.json();
    console.error(`Error with path: ${path}`, msg);
    return Promise.reject(new Error(msg));
  }
}

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

export { register, login, logout };
