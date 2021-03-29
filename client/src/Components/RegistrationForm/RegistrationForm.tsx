//BEN
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import './RegistrationForm.css';
import { genres } from './genres';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import SearchBar from '../Shared/SearchBar';
import { _registrationForm } from '../../Store/actions/users';
import { popularBooks } from './popular_books.js';
import { PopularBook } from '../../Interfaces/popularBookObject';
import BookStatusBar from '../BookDetails/BookStatusBar/BookStatusBar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface RegistrationFormProps extends RouteComponentProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const [isUserPickingGenres, setIsUserPickingGenres] = useState(true);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<PopularBook[]>([]);
  const [open, setOpen] = React.useState(false);
  console.log('HERE', open);

  const dispatch = useDispatch();
  const history = useHistory();

  const genreErrorMessage = 'Please pick between 3 and 5 genres';
  const bookErrorMessage = 'Please pick at least 3 books';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  };

  const handleSubmitGenres = () => {
    const numberOfGenres = favoriteGenres.length;
    if (numberOfGenres < 3 || numberOfGenres > 5) {
      handleClickOpen();
      return;
    }
    setIsUserPickingGenres(false);
  };

  const handleSubmitForm = async () => {
    if (favoriteBooks.length < 3) {
      handleClickOpen();
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {isUserPickingGenres ? genreErrorMessage : bookErrorMessage}
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default withRouter(RegistrationForm);
