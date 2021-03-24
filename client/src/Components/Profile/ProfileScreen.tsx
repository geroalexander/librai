//BEN
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { User } from '../../Interfaces/userObject';
import { RootState } from '../../index';
import { _getUserWithBooks } from '../../Store/actions/users';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );
  const dispatch = useDispatch();

  // const renderFavoriteGenres = user.favoriteGenres.map(
  //   (genre: string, i: number) => <p key={i}>{genre}</p>
  // );

  useEffect(() => {
    const getBooks = async () => {
      const action = await _getUserWithBooks();
      dispatch(action);
    };

    getBooks();
  }, []);

  console.log('USERUSERUSER', user.books);

  // const renderBooks = user.books.map(book => <BookDetail key={book.id} book={book} />);

  return (
    <div>
      <button>Logout</button>
      {/* <img src={String(user.profilePic)} alt="" /> */}
      <h1>{/* {user.firstName} {user.lastName} */}</h1>
      {/* <p>{user.email}</p> */}
      {/* <p>{renderFavoriteGenres}</p> */}
      {/* renderBooks */}
    </div>
  );
};

export default withRouter(ProfileScreen);
