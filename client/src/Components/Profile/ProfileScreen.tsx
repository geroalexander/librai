//BEN
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import { User } from '../../Interfaces/userObject';
import { Book } from '../../Interfaces/bookObject';
import { _updateProfile } from '../../Store/actions/users';
import './ProfileScreen.css';
import BookItem from '../Shared/BookItem';
import Avatar from '@material-ui/core/Avatar';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { setLogout } from '../../Store/actions/auth';
import { uploadProfilepic } from '../../ApiClientService/ImageUpload';
import imageToBase64 from './imageToBase64';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer.userWithBooks
  );
  const dispatch = useDispatch();

  const fullName = `${user.firstName} ${user.lastName}`;
  const { favoriteGenres } = user;

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleUpdateProfilePic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );
    const profilePictureUrl = await uploadProfilepic(base64Image);
    dispatch(_updateProfile(profilePictureUrl, null, null));
  };

  return (
    <div className="profile-screen">
      <div className="logout-button">
        <ExitToAppRoundedIcon
          style={{ fontSize: 38, color: '#dfd5fc' }}
          onClick={handleLogout}
        />
      </div>
      <div className="user-info">
        <label>
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            // capture="environment"
            onChange={handleUpdateProfilePic}
          />
          {user.profilePic ? (
            <Avatar
              className="profile-picture"
              alt={fullName}
              src={user.profilePic ? user.profilePic : undefined}
            />
          ) : (
            <Avatar className="profile-picture">
              <AddPhotoAlternateIcon />
            </Avatar>
          )}
        </label>
        <h1>{fullName}</h1>
        <p className="email">{user.email}</p>
        <div className="genre-wrapper">
          <h5 className="fav-genres-header">Favorite Genres:</h5>
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
