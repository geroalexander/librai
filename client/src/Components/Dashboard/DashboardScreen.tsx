//PAMELA
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _loadDashboard } from '../../Store/actions/users';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import './Dashboard.css';
import { Book } from '../../Interfaces/bookObject';
import SearchBar from '../Shared/SearchBar';
import Camera from '../Shared/Camera';
import LottieAnimation from '../../Animations/Lottie';
import loading from '../../Animations/paperplane-animation.json';
import bookAnimation from '../../Animations/book-animation-2.json';
import secondBookAnim from '../../Animations/book-animation.json';
import DropMenu from '../Menu/Menu'
import { useMediaQuery } from 'react-responsive'
import {
  isDesktop,
  isTablet,
  isMobile
} from "react-device-detect";
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import librai_logo from '../../Assets/Librai-Logo-Outline.png'

interface DashboardScreenProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardScreenProps> = () => {
  const isTabletOrDesktop = useMediaQuery({
    query: '(min-width: 992px)'
  })

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
  const userWithBooks = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );

  useEffect(() => {
    console.log('render')
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
          {isDesktop && <img src={librai_logo}/>}
          <SearchBar />
          {isDesktop && <DropMenu/>}
          {(isTablet || isMobile) && <Camera setIsLoading={setIsLoading} /> }
        </header>
        <div className="bookwrapper">
          <div className="title-wrapper">
            <p className="title">Recommended</p>
            {isTabletOrDesktop && <StarRoundedIcon style={{fontSize: 42, color: '#fffef9', marginLeft: 6}}/>}
          </div>
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
        {!isTabletOrDesktop &&
        <div className="bookwrapper-small">
          <div className="title-wrapper">
            <p className="title">Your favorites</p>
          </div>
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
      }
        <div className="bookwrapper">
        <div className="title-wrapper">
            <p className="title">Recently saved</p>
            {isTabletOrDesktop && <BookmarkRoundedIcon style={{fontSize: 40, color: '#fffef9', marginLeft: 6}}/>}
          </div>
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
        <div className="footer"></div>
      </div>
    );
  }
  return <LottieAnimation animation={loading} width={300} height={300} />;
};

export default withRouter(Dashboard);
