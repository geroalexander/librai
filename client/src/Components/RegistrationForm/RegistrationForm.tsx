//BEN
// NEED TO SORT OUT ACTION< REDUCER AND USER_CTRL LOGIC TO ADD FAVORITE GENRES
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import { User } from '../../Interfaces/userObject';
import './RegistrationForm.css';
import { genres } from './genres';
import Chip from '@material-ui/core/Chip';
import SearchBar from '../Shared/SearchBar';
import { _registrationForm } from '../../Store/actions/users';
import { popularBooks } from './popular_books.js';
import { PopularBook } from '../../Interfaces/popularBookObject';

interface RegistrationFormProps extends RouteComponentProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer.userWithBooks
  );
  const dispatch = useDispatch();

  const [isUserPickingGenres, setIsUserPickingGenres] = useState(true);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]);

  const addFavoriteGenre = (e: any) => {
    const genreToAdd = e.target.innerText;
    setFavoriteGenres((prevGenres) => [...prevGenres, genreToAdd]);
  };

  const deleteFavoriteGenre = (e: any) => {
    const genreToDelete = e.target.innerText;
    setFavoriteGenres((prevGenres) =>
      prevGenres.filter((genre) => genre !== genreToDelete)
    );
  };

  const addFavoriteBook = (e: any) => {
    const bookToAdd = e.target.innerText;
    setFavoriteBooks((prevBooks) => [...prevBooks, bookToAdd]);
  };

  const deleteFavoriteBook = (e: any) => {
    const bookToDelete = e.target.innerText;
    setFavoriteBooks((prevBooks) =>
      prevBooks.filter((book) => book !== bookToDelete)
    );
  };

  const handleSubmitGenres = () => {
    setIsUserPickingGenres(false);
  };

  // const handleRegistrationFormSubmit = () => {
  //   dispatch(_registrationForm());
  // };

  const renderGenreChips = genres.map((genre: string, index: number) => (
    <Chip
      key={index}
      clickable
      label={genre}
      onClick={addFavoriteGenre}
      onDelete={deleteFavoriteGenre}
    />
  ));

  const renderPopularBooks = popularBooks.map((book: PopularBook) => (
    <img
      src={book.smallThumbnail ? book.smallThumbnail : undefined}
      alt={book.title}
    />
  ));

  // Get here from form = true
  // sending genres and books
  // show list of popular books

  return (
    <div className="reg-form-page">
      {/* <header>
        <SearchBar />
      </header> */}
      {isUserPickingGenres ? renderGenreChips : renderPopularBooks}
    </div>
  );
};

export default withRouter(RegistrationForm);
