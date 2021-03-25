//ANDRAS
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import BookItem from '../Shared/BookItem';
import './SavedScreen.css';
import { Book } from '../../Interfaces/bookObject';

interface SavedScreenProps extends RouteComponentProps {}

const SavedScreen: React.FC<SavedScreenProps> = (props) => {
  const books: Book[] = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks.books
  );

  return (
    <div className="saved-screen">
      <h1>Saved</h1>
      {books ? (
        <div className="saved-list">
          {books
            .filter((book: Book) => book.interaction.rating === null)
            .map((book: Book) => (
              <BookItem key={book.id} book={book} />
            ))}
        </div>
      ) : (
        <h1>No saved books yet</h1>
      )}
    </div>
  );
};

export default withRouter(SavedScreen);
