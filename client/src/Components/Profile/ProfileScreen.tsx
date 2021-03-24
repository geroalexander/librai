//BEN
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import { User } from '../../Interfaces/userObject';
import { Book } from '../../Interfaces/bookObject';
import { _getUserWithBooks } from '../../Store/actions/users';
import './ProfileScreen.css';
import BookItem from '../Shared/BookItem';
import Avatar from '@material-ui/core/Avatar';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );
  const dispatch = useDispatch();
  const fullName = `${user.firstName} ${user.lastName}`;

  useEffect(() => {
    const getBooks = async () => {
      const action = await _getUserWithBooks();
      dispatch(action);
    };

    getBooks();
  }, [dispatch]);

  const renderFavoriteGenres = user.favoriteGenres.length
    ? user.favoriteGenres.map((genre: string) => (
        <span key={genre}>{genre}, </span>
      ))
    : null;

  const renderBooks = user.books ? (
    <div>
      {user.books
        .filter((book: Book) => book.interaction.rating)
        .map((book: Book) => (
          <BookItem key={book.id} book={book} />
        ))}
    </div>
  ) : (
    <h1>No books yet</h1>
  );

  return (
    <div className="profile-screen">
      <div className="user-info">
        <button className="logout-button">Logout</button>
        <Avatar
          className="profile-picture"
          alt={fullName}
          src={String(user.profilePic)}
        />
        <h1>{fullName}</h1>
        <p className="email">{user.email}</p>
        <h5 className="fav-genres-header">Favorite Genres: </h5>
        <p className="fav-genres">{renderFavoriteGenres}</p>
      </div>
      <div>{renderBooks}</div>
    </div>
  );
};

export default withRouter(ProfileScreen);
