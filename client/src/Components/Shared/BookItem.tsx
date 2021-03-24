import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../Interfaces/bookObject';
import './BookItem.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
// import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
// import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
// import { CgSmileNeutral } from 'react-icons';
{/* <PhotoCameraOutlinedIcon style={{ fontSize: 30, color: '#fffef9' }} /> */}

interface BookItemProps extends RouteComponentProps {
  book: Book;
}
// function to render rating face
/*
const renderRating = () => {
  const rating = book.interaction.rating;
  if (rating === 1 ) return <SentimentSatisfiedOutlinedIcon />;
  else if (rating === 0) return TODO
  else return <SentimentDissatisfiedOutlinedIcon />;
}
*/

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  console.log(book);
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
            <div>
             <h1>Rating face goes here</h1>
             {/* <h1>{renderRating()}</h1> */}
            </div>
          )}
          <button className="bookmark"><BookmarkOutlinedIcon className="bookmark-button" /></button>
        </div>
      </div>
    </div>
  );
};
export default withRouter(BookItem);
