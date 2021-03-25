//ANDRAS
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import BookItem from '../Shared/BookItem';
import { _getUserWithBooks } from '../../Store/actions/users';
import './SavedScreen.css';
import { Book } from '../../Interfaces/bookObject';

interface SavedScreenProps extends RouteComponentProps {}

const SavedScreen: React.FC<SavedScreenProps> = (props) => {
  const books: Book[] = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks.books
  );

  return (
    <div className="saved-screen">
      <div className="title-wrapper">
        <h1 className="title">Saved</h1>
      </div>
      {books ? (
        <div className="saved-list">
          {books
            .filter((book: Book) => book.interaction.rating === null)
            .map((book: Book) => (
              <Link
                to={{
                  pathname: `/details/${book.id}`,
                  state: { book, isNew: false },
                }}
                style={{ textDecoration: 'none' }}
              >
                <BookItem key={book.id} book={book} />
              </Link>
            ))}
        </div>
      ) : (
        <h1>No saved books yet</h1>
      )}
      <div className="footer"></div>
    </div>
  );
};

export default withRouter(SavedScreen);
