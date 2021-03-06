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
import { setError, setAuthError } from '../actions/errors';
import { PopularBook } from '../../Interfaces/popularBookObject';

export const _loadDashboard = () => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const userDashboard = await loadDashboard(accessToken);
      dispatch({ type: LOAD_DASHBOARD, payload: userDashboard });
    } catch (error) {
      console.error(error);
      const action = setError("Couldn't load dashboard, please try again");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _getUserWithBooks = () => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const { userWithBooks } = await getUserWithBooks(accessToken);
      dispatch({ type: GET_USER_WITH_BOOKS, payload: userWithBooks });
    } catch (error) {
      console.error(error);
      const action = setError("Couldn't get your books from the database");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _addSavedBook = (book: Book) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const savedBook = await addSavedBook(accessToken, book);
      dispatch({ type: ADD_SAVED_BOOK, payload: savedBook });
    } catch (error) {
      console.error(error);
      const action = setError("Sorry, we couldn't save your book");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _deleteSavedBook = (book: Book) => async (
  dispatch: AppDispatch
) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      await deleteSavedBook(accessToken, book);
      dispatch({ type: DELETE_SAVED_BOOK, payload: book });
    } catch (error) {
      console.error(error);
      const action = setError("Sorry, we couldn't remove your saved book");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _updateRating = (book: Book, rating: number) => async (
  dispatch: AppDispatch
) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const savedBook = await updateRating(accessToken, book, rating);
      dispatch({ type: UPDATE_RATING, payload: savedBook });
    } catch (error) {
      const action = setError("Couldn't update rating, please try again.");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _deleteRating = (book: Book) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      await deleteRating(accessToken, book);
      dispatch({ type: DELETE_RATING, payload: book });
    } catch (error) {
      const action = setError("Couldn't delete rating, please try again.");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _registrationForm = (
  books: PopularBook[],
  favoriteGenres: string[]
) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const userWithBooks = await registrationForm(
        accessToken,
        books,
        favoriteGenres
      );
      dispatch({ type: REGISTRATION_FORM, payload: userWithBooks });
      dispatch({ type: SET_ADD_FORM_INFO });
    } catch (error) {
      console.error(error);
      const action = setError(
        "Sorry, we couldn't complete your favorites form"
      );
      dispatch(action);
    }
  } else dispatch(setAuthError());
};

export const _updateProfile = (
  profilePic: string | null,
  favoriteGenres: string[] | null,
  email: string | null
) => async (dispatch: AppDispatch) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      await updateProfile(accessToken, profilePic, favoriteGenres, email);
      dispatch({
        type: UPDATE_PROFILE,
        payload: { profilePic, favoriteGenres, email },
      });
    } catch (error) {
      console.error(error);
      const action = setError("Sorry, we couldn't update your profile");
      dispatch(action);
    }
  } else dispatch(setAuthError());
};
