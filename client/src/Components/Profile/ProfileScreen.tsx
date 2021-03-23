//BEN
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { User } from '../../Interfaces/userObject';
import { RootState } from '../../index';

// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   profilePic: string | null;
//   favoriteGenres: string[] | [];
//   books?: Book[] | null;
// }

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );
  const dispatch = useDispatch();

  const renderFavoriteGenres = () => {};

  const renderBooks;

  return (
    <div>
      <button>Logout</button>
      <img src={String(user.profilePic)} alt="" />
    </div>
  );
};

export default withRouter(ProfileScreen);
