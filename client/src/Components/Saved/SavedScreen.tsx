//ANDRAS
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import BookItem from '../Shared/BookItem';
import { _getUserWithBooks } from '../../Store/actions/users';
import './SavedScreen.css'
import { Book } from '../../Interfaces/bookObject';

interface SavedScreenProps extends RouteComponentProps {}

const SavedScreen: React.FC<SavedScreenProps> = (props) => {

  const books: Book[] = useSelector(
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

  return (
    <div className="saved-screen">
      <h1>Saved</h1>
      {
        books ? (
          <div className="saved-list">
          { books
            .filter((book: Book) => book.interaction.rating === null)
            .map((book: Book) =>
              <Link to={{ pathname: `/details/${book.id}`, state: book}}>
              <BookItem key={book.id} book={book}/>
              </Link>
            )
          }
          </div>
        ) : (
          <h1>No saved books yet</h1>
        )
      }
    </div>
  );
};

export default withRouter(SavedScreen);
