//BEN
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import './RegistrationForm.css';
import { genres } from './genres';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { _registrationForm } from '../../Store/actions/users';
import { popularBooks } from './popular_books.js';
import { PopularBook } from '../../Interfaces/popularBookObject';
import ErrorMessage from '../Error/ErrorMessage';

interface RegistrationFormProps extends RouteComponentProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const [isUserPickingGenres, setIsUserPickingGenres] = useState(true);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<PopularBook[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const genreErrorMessage = 'Please pick between 3 and 5 genres';
  const bookErrorMessage = 'Please pick at least 3 books';

  const addFavoriteGenre = (e: React.MouseEvent) => {
    const chip = e.target as HTMLElement
    const genreToAdd = chip.innerText;
    setFavoriteGenres((prevGenres) => [...prevGenres, genreToAdd]);
  };

  const deleteFavoriteGenre = (e: React.MouseEvent) => {
    const chip = e.target as HTMLElement
    const genreToDelete = chip.innerText;
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
  };

  const handleSubmitGenres = () => {
    const numberOfGenres = favoriteGenres.length;
    if (numberOfGenres < 3 || numberOfGenres > 5) {
      setOpen(true);
      return;
    }
    setIsUserPickingGenres(false);
  };

  const handleSubmitForm = async () => {
    if (favoriteBooks.length < 3) {
      setOpen(true);
      return;
    }
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
          ? { color: '#dfd5fc', borderColor: '#dfd5fc' }
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
      {open && (
        <ErrorMessage
          message={isUserPickingGenres ? genreErrorMessage : bookErrorMessage}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default withRouter(RegistrationForm);
