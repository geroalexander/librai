//BEN
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { RootState } from '../../index';
import { User } from '../../Interfaces/userObject';
import { Book } from '../../Interfaces/bookObject';
import { _updateProfile, _getUserWithBooks } from '../../Store/actions/users';
import './ProfileScreen.css';
import BookItem from '../Shared/BookItem';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { setLogout } from '../../Store/actions/auth';
import { uploadToCloud } from '../../ApiClientService/ImageUpload';
import imageToBase64 from '../Shared/imageToBase64';
import LottieAnimation from '../../Animations/Lottie';
import loading from '../../Animations/paperplane-animation.json';
import Loader from 'react-loader-spinner';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useMediaQuery } from 'react-responsive';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)',
  });

  const history = useHistory();

  const user: User = useSelector(
    (state: RootState) => state.userReducer.userWithBooks
  );

  useEffect(() => {
    if (!Object.keys(user).length) {
      const getUser = async () => {
        const action = _getUserWithBooks();
        dispatch(action);
      };

      getUser();
    }
    user && user.books && setIsLoading(false);
  }, [user]);

  const fullName = `${user.firstName} ${user.lastName}`;
  const { favoriteGenres } = user;

  const handleLogout = () => {
    dispatch(setLogout());
    history.push('/login');
  };

  const handleUpdateProfilePic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setImageLoading(true);
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );
    const profilePictureUrl = await uploadToCloud(base64Image, dispatch);
    dispatch(_updateProfile(profilePictureUrl, null, null));
    setImageLoading(false);
  };

  const renderProfilePic = () => {
    if (!imageLoading) {
      if (user.profilePic)
        return (
          <Avatar
            className="profile-picture"
            alt={fullName}
            src={user.profilePic}
          />
        );
      return (
        <div className="empty-profile">
          <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
        </div>
      );
    }
    return (
      <div className="empty-profile">
        <Loader
          type="Puff"
          color="#dfd5fc"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  };

  if (!isLoading) {
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
              onChange={handleUpdateProfilePic}
            />
            {renderProfilePic()}
          </label>
          <div>
            <h1>{fullName}</h1>
            <p className="email">{user.email}</p>
          </div>
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
          {isDesktop && <hr className="line"></hr>}
        </div>
        <div className="rated-books">
          {isDesktop && (
            <div className="title-wrapper">
              <p className="title">Past reads</p>
              <MenuBookIcon
                style={{ fontSize: 40, color: '#fffef9', marginLeft: 15 }}
              />
            </div>
          )}
          {user.books && (
            <div className="book-list">
              {user.books
                .filter((book: Book) => book.interaction.rating !== null)
                .map((book: Book) => (
                  <BookItem key={book.id} book={book} />
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <LottieAnimation margin="" animation={loading} width={300} height={300} />
  );
};

export default withRouter(ProfileScreen);
