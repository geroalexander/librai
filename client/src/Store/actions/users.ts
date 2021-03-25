import { AppDispatch } from '../../index';
import {
  loadDashboard,
  getUserWithBooks,
  addSavedBook,
  deleteSavedBook,
  updateRating,
  deleteRating,
  registrationForm,
  updateProfile,
} from '../../ApiClientService/User';
import {
  LOAD_DASHBOARD,
  GET_USER_WITH_BOOKS,
  ADD_SAVED_BOOK,
  DELETE_SAVED_BOOK,
  UPDATE_RATING,
  DELETE_RATING,
  REGISTRATION_FORM,
  UPDATE_PROFILE,
} from './ActionTypes';
import { Book } from '../../Interfaces/bookObject';
import { User } from '../../Interfaces/userObject';
const { REACT_APP_ACCESS_TOKEN } = process.env;

// const accessToken: string | null = localStorage.getItem('accessToken');
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4ZWI0MmM5Yy0yYzkyLTRmYmItYmVhOC05MTJiN2ZlZjdkMGEiLCJpYXQiOjE2MTY2ODA1NjZ9.RWv8f1QYRbqlxMzp1R5_wOAghR-RsDIVlL2VZCQQqOs';

export const _loadDashboard = () => async (dispatch: AppDispatch) => {
  console.log(accessToken, 'accessToken');
  if (accessToken) {
    const userDashboard = await loadDashboard(accessToken);
    console.log('-----------------', userDashboard);

    if (userDashboard)
      dispatch({ type: LOAD_DASHBOARD, payload: userDashboard });
  }
};

export const _getUserWithBooks = () => async (dispatch: AppDispatch) => {
  if (accessToken) {
    const { userWithBooks } = await getUserWithBooks(accessToken);
    dispatch({ type: GET_USER_WITH_BOOKS, payload: userWithBooks });
  }
};

export const _addSavedBook = (book: Book) => async (dispatch: AppDispatch) => {
  if (accessToken) {
    const savedBook = await addSavedBook(accessToken, book);
    dispatch({ type: ADD_SAVED_BOOK, payload: savedBook });
  }
};

export const _deleteSavedBook = (book: Book) => async (
  dispatch: AppDispatch
) => {
  if (accessToken) {
    await deleteSavedBook(accessToken, book);
    dispatch({ type: DELETE_SAVED_BOOK, payload: book });
  }
};

export const _updateRating = (book: Book, rating: number) => async (
  dispatch: AppDispatch
) => {
  if (accessToken) {
    const savedBook = await updateRating(accessToken, book, rating);
    dispatch({ type: UPDATE_RATING, payload: savedBook });
  }
};

export const _deleteRating = (book: Book) => async (dispatch: AppDispatch) => {
  if (accessToken) {
    await deleteRating(accessToken, book);
    dispatch({ type: DELETE_RATING, payload: book });
  }
};

export const _registrationForm = (books: Book[], rating: number) => async (
  dispatch: AppDispatch
) => {
  if (accessToken) {
    await registrationForm(accessToken, books, rating);
    dispatch({ type: REGISTRATION_FORM, payload: { books, rating } });
  }
};

export const _updateProfile = (
  profilePic: string | null,
  favoriteGenres: string[] | null,
  email: string | null
) => async (dispatch: AppDispatch) => {
  if (accessToken) {
    await updateProfile(accessToken, profilePic, favoriteGenres, email);
    dispatch({
      type: UPDATE_PROFILE,
      payload: { profilePic, favoriteGenres, email },
    });
  }
};
