import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../Interfaces/bookObject';
import SmallStatusBar from '../Shared/SmallStatusBar';
import './BookItem.css';


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
        <div>
          <h2 className="midtitle">{book.title.length > 35
                    ? `${book.title.slice(0, 30)}...`
                    : book.title}</h2>
          <p className="subtitle italic">by {book.authors[0]}</p>
          {/* <p className="subtitle">{book.categories[0]}</p> */}
        </div>
        <SmallStatusBar book={book} />
      </div>
    </div>
  );
};
export default withRouter(BookItem);
