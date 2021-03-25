import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../Interfaces/bookObject';
import BookStatusBar from '../BookDetails/BookStatusBar/BookStatusBar';
import './BookItem.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

interface BookItemProps extends RouteComponentProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div className="book-item">
      <Link
        to={{
          pathname: `/details/${book.id}`,
          state: { book, isNew: false },
        }}
      >
        <img
          src={book.smallThumbnail ? book.smallThumbnail : undefined}
          alt={book.title}
        />
      </Link>
      <div className="book-info">
        <h2 className="midtitle">{book.title}</h2>
        <p className="subtitle italic">by {book.authors[0]}</p>
        <p className="subtitle">{book.subtitle && book.subtitle}</p>
        {/* <BookStatusBar book={book} /> */}
      </div>
    </div>
  );
};
export default withRouter(BookItem);
