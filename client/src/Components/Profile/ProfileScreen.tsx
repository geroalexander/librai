//BEN
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import { User } from '../../Interfaces/userObject';
import { Book } from '../../Interfaces/bookObject';
import { _getUserWithBooks, _updateProfile } from '../../Store/actions/users';
import './ProfileScreen.css';
import BookItem from '../Shared/BookItem';
import Avatar from '@material-ui/core/Avatar';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { setLogout } from '../../Store/actions/auth';
import { uploadProfilepic } from '../../ApiClientService/ImageUpload';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );
  const dispatch = useDispatch();

  const fullName = `${user.firstName} ${user.lastName}`;
  const { favoriteGenres } = user;

  // This needs to be taken out when linked up
  useEffect(() => {
    const getBooks = async () => {
      const action = await _getUserWithBooks();
      dispatch(action);
    };

    getBooks();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleUpdateProfilePic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const profilePictureUrl = await uploadProfilepic(e.target.files[0]);
    dispatch(_updateProfile(profilePictureUrl, null, null));
  };

  return (
    <div className="profile-screen">
      <div className="user-info">
        {/* This icon needs to be changed */}
        <button className="logout-button" onClick={handleLogout}>
          <ExitToAppIcon />
        </button>
        <label>
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleUpdateProfilePic}
          />
          {user.profilePic ? (
            <Avatar
              className="profile-picture"
              alt={fullName}
              src={String(user.profilePic)}
            />
          ) : (
            <Avatar className="profile-picture">
              <AddPhotoAlternateIcon />
            </Avatar>
          )}
        </label>
        <h1>{fullName}</h1>
        <p className="email">{user.email}</p>
        <h5 className="fav-genres-header">Favorite Genres</h5>
        <p className="fav-genres">
          {favoriteGenres && favoriteGenres.length
            ? favoriteGenres.map((genre: string, index: number) =>
                index !== favoriteGenres.length - 1 ? (
                  <span key={genre}>{genre}, </span>
                ) : (
                  <span key={genre}>{genre}</span>
                )
              )
            : null}
        </p>
      </div>
      <div className="rated-books">
        {user.books ? (
          <div>
            {user.books
              .filter((book: Book) => book.interaction.rating !== null)
              .map((book: Book) => (
                <BookItem key={book.id} book={book} />
              ))}
          </div>
        ) : (
          <h1>No books yet</h1>
        )}
      </div>
    </div>
  );
};

export default withRouter(ProfileScreen);
