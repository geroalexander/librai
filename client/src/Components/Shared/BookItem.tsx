import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../Interfaces/bookObject';
import './BookItem.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import FaceIcon from '@material-ui/icons/Face';

interface BookItemProps extends RouteComponentProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const renderRatingIcon = () => {
    const rating = book.interaction.rating;
    if (rating === 1) return <SentimentSatisfiedOutlinedIcon />;
    else if (rating === 0) return <FaceIcon />;
    else return <SentimentDissatisfiedOutlinedIcon />;
  };

  return (
    <div className="book-item">
      <img src={String(book.smallThumbnail)} alt="" />
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-authors">{book.authors[0]}</p>

        <div className="book-buttons">
          {book.interaction.rating === null ? (
            // dropdown to change rating
            <CheckCircleOutlineIcon className="rating-button" />
          ) : (
            <div>{renderRatingIcon()}</div>
          )}
          <button className="bookmark">
            <BookmarkOutlinedIcon className="bookmark-button" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default withRouter(BookItem);
