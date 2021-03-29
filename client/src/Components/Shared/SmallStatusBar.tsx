import React, { useState, useEffect } from 'react';
import './SmallStatusBar.css';
import { Book } from '../../Interfaces/bookObject';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import {
  _updateRating,
  _deleteRating,
  _addSavedBook,
  _deleteSavedBook,
} from '../../Store/actions/users';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { SET_ERROR } from '../../Store/actions/ActionTypes';

interface StatusBarProps extends RouteComponentProps {
  book: Book;
}

const SmallStatusBar: React.FC<StatusBarProps> = ({ book }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (book.interaction) {
      book.interaction.isSaved && setIsSaved(true);
      book.interaction.rating !== null && setRating(book.interaction.rating);
    }
  }, []);

  const handleRatingIcon = () => {
    if (rating === 1)
      return (
        <SentimentSatisfiedAltIcon style={{ fontSize: 30, color: '#140245' }} />
      );
    else if (rating === 0)
      return (
        <SentimentSatisfiedIcon style={{ fontSize: 30, color: '#140245' }} />
      );
    else if (rating === -1)
      return (
        <SentimentVeryDissatisfiedIcon
          style={{ fontSize: 35, color: '#140245' }}
        />
      );
    else return <CheckRoundedIcon style={{ fontSize: 30, color: '#140245' }} />;
  };

  const handleRatingChange = async (newRating: number | null) => {
    if (newRating !== null) {
      const action = await _updateRating(book, newRating);
      dispatch(action);
      setRating(newRating);
      setIsSaved(false);
    } else {
      // try {
        const action = await _deleteRating(book);
        dispatch(action);
        setRating(newRating);
      // } catch (error) {
      //   dispatch({ type: SET_ERROR, payload: error})
      // }
    }
    setRated(!rated);
  };

  const handleSaveChange = async () => {
    if (isSaved) {
      const action = await _deleteSavedBook(book);
      dispatch(action);
    } else {
      const action = await _addSavedBook(book);
      dispatch(action);
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="small-status">
      <div className="rating-wrapper">
        <FloatingMenu
          slideSpeed={500}
          direction={Directions.Right}
          spacing={10}
          isOpen={rated}
        >
          <MainButton
            iconResting={handleRatingIcon()}
            iconActive={
              <CloseRoundedIcon style={{ fontSize: 30, color: '#140245' }} />
            }
            background="#c8baf3"
            onClick={() => {
              if (rated) handleRatingChange(null);
              setRated(!rated);
            }}
            size={40}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedAltIcon
                style={{ fontSize: 30, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={40}
            onClick={() => handleRatingChange(1)}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedIcon
                style={{ fontSize: 30, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={40}
            onClick={() => handleRatingChange(0)}
          />
          <ChildButton
            icon={
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 30, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={40}
            onClick={() => handleRatingChange(-1)}
          />
        </FloatingMenu>
      </div>
      {!rated && (
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
                  style={{ fontSize: 30, color: '#140245' }}
                />
              }
              iconActive={
                <BookmarkRoundedIcon
                  style={{
                    fontSize: 30,
                    color: '#140245',
                    transform: 'rotateX(180deg)',
                  }}
                />
              }
              background="#c8baf3"
              onClick={handleSaveChange}
              size={40}
            />
          </FloatingMenu>
        </div>
      )}
    </div>
  );
};

export default withRouter(SmallStatusBar);
