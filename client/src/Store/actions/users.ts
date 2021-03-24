import { AppDispatch } from '../../index';
import {
  loadDashboard,
  getUserWithBooks,
  addSavedBook,
  deleteSavedBook,
  updateRating,
  deleteRating,
} from '../../ApiClientService/User';
import {
  LOAD_DASHBOARD,
  GET_USER_WITH_BOOKS,
  ADD_SAVED_BOOK,
  DELETE_SAVED_BOOK,
  UPDATE_RATING,
  DELETE_RATING,
} from './ActionTypes';
import { Book } from '../../Interfaces/bookObject';

// const accessToken: string | null = localStorage.getItem('accessToken');
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwMmE0NDA1ZC04MGE5LTRjMzctYmZhNy0zMzljYTAyNjNmOTciLCJpYXQiOjE2MTY1ODE4MTJ9.F3DoRYXE8CoygBfhIhQPN73BgIgZTRBTxbYcxJYj4Ek';

export const _loadDashboard = () => async (dispatch: AppDispatch) => {
  if (accessToken) {
    const userDashboard = await loadDashboard(accessToken);
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
    const { savedBook } = await addSavedBook(accessToken, book);
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
    const { savedBook } = await updateRating(accessToken, book, rating);
    dispatch({ type: UPDATE_RATING, payload: savedBook });
  }
};

export const _deleteRating = (book: Book) => async (dispatch: AppDispatch) => {
  if (accessToken) {
    await deleteRating(accessToken, book);
    dispatch({ type: DELETE_RATING, payload: book });
  }
};
