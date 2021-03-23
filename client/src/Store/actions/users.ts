import { AppDispatch } from '../../App'
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
  DELETE_RATING
} from './ActionTypes';
import { Book } from '../../Interfaces/bookObject';
import { User } from '../../Interfaces/userObject';

const accessToken: string = localStorage.getItem('accessToken')

export const _loadDashboard = () => async (dispatch: AppDispatch) => {
  const { user, bookRecArr } = await loadDashboard(accessToken)
  dispatch({ type: LOAD_DASHBOARD, payload: user, bookRecArr });
};

export const _getUserWithBooks = () => async (dispatch: AppDispatch) => {
  const { user } = await getUserWithBooks(accessToken)
  dispatch({ type: GET_USER_WITH_BOOKS, payload: user });
};

export const _addSavedBook = (book: Book) => async (dispatch: AppDispatch) => {
  const { savedBook } = await addSavedBook(accessToken, book)
  dispatch({ type: ADD_SAVED_BOOK, payload: savedBook });
};

export const _deleteSavedBook = (book: Book) => async (dispatch: AppDispatch) => {
  await deleteSavedBook(accessToken, book)
  dispatch({ type: DELETE_SAVED_BOOK, payload: book });
};

export const _updateRating = (book: Book, rating: number) => async (dispatch: AppDispatch) => {
  const { savedBook } = await updateRating(accessToken, book, rating)
  dispatch({ type: UPDATE_RATING, payload: savedBook });
};

export const _deleteRating = (book: Book) => async (dispatch: AppDispatch) => {
  await deleteRating(accessToken, book)
  dispatch({ type: DELETE_RATING, payload: book });
};