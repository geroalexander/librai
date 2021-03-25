//PAMELA
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _loadDashboard } from '../../Store/actions/users';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import './Dashboard.css';
import { Book } from '../../Interfaces/bookObject';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import SearchBar from '../Shared/SearchBar';
import Camera from '../Shared/Camera';
import LottieAnimation from '../../Animations/Lottie';
import loading from '../../Animations/paperplane-animation.json';
import bookAnimation from '../../Animations/book-animation-2.json';
import secondBookAnim from '../../Animations/book-animation.json';

interface DashboardScreenProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
  const userWithBooks = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );

  useEffect(() => {
    const renderDashboard = async () => {
      const action = await _loadDashboard();
      dispatch(action);
    };

    renderDashboard();
  }, []);

  useEffect(() => {
    if (userWithBooks && userWithBooks.books && recommendations)
      setIsLoading(false);
  }, [userWithBooks, recommendations]);

  if (!isLoading) {
    return (
      <div className="dashboard">
        <header>
          <SearchBar />
          <Camera setIsLoading={setIsLoading} />
        </header>
        <div className="bookwrapper">
          <p className="title">Recommended</p>
          <div className="booklist">
            {recommendations.map((book: Book) => (
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
        <div className="bookwrapper-small">
          <p className="title">Your favorites</p>
          <div className="booklist-small">
            {userWithBooks.books
              .filter((b: Book) => b.interaction.rating === 1)
              .map((book: Book) => (
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
              ))}
          </div>
        </div>
        <div className="bookwrapper">
          <p className="title">Recently saved</p>
          <div className="booklist">
            {userWithBooks.books
              .filter((b: Book) => b.interaction.isSaved)
              .map((book: Book) => (
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
              ))}
          </div>
        </div>
      </div>
    );
  }
  return <LottieAnimation animation={loading} width="100%" height="100%" />;
};

export default withRouter(Dashboard);
