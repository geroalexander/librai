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
  DELETE_RATING,
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
    case LOAD_DASHBOARD:
      return {
        ...state,
        userWithBooks: action.payload.userWithBooks,
        recommendations: action.payload.recommendations,
      };

    case GET_USER_WITH_BOOKS:
      return {
        ...state,
        userWithBooks: action.payload.userWithBooks,
      };

    case ADD_SAVED_BOOK:
      const newBooksAfterSave = oldUserWithBooks?.books?.push(
        action.payload.savedBook
      );
      const newUserAfterSavedBooks = {
        ...state.userWithBooks,
        books: newBooksAfterSave,
      };
      return {
        ...state,
        userWithBooks: newUserAfterSavedBooks,
      };

    case DELETE_SAVED_BOOK:
      const newBooksAfterDelete = oldUserWithBooks?.books?.filter(
        (b: Book) => b.id !== action.payload.book.id
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
        (b: Book) => b.id !== action.payload.savedBook.id
      );
      const newUserAfterBooksRating = {
        ...state.userWithBooks,
        books: [newBooksAfterRating, action.payload.savedBook],
      };
      return {
        ...state,
        userWithBooks: newUserAfterBooksRating,
      };

    case DELETE_RATING:
      const oldBooksBeforeDelete = oldUserWithBooks.books;
      oldBooksBeforeDelete?.forEach((b: Book) => {
        if (b.id === action.payload.book.id) {
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
        recommendations: [
          ...oldRecommendations,
          ...action.payload.recommendations,
        ],
      };
  }
}

export default userReducer;