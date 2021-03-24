import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import { Book } from '../../Interfaces/bookObject';

interface BookItemProps extends RouteComponentProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  console.log(book)
  return (
    <div>
      <img src={String(book.smallThumbnail)} alt="" />
      <div>
          <h2>{book.title}</h2>
          <p>{book.authors[0]}</p>
          <div>
            {
              book.interaction.rating !== null ? (
                // dropdown to change rating
                <p>✅</p>
              ) : (
                <div>
                  <p>🙁</p>
                  <p>😐</p>
                  <p>😃</p>
                </div>
              )
            }
            <button>Bookmark</button>
          </div>
      </div>
    </div>
  );
};
export default withRouter(BookItem);
