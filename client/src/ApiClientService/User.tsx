import { Book } from '../Interfaces/bookObject';
import { PopularBook } from '../Interfaces/popularBookObject';
import { fetchRequest } from './fetchRequest';

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
};

const addSavedBook = (accessToken: string, book: Book) => {
  const path: string = '/user/saved';
  const options: RequestInit = {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  };
  return fetchRequest(path, options);
};

const updateRating = (accessToken: string, book: Book, rating: number) => {
  const path: string = '/user/rating';
  const options: RequestInit = {
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
  };
  return fetchRequest(path, options);
};

const deleteSavedBook = (accessToken: string, book: Book) => {
  const path: string = '/user/saved';
  const options: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  };
  return fetchRequest(path, options);
};

const deleteRating = (accessToken: string, book: Book) => {
  const path: string = '/user/rating';
  const options: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  };
  return fetchRequest(path, options);
};

const registrationForm = (
  accessToken: string,
  books: PopularBook[],
  favoriteGenres: string[]
) => {
  const path: string = '/user/form';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ books, favoriteGenres }),
  };
  return fetchRequest(path, options);
};

const updateProfile = (
  accessToken: string,
  profilePic: string | null,
  favoriteGenres: string[] | null,
  email: string | null
) => {
  const path: string = '/user/update';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ profilePic, favoriteGenres, email }),
  };
  return fetchRequest(path, options);
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
