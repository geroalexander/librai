import { Book } from '../Interfaces/bookObject';
const { REACT_APP_BASE_URL } = process.env;

const loadDashboard = (accessToken: string) => {
  return fetch(`${REACT_APP_BASE_URL}/user/dashboard`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('error fetching dashboard', err));
};

const getUserWithBooks = (accessToken: string) => {
  return fetch(`${REACT_APP_BASE_URL}/user/profile`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('error fetching userWithBooks', err));
};

const addSavedBook = (accessToken: string, book: Book) => {
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
  books: Book[],
  rating: number
) => {
  return fetch(`${REACT_APP_BASE_URL}/user/form`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ books, rating }),
  }).catch((err) => console.log('error with registrationForm', err));
};

const updateProfile = (
  accessToken: string,
  profilePic: string,
  favoriteGenres: string[],
  email: string
) => {
  return fetch(`${REACT_APP_BASE_URL}/user/update`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ profilePic, favoriteGenres, email }),
  }).catch((err) => console.log('error with registrationForm', err));
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
