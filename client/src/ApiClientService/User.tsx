import { Book } from '../Interfaces/bookObject';
const BASE_URL = 'http://localhost:3000';

const loadDashboard = (accessToken: string) => {
  return fetch(`${BASE_URL}/user/dashboard`, {
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
  return fetch(`${BASE_URL}/user/profile`, {
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
  return fetch(`${BASE_URL}/user/saved`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      book,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with addSavedBook', err));
};

const updateRating = (accessToken: string, book: Book, rating: number) => {
  return fetch(`${BASE_URL}/user/rating`, {
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

const deleteSavedBook = (accessToken: string, bookId: string) => {
  return fetch(`${BASE_URL}/user/saved`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      bookId,
    }),
  }).catch((err) => console.log('error with deleteSavedBook', err));
};

const deleteRating = (accessToken: string, bookId: string) => {
  return fetch(`${BASE_URL}/user/saved`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      bookId,
    }),
  }).catch((err) => console.log('error with deleteRating', err));
};

export {
  loadDashboard,
  getUserWithBooks,
  addSavedBook,
  updateRating,
  deleteSavedBook,
  deleteRating,
};
