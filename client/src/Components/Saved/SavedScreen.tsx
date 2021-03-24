//ANDRAS
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import BookItem from '../Shared/BookItem';
import { _getUserWithBooks } from '../../Store/actions/users';
// import Book from '../../Interfaces/bookObject';

interface SavedScreenProps extends RouteComponentProps {}

const SavedScreen: React.FC<SavedScreenProps> = (props) => {
  const books = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks.books
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getBooks = async () => {
      const action = await _getUserWithBooks();
      dispatch(action);
    };

    getBooks();
  }, []);

  // useEffect(() => {
    //   if (userWithBooks.books) setBooks(userWithBooks.books);
    // }, [userWithBooks]);

  console.log(books);
  return (
    <div>
      <h1>Hello. Saved Screen</h1>
      <BookItem book={books[0]}/>
    </div>
  );
};

export default withRouter(SavedScreen);
