import React, { useState, useEffect } from 'react';
import './BookStatusBar.css';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { useSelector, useDispatch } from 'react-redux';
import { Book } from '../../../Interfaces/bookObject';
import {
  _updateRating,
  _deleteRating,
  _addSavedBook,
  _deleteSavedBook,
} from '../../../Store/actions/users';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';

interface BookStatusBarProps extends RouteComponentProps {
  book: Book;
}

const BookStatusBar: React.FC<BookStatusBarProps> = ({ book }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (book.interaction) {
      book.interaction.isSaved && setIsSaved(true);
      book.interaction.rating && setRating(book.interaction.rating);
    }
  }, []);

  const handleRatingIcon = () => {
    if (rating === 1)
      return (
        <SentimentSatisfiedAltIcon style={{ fontSize: 35, color: '#140245' }} />
      );
    else if (rating === 0)
      return (
        <SentimentSatisfiedIcon style={{ fontSize: 35, color: '#140245' }} />
      );
    else if (rating === -1)
      return (
        <SentimentVeryDissatisfiedIcon
          style={{ fontSize: 35, color: '#140245' }}
        />
      );
    else return <CheckRoundedIcon style={{ fontSize: 35, color: '#140245' }} />;
  };

  const handleCompatScore = () => {
    if (rating !== null)
      return <DoneAllRoundedIcon style={{ fontSize: 45, color: '#c8baf3' }} />;

    return book.interaction && book.interaction.compatabilityScore ? (
      <p className="title">{book.interaction.compatabilityScore}</p>
    ) : (
      <p className="title">{book.compatabilityScore}</p>
    );
  };

  const handleRatingChange = async (newRating: number | null) => {
    if (newRating !== null) {
      const action = await _updateRating(book, newRating);
      dispatch(action);
      setRating(newRating);
    } else {
      const action = await _deleteRating(book);
      dispatch(action);
      setRating(newRating);
    }
    setRated(!rated);
  };

  const handleSaveChange = () => {};

  return (
    <div className="book-status">
      <div className="rating-wrapper">
        <FloatingMenu
          slideSpeed={500}
          direction={Directions.Right}
          spacing={18}
          isOpen={rated}
        >
          <MainButton
            iconResting={handleRatingIcon()}
            iconActive={
              <CloseRoundedIcon style={{ fontSize: 35, color: '#140245' }} />
            }
            background="#c8baf3"
            onClick={() => {
              setRated(!rated);
            }}
            size={60}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedAltIcon
                style={{ fontSize: 35, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={60}
            onClick={() => handleRatingChange(1)}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedIcon
                style={{ fontSize: 35, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={60}
            onClick={() => handleRatingChange(0)}
          />
          <ChildButton
            icon={
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 35, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={60}
            onClick={() => handleRatingChange(-1)}
          />
        </FloatingMenu>
      </div>
      {!rated && (
        <>
          <div className="compat-score">{handleCompatScore()}</div>
          <div className="bookmark-wrapper">
            <FloatingMenu
              slideSpeed={500}
              direction={Directions.Up}
              spacing={8}
              isOpen={isSaved}
            >
              <MainButton
                iconResting={
                  <BookmarkBorderRoundedIcon
                    style={{ fontSize: 35, color: '#140245' }}
                  />
                }
                iconActive={
                  <BookmarkRoundedIcon
                    style={{
                      fontSize: 35,
                      color: '#140245',
                      transform: 'rotateX(180deg)',
                    }}
                  />
                }
                background="#c8baf3"
                onClick={() => {
                  setIsSaved(!isSaved);
                }}
                size={60}
              />
            </FloatingMenu>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(BookStatusBar);
