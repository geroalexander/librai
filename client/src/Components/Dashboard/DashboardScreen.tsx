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

interface DashboardScreenProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardScreenProps> = () => {
  console.log('dashboard loaded');
  const [books, setBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);

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
      console.log('action', action);
      dispatch(action);
    };

    renderDashboard();
    console.log('somethign');
  }, []);

  useEffect(() => {
    if (userWithBooks && userWithBooks.books) setBooks(userWithBooks.books);
  }, [userWithBooks]);

  useEffect(() => {
    if (recommendations) setRecommended(recommendations);
  }, [recommendations]);

  const handleImageChange = () => {};
  console.log('books', books);
  if (books.length) {
    return (
      <div className="dashboard">
        <header>
          <SearchBar />
          <label>
            <input
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
            />
            <PhotoCameraOutlinedIcon
              style={{ fontSize: 30, color: '#fffef9' }}
            />
          </label>
        </header>
        <div className="bookwrapper">
          <p className="title">Recommended</p>
          <div className="booklist">
            {recommended.map((book: Book) => (
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
            {books
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
            {books
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
  return <div>Hello</div>;
};

export default withRouter(Dashboard);
