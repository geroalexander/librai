import './BookDetailsScreen.css';
import React, { useState, useEffect } from 'react';
import BookStatusBar from './BookStatusBar/BookStatusBar';
import { Book } from '../../Interfaces/bookObject';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { getBookWithScore, viewBookDetails } from '../../ApiClientService/Book';

import moment from 'moment';

const { REACT_APP_ACCESS_TOKEN } = process.env;

interface BookDetailsScreenProps extends RouteComponentProps {}

const accessToken = REACT_APP_ACCESS_TOKEN;

const BookDetailsScreen: React.FC<BookDetailsScreenProps> = (props: any) => {
  const [book, setBook] = useState(props.location.state.book);
  const [isNew, setIsNew] = useState(props.location.state.isNew);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    book && retrieveBookWithScore();
  }, []);

  const retrieveBookWithScore = async () => {
    if (
      isNew === true ||
      (!book.compatabilityScore && book.interaction.isSaved)
    ) {
      // const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const formattedBook = await getBookWithScore(accessToken, book);
        setBook(formattedBook);
      }
    }
    setIsLoading(false);
    accessToken && (await viewBookDetails(accessToken, book));
  };

  console.log(book.title.length);

  return !isLoading ? (
    <div className="details">
      {/* <hr className="line"></hr> */}

      <div className="main-details">
        <hr className="line"></hr>
        <img
          src={book.thumbnail ? book.thumbnail : undefined}
          alt={book.title}
        />
        <div className="text-wrapper">
          <h1
            className={
              book.title.split(' ').length > 5 ? 'small-title' : 'title'
            }
          >
            {book.title}
          </h1>
          <p className="subtitle italic">by {book.authors[0]}</p>
          <p className="subtitle">{book.categories[0]}</p>
          <p className="subtitle bold">
            Published in: {moment(book.publishedDate).format('YYYY')}
          </p>
        </div>
      </div>
      <BookStatusBar book={book} />
      <div className="sub-details"></div>
    </div>
  ) : null;
};

export default withRouter(BookDetailsScreen);
