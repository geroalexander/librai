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
import Button from '@material-ui/core/Button';
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
    e.target.style.backgroundColor = '#f5d541';
    console.log(e.target.innerText);
    console.log(favoriteGenres);
    const genreToAdd = e.target.innerText;
    setFavoriteGenres((prevGenres) => [...prevGenres, genreToAdd]);
  };

  const deleteFavoriteGenre = (e: any) => {
    const genreToDelete = e.target.innerText;
    setFavoriteGenres((prevGenres) =>
      prevGenres.filter((genre) => genre !== genreToDelete)
    );
  };

  const handleAddOrRemoveBook = (e: any) => {
    console.log(e.target.name);
    // const newBook = e.target;
    // favoriteBooks.includes(e.target.innerText) &&
    //   setFavoriteBooks((prevBooks) =>
    //     prevBooks.filter((book) => book !== bookToDelete)
    //   );

    // const bookToAdd = e.target.innerText;
    // setFavoriteBooks((prevBooks) => [...prevBooks, bookToAdd]);
  };

  const handleSubmitGenres = () => {
    setIsUserPickingGenres(false);
  };

  // const handleSubmitForm = () => {
  //   dispatch(_registrationForm());
  // };

  const renderGenreChips = genres.map((genre: string, index: number) => (
    <Chip
      key={index}
      clickable
      label={genre}
      onClick={addFavoriteGenre}
      onDelete={deleteFavoriteGenre}
      className="genre-chip"
    />
  ));

  const renderPopularBooks = popularBooks.map((book: PopularBook) => (
    <map
      name={book.id}
      className="pop-book-button"
      onClick={handleAddOrRemoveBook}
    >
      <img
        key={book.id}
        src={book.thumbnail ? book.thumbnail : undefined}
        alt={book.title}
      />
    </map>
  ));

  // Get here from form = true
  // sending genres and books
  // show list of popular books

  return (
    <div className="reg-form-page">
      {/* <header>
        <SearchBar />
      </header> */}
      {isUserPickingGenres ? (
        <div className="genre-form-wrapper">
          <h1>Choose your favorite genres!</h1>
          <div className="genre-chips">{renderGenreChips}</div>
          <Button
            variant="contained"
            onClick={handleSubmitGenres}
            className="submit"
          >
            Submit
          </Button>
        </div>
      ) : (
        <div className="book-picker-wrapper">
          <h1>Choose your favorite books!</h1>
          <div className="books-wrapper">{renderPopularBooks}</div>
          <Button
            variant="contained"
            // onClick={handleSubmitForm}
            className="submit"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default withRouter(RegistrationForm);
