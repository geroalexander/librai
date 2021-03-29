import { Book } from '../Interfaces/bookObject';
import { PopularBook } from '../Interfaces/popularBookObject';
import { fetchRequest } from './fetchRequest';
const { REACT_APP_BASE_URL } = process.env;

const loadDashboard = (accessToken: string) => {
  const path: string = '/user/dashboard';
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetchRequest(path, options);

  // return fetch(`${REACT_APP_BASE_URL}/user/dashboard`, {
  //   method: 'GET',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.log('error fetching dashboard', err));
};

const getUserWithBooks = (accessToken: string) => {
  const path: string = '/user/profile';
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetchRequest(path, options);

  // return fetch(`${REACT_APP_BASE_URL}/user/profile`, {
  //   method: 'GET',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.log('error fetching userWithBooks', err));
};

const addSavedBook = (accessToken: string, book: Book) => {
  // const path: string = '/user/saved';
  // const options: RequestInit = {
  // method: 'PATCH',
  // credentials: 'include',
  // // mode: 'cors',
  // headers: {
  // 'Content-Type': 'application/json',
  // // Authorization: `Bearer ${accessToken}`,
  // // },
  // // body: JSON.stringify({ book }),
  // };
  // return fetchRequest(path, options);

  return fetch(`${REACT_APP_BASE_URL}/user/saved`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with addSavedBook', err));
};

const updateRating = (accessToken: string, book: Book, rating: number) => {
  // const path: string = '/user/rating';
  // const options = {
  // method: 'PATCH',
  // // credentials: 'include',
  // // // mode: 'cors',
  // // headers: {
  // // // // 'Content-Type': 'application/json',
  // // // // Authorization: `Bearer ${accessToken}`,
  // // },
  // // // body: JSON.stringify({
  // // book,
  // // // rating,
  // // }),
  // };
  // return fetchRequest(path, options);

  return fetch(`${REACT_APP_BASE_URL}/user/rating`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      book,
      rating,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with updateRating', err));
};

const deleteSavedBook = (accessToken: string, book: Book) => {
  // const path: string = '/user/saved';
  // const options: RequestInit = {
  //   method: 'DELETE',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify({ book }),
  // };
  // return fetchRequest(path, options);

  return fetch(`${REACT_APP_BASE_URL}/user/saved`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  }).catch((err) => console.log('error with deleteSavedBook', err));
};

const deleteRating = (accessToken: string, book: Book) => {
  // const path: string = '/user/rating';
  // const options: RequestInit = {
  //   method: 'DELETE',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify({ book }),
  // };
  // return fetchRequest(path, options);

  return fetch(`${REACT_APP_BASE_URL}/user/rating`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  }).catch((err) => console.log('error with deleteRating', err));
};

const registrationForm = (
  accessToken: string,
  books: PopularBook[],
  favoriteGenres: string[]
) => {
  // const path: string = '/user/form';
  // const options: RequestInit = {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify({ books, favoriteGenres }),
  // }
  // return fetchRequest(path, options);

  return fetch(`${REACT_APP_BASE_URL}/user/form`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ books, favoriteGenres }),
  }).catch((err) => console.log('error with registrationForm', err));
};

const updateProfile = (
  accessToken: string,
  profilePic: string | null,
  favoriteGenres: string[] | null,
  email: string | null
) => {
  // const path: string = '/user/update';
  // const options: RequestInit = {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify({ profilePic, favoriteGenres, email }),
  // }
  // return fetchRequest(path, options);

  return fetch(`${REACT_APP_BASE_URL}/user/update`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ profilePic, favoriteGenres, email }),
  }).catch((err) => console.log('error with updateProfile', err));
};

export {
  loadDashboard,
  getUserWithBooks,
  addSavedBook,
  updateRating,
  deleteSavedBook,
  deleteRating,
  registrationForm,
  updateProfile,
};
