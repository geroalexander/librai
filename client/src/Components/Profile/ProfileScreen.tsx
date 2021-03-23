//BEN
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { User } from '../../Interfaces/userObject';
import { RootState } from '../../index';

interface ProfileScreenProps extends RouteComponentProps {}
// const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2UyZTQ2MC0zMDU1LTQwMGItOGQ4OC0zMTE2ODA4NzU3NzQiLCJpYXQiOjE2MTY1Mjc5NjJ9.yID2_occRk36cc1VyyIGlBeauu_DGtKxNr7Aoxxvm98';

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );
  // const dispatch = useDispatch();

  // const renderFavoriteGenres = user.favoriteGenres.map((genre: string) => {});

  // const renderBooks = user.books.map(book => <BookDetail book={book} />);

  return (
    <div>
      <button>Logout</button>
      <img src={String(user.profilePic)} alt="" />
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
      {/* <p>{renderFavoriteGenres}</p> */}
      {/* renderBooks */}
    </div>
  );
};

export default withRouter(ProfileScreen);
