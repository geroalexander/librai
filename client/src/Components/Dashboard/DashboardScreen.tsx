//PAMELA
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _loadDashboard } from '../../Store/actions/users';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import './Dashboard.css';
import { Book } from '../../Interfaces/bookObject';

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

  console.log(recommendations, '<--------- this is RECS');
  console.log(userWithBooks, '<--------- this is userWithBooks');

  useEffect(() => {
    const renderDashboard = async () => {
      const action = await _loadDashboard();
      dispatch(action);
    };

    renderDashboard();
  }, []);

  useEffect(() => {
    if (userWithBooks.books) setBooks(userWithBooks.books);
  }, [userWithBooks]);

  useEffect(() => {
    if (recommendations) setRecommended(recommendations);
  }, [recommendations]);

  console.log(userWithBooks.books, '<----- BOOK');

  if (books.length) {
    return (
      <div className="dashboard">
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
