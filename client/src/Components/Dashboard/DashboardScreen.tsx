//PAMELA
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _loadDashboard } from '../../Store/actions/users';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import './Dashboard.css';
import Skeleton from 'react-loading-skeleton';
import { Book } from '../../Interfaces/bookObject';
import Header from '../Header/Header';
import LottieAnimation from '../../Animations/Lottie';
import loading from '../../Animations/paperplane-animation.json';
import bookAnimation from '../../Animations/book-animation-2.json';
import secondBookAnim from '../../Animations/book-animation.json';
import { useMediaQuery } from 'react-responsive';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import { isDesktop, isTablet, isMobile } from 'react-device-detect';

interface DashboardScreenProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardScreenProps> = () => {
  const isTabletOrDesktop = useMediaQuery({
    query: '(min-width: 992px)',
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [ratedBooks, setRatedBooks] = useState<Book[]>([]);

  const dispatch = useDispatch();
  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
  const userWithBooks = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );

  useEffect(() => {
    console.log('render');
    const renderDashboard = async () => {
      const action = await _loadDashboard();
      dispatch(action);
    };

    renderDashboard();
  }, []);

  useEffect(() => {
    if (userWithBooks && userWithBooks.books && recommendations) {
      setSavedBooks(
        userWithBooks.books.filter((b: Book) => b.interaction.isSaved)
      );
      setRatedBooks(
        userWithBooks.books.filter((b: Book) => b.interaction.rating === 1)
      );
      setIsLoading(false);
    }
  }, [userWithBooks, recommendations]);

  if (!isLoading) {
    return (
      <div className="dashboard">
        {!isDesktop && <Header setIsLoading={setIsLoading} />}
        <div className="book-body">
          <div className="bookwrapper">
            <div className="title-wrapper">
              <p className="title">Recommended</p>
              {isTabletOrDesktop && (
                <StarRoundedIcon
                  style={{ fontSize: 42, color: '#fffef9', marginLeft: 6 }}
                />
              )}
            </div>
            <div className="booklist">
              {recommendations.length &&
                recommendations.map((book: Book) => (
                  <div className="book-preview" key={`rec-${book.id}`}>
                    <Link
                      to={{
                        pathname: `/details/${book.id}`,
                        state: { book, isNew: false },
                      }}
                    >
                      <img
                        src={book.thumbnail ? book.thumbnail : undefined}
                        alt={book.title}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          {!isTabletOrDesktop && (
            <div className="bookwrapper-small">
              <div className="title-wrapper">
                <p className="title">Your favorites</p>
              </div>
              <div className="booklist-small">
                {ratedBooks.length ? (
                  ratedBooks.map((book: Book) => (
                    <div className="book-preview-small" key={`fav-${book.id}`}>
                      <Link
                        to={{
                          pathname: `/details/${book.id}`,
                          state: { book, isNew: false },
                        }}
                      >
                        <img
                          src={book.thumbnail ? book.thumbnail : undefined}
                          alt={book.title}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="book-skeleton">
                    <p className="alert-msg">
                      You don't have any rated books yet. The more ratings we
                      have, the better our recommendations for you will be! 😉
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="bookwrapper">
            <div className="title-wrapper">
              <p className="title">Recently saved</p>
              {isTabletOrDesktop && (
                <BookmarkRoundedIcon
                  style={{ fontSize: 40, color: '#fffef9', marginLeft: 6 }}
                />
              )}
            </div>
            <div className="booklist">
              {savedBooks.length ? (
                savedBooks.map((book: Book) => (
                  <div className="book-preview" key={`sav-${book.id}`}>
                    <Link
                      to={{
                        pathname: `/details/${book.id}`,
                        state: { book, isNew: false },
                      }}
                    >
                      <img
                        src={book.thumbnail ? book.thumbnail : undefined}
                        alt={book.title}
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="book-skeleton">
                  <p className="alert-msg">
                    You don't have any saved books yet! On mobile, use the
                    camera feature to take a photo of a book cover. You can also
                    use the search bar or check out our recommendations 😉
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
  return (
    <LottieAnimation margin="" animation={loading} width={300} height={300} />
  );
};

export default withRouter(Dashboard);
