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
    books && books.length && setIsLoading(false);
  };

  if (!isLoading) {
    return (
      <div className="saved-screen">
        <div className="title-wrapper">
          <h1 className="title">Saved</h1>
          <BookmarksOutlinedIcon style={{ fontSize: 35, color: '#fffef9' }} />
        </div>
        {books && (
          <div className="saved-list">
            {books
              .filter((book: Book) => book.interaction.isSaved)
              .map((book: Book) => (
                <BookItem key={book.id} book={book} />
              ))}
          </div>
        )}
      </div>
    );
  }
  return <LottieAnimation animation={loading} width={300} height={300} />;
};

export default withRouter(SavedScreen);
