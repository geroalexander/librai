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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { setLogout } from '../../Store/actions/auth';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );
  const dispatch = useDispatch();
  const fullName = `${user.firstName} ${user.lastName}`;
  const { favoriteGenres } = user;

  useEffect(() => {
    const getBooks = async () => {
      const action = await _getUserWithBooks();
      dispatch(action);
    };

    getBooks();
  }, [dispatch]);

  const renderFavoriteGenres =
    favoriteGenres && favoriteGenres.length
      ? favoriteGenres.map((genre: string, index: number) =>
          index !== favoriteGenres.length - 1 ? (
            <span key={genre}>{genre}, </span>
          ) : (
            <span key={genre}>{genre}</span>
          )
        )
      : null;

  const renderRatedBooks = user.books ? (
    <div>
      {user.books
        .filter((book: Book) => book.interaction.rating !== null)
        .map((book: Book) => (
          <BookItem key={book.id} book={book} />
        ))}
    </div>
  ) : (
    <h1>No books yet</h1>
  );

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div className="profile-screen">
      <div className="user-info">
        {/* This icon needs to be changed */}
        <button className="logout-button" onClick={handleLogout}>
          <ExitToAppIcon />
        </button>
        <Avatar
          className="profile-picture"
          alt={fullName}
          src={String(user.profilePic)}
        />
        <h1>{fullName}</h1>
        <h5 className="fav-genres-header">Favorite Genres</h5>
        <p className="fav-genres">{renderFavoriteGenres}</p>
      </div>
      <div className="rated-books">{renderRatedBooks}</div>
    </div>
  );
};

export default withRouter(ProfileScreen);
