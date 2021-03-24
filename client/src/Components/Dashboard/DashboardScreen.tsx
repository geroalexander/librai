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

interface DashboardScreenProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardScreenProps> = () => {
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
      dispatch(action);
    };

    renderDashboard();
  }, []);

  useEffect(() => {
    if (userWithBooks && userWithBooks.books) setBooks(userWithBooks.books);
  }, [userWithBooks]);

  useEffect(() => {
    if (recommendations) setRecommended(recommendations);
  }, [recommendations]);

  const handleImageChange = () => {};

  if (books.length) {
    return (
      <div className="dashboard">
        <header>
          <div className="search-placeholder"></div>
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
              <div className="book-preview">
                <img
                  src={book.thumbnail ? book.thumbnail : undefined}
                  alt={book.title}
                />
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
                <div className="book-preview-small">
                  <img
                    src={book.thumbnail ? book.thumbnail : undefined}
                    alt={book.title}
                  />
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
                <div className="book-preview">
                  <img
                    src={book.thumbnail ? book.thumbnail : undefined}
                    alt={book.title}
                  />
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
