//ANDRAS
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

  const books: Book[] = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks.books
  );

  useEffect(() => {
    books && setIsLoading(false);
  }, [books]);

  if (!isLoading) {
    return (
      <div className="saved-screen">
        <div className="title-wrapper">
          <h1 className="title">Saved</h1>
          <BookmarksOutlinedIcon style={{ fontSize: 35, color: '#fffef9' }} />
        </div>
        {books && (
          <>
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
          </>
        )}
        <div className="footer"></div>
      </div>
    );
  }
  return <LottieAnimation animation={loading} width={300} height={300} />;
};

export default withRouter(SavedScreen);
