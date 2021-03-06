import { AnyAction } from 'redux';
import { User } from '../../Interfaces/userObject';
import { Book } from '../../Interfaces/bookObject';
import {
  SET_RECOMMENDATIONS,
  LOAD_DASHBOARD,
  GET_USER_WITH_BOOKS,
  ADD_SAVED_BOOK,
  DELETE_SAVED_BOOK,
  UPDATE_RATING,
  UPDATE_PROFILE,
  DELETE_RATING,
  LOG_USER_OUT,
  REGISTRATION_FORM,
} from '../actions/ActionTypes';

interface userState {
  userWithBooks: User | {};
  recommendations: Book[] | [];
}

const initialState: userState = {
  userWithBooks: {},
  recommendations: [],
};

function userReducer(state = initialState, action: AnyAction) {
  const oldUserWithBooks = { ...state.userWithBooks };
  switch (action.type) {
    case REGISTRATION_FORM:
      return { ...state, userWithBooks: action.payload };

    case LOAD_DASHBOARD:
      return {
        ...state,
        userWithBooks: action.payload.userWithBooks,
        recommendations: action.payload.recommendations,
      };

    case GET_USER_WITH_BOOKS:
      return {
        ...state,
        userWithBooks: action.payload,
      };

    case ADD_SAVED_BOOK:
      const newBooksAfterSave = oldUserWithBooks?.books?.filter(
        (b: Book) => b.id !== action.payload.id
      );
      const newUserAfterSavedBooks = {
        ...state.userWithBooks,
        books: newBooksAfterSave?.concat([action.payload]),
      };
      return {
        ...state,
        userWithBooks: newUserAfterSavedBooks,
      };

    case DELETE_SAVED_BOOK:
      const newBooksAfterDelete = oldUserWithBooks?.books?.filter(
        (b: Book) => b.id !== action.payload.id
      );
      const newUserAfterDeletedBooks = {
        ...state.userWithBooks,
        books: newBooksAfterDelete,
      };
      return {
        ...state,
        userWithBooks: newUserAfterDeletedBooks,
      };

    case UPDATE_RATING:
      const newBooksAfterRating = oldUserWithBooks?.books?.filter(
        (b: Book) => b.id !== action.payload.id
      );
      const newUserAfterBooksRating = {
        ...state.userWithBooks,
        books: newBooksAfterRating?.concat([action.payload]),
      };
      return {
        ...state,
        userWithBooks: newUserAfterBooksRating,
      };

    case UPDATE_PROFILE:
      const { profilePic, favoriteGenres, email } = action.payload;
      let newUser = { ...state.userWithBooks };
      if (profilePic) newUser.profilePic = profilePic;
      if (favoriteGenres) newUser.favoriteGenres = favoriteGenres;
      if (email) newUser.email = email;
      return { ...state, userWithBooks: newUser };

    case DELETE_RATING:
      const oldBooksBeforeDelete = oldUserWithBooks.books;

      oldBooksBeforeDelete?.forEach((b: Book) => {
        if (b.id === action.payload.id) {
          b.interaction.rating = null;
        }
      });
      const newUserAfterDeleteRating = {
        ...state.userWithBooks,
        books: oldBooksBeforeDelete,
      };
      return { ...state, userWithBooks: newUserAfterDeleteRating };

    case SET_RECOMMENDATIONS:
      const oldRecommendations = state.recommendations;
      return {
        ...state,
        recommendations: [...oldRecommendations, ...action.payload],
      };

    case LOG_USER_OUT:
      return {
        ...initialState,
      };
  }
  return state;
}

export default userReducer;
