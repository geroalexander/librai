//BEN
// NEED TO SORT OUT ACTION< REDUCER AND USER_CTRL LOGIC TO ADD FAVORITE GENRES
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
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
import BookStatusBar from '../BookDetails/BookStatusBar/BookStatusBar';

interface RegistrationFormProps extends RouteComponentProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const user: User = useSelector(
    (state: RootState) => state.userReducer.userWithBooks
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [isUserPickingGenres, setIsUserPickingGenres] = useState(true);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<PopularBook[]>([]);

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

  const handleAddOrRemoveBook = (book: PopularBook) => {
    if (favoriteBooks && favoriteBooks.some(({ id }) => id === book.id)) {
      setFavoriteBooks((prevBooks) =>
        prevBooks.filter(({ id }) => id !== book.id)
      );
    } else {
      setFavoriteBooks((prevBooks) => [...prevBooks, book]);
    }

    console.log(favoriteBooks);
  };

  const handleSubmitGenres = () => {
    setIsUserPickingGenres(false);
  };

  const handleSubmitForm = async () => {
    const action = await _registrationForm(favoriteBooks, favoriteGenres);
    await dispatch(action);
    history.push('/');
  };

  const renderGenreChips = genres.map((genre: string, index: number) => (
    <Chip
      key={index}
      variant={!favoriteGenres.includes(genre) ? 'outlined' : undefined}
      clickable
      style={
        !favoriteGenres.includes(genre)
          ? { color: '#fffef9', borderColor: '#fffef9' }
          : { color: '#140245', borderColor: '#140245' }
      }
      label={genre}
      onClick={
        !favoriteGenres.includes(genre) ? addFavoriteGenre : deleteFavoriteGenre
      }
      className="genre-chip"
    />
  ));

  const renderPopularBooks = popularBooks.map((book: PopularBook) => (
    <map
      name={book.id}
      className="pop-book-button"
      onClick={() => handleAddOrRemoveBook(book)}
    >
      <img
        className={favoriteBooks.includes(book) ? 'book-opaque' : ''}
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
            onClick={handleSubmitForm}
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
