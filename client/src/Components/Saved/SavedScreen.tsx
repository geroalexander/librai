//ANDRAS
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import BookItem from '../Shared/BookItem';
import { _getUserWithBooks } from '../../Store/actions/users';
import './SavedScreen.css';
import { Book } from '../../Interfaces/bookObject';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import LottieAnimation from '../../Animations/Lottie';
import loading from '../../Animations/paperplane-animation.json';

interface SavedScreenProps extends RouteComponentProps {}

const SavedScreen: React.FC<SavedScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  const books: Book[] = useSelector(
    (state: RootState) => state?.userReducer?.userWithBooks?.books
  );

  const dispatch = useDispatch();

  useEffect(() => {
    checkStateForBooks();
  }, [books]);

  const checkStateForBooks = async () => {
    if (!books) {
      const action = await _getUserWithBooks();
      await dispatch(action);
    }
    if (books && books.length) {
      setSavedBooks(books.filter((book: Book) => book.interaction.isSaved));
      setIsLoading(false);
    }
  };

  if (!isLoading) {
    return (
      <div className="saved-screen">
        <div className="title-wrapper">
          <h1 className="title">Saved</h1>
          <BookmarksOutlinedIcon style={{ fontSize: 35, color: '#fffef9' }} />
        </div>
        {savedBooks.length ? (
          <div className="saved-list">
            {books.map((book: Book) => (
              // <Link
              //   to={{
              //     pathname: `/details/${book.id}`,
              //     state: { book, isNew: false },
              //   }}
              //   style={{ textDecoration: 'none' }}
              // >
              <BookItem key={book.id} book={book} />
              // </Link>
            ))}
          </div>
        ) : (
          <div className="saved-list">
            <div className="book-skeleton">
              <p className="alert-msg">
                You don't yet have any saved books! On mobile, use the camera
                feature to take a photo of a book cover. You can also use the
                search bar or check out our recommendations 😉
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <LottieAnimation margin="" animation={loading} width={300} height={300} />
  );
};

export default withRouter(SavedScreen);
