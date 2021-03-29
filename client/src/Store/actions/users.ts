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
  SET_ADD_FORM_INFO,
} from './ActionTypes';
import { Book } from '../../Interfaces/bookObject';
import { PopularBook } from '../../Interfaces/popularBookObject';

export const _loadDashboard = () => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const userDashboard = await loadDashboard(accessToken);
      if (userDashboard.userWithBooks)
        dispatch({ type: LOAD_DASHBOARD, payload: userDashboard });
      return userDashboard;
    } catch (error) {
      return { error };
    }
  }
  return { error: 'No access token' };
};

export const _getUserWithBooks = () => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const { userWithBooks } = await getUserWithBooks(accessToken);
      dispatch({ type: GET_USER_WITH_BOOKS, payload: userWithBooks });
      return userWithBooks;
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
      // return { error };
    }
  }
  return { error: 'No access token' };
};

export const _addSavedBook = (book: Book) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    const savedBook = await addSavedBook(accessToken, book);
    dispatch({ type: ADD_SAVED_BOOK, payload: savedBook });
  }
};

export const _deleteSavedBook = (book: Book) => async (
  dispatch: AppDispatch
) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    await deleteSavedBook(accessToken, book);
    dispatch({ type: DELETE_SAVED_BOOK, payload: book });
  }
};

export const _updateRating = (book: Book, rating: number) => async (
  dispatch: AppDispatch
) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    const savedBook = await updateRating(accessToken, book, rating);
    dispatch({ type: UPDATE_RATING, payload: savedBook });
  }
};

export const _deleteRating = (book: Book) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    await deleteRating(accessToken, book);
    dispatch({ type: DELETE_RATING, payload: book });
  }
};

export const _registrationForm = (
  books: PopularBook[],
  favoriteGenres: string[]
) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    const userWithBooks = await registrationForm(
      accessToken,
      books,
      favoriteGenres
    );

    dispatch({ type: REGISTRATION_FORM, payload: userWithBooks });
    dispatch({ type: SET_ADD_FORM_INFO });
  }
};

export const _updateProfile = (
  profilePic: string | null,
  favoriteGenres: string[] | null,
  email: string | null
) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    await updateProfile(accessToken, profilePic, favoriteGenres, email);
    dispatch({
      type: UPDATE_PROFILE,
      payload: { profilePic, favoriteGenres, email },
    });
  }
};
