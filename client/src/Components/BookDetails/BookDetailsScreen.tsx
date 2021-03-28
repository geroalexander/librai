import './BookDetailsScreen.css';
import React, { useState, useEffect } from 'react';
import BookStatusBar from './BookStatusBar/BookStatusBar';
import { Book } from '../../Interfaces/bookObject';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { getBookWithScore, viewBookDetails } from '../../ApiClientService/Book';
import LottieAnimation from '../../Animations/Lottie';
import bookAnimation from '../../Animations/book-animation-2.json';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';

interface BookDetailsScreenProps extends RouteComponentProps {}

const BookDetailsScreen: React.FC<BookDetailsScreenProps> = (props: any) => {
  const [book, setBook] = useState(props.location.state.book);
  const [isNew, setIsNew] = useState(props.location.state.isNew);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    book && retrieveBookWithScore();
  }, []);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)'
  })

  const retrieveBookWithScore = async () => {
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (
      isNew === true ||
      (book.interaction &&
        !book.interaction.compatabilityScore &&
        book.interaction.isSaved)
    ) {
      if (accessToken) {
        const formattedBook = await getBookWithScore(accessToken, book);
        setBook(formattedBook);
      }
    }

    setIsLoading(false);
    accessToken && (await viewBookDetails(accessToken, book));
  };

  if (!isLoading) {
    return (
      <div className="details">
        <div className="main-details">
          <hr className="line"></hr>
          <img src={book.thumbnail && book.thumbnail} alt={book.title} />
          <div className="text-wrapper">
            <h1
              className={
                book.title.split(' ').length > 4 ? 'small-title' : 'title'
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
          {isDesktop && <BookStatusBar book={book} />}
        </div>
        {!isDesktop && <BookStatusBar book={book} />}        
        <div className="sub-details">
          <div className="flexRow">
            <p className="title">Description</p>
            {book.averageRating && (
              <p className="title flexRow">
                {book.averageRating}/5
                <StarRoundedIcon style={{ color: '#f5d541' }} />
              </p>
            )}
          </div>
          <p className="subtitle">
            {book.description && !isDesktop
              ? book.description
                  .split(' ')
                  .slice(0, 120)
                  .join(' ')
                  .replace(/(<([^>]+)>)/gi, '\n') + '...'
              : 'N/A'}
              {book.description && isDesktop
              ? book.description
                  .replace(/(<([^>]+)>)/gi, '\n')
              : 'N/A'}
          </p>
          <div className="add-info">
            <div>
              <p className="midtitle">Pages</p>
              {book.pageCount ? (
                <p className="subtitle">{book.pageCount} </p>
              ) : (
                <p className="subtitle">N/A</p>
              )}
            </div>
            <div className="publisher-wrapper">
              <p className="midtitle">Publisher</p>
              {book.publisher ? (
                <p className="subtitle">{book.publisher} </p>
              ) : (
                <p className="subtitle">N/A</p>
              )}
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
  return <LottieAnimation animation={bookAnimation} width={300} height={300} />;
};

export default withRouter(BookDetailsScreen);
