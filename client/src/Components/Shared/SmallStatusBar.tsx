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
import { useMediaQuery } from 'react-responsive'


interface StatusBarProps extends RouteComponentProps {
  book: Book;
}

const SmallStatusBar: React.FC<StatusBarProps> = ({ book }) => {

  const isSmallMobile = useMediaQuery({
    query: '(max-height: 720px)'
  })

  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)'
  })

  let iconSize: number;

  isSmallMobile ? iconSize = 25 : iconSize = 25
  isDesktop ? iconSize = 38 : iconSize = 25

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
        <SentimentSatisfiedAltIcon style={{ fontSize: iconSize, color: '#140245' }} />
      );
    else if (rating === 0)
      return (
        <SentimentSatisfiedIcon style={{ fontSize: iconSize, color: '#140245' }} />
      );
    else if (rating === -1)
      return (
        <SentimentVeryDissatisfiedIcon
          style={{ fontSize: iconSize, color: '#140245' }}
        />
      );
    else return <CheckRoundedIcon style={{ fontSize: iconSize, color: '#140245' }} />;
  };

  const handleRatingChange = async (newRating: number | null) => {
    if (newRating !== null) {
      const action = await _updateRating(book, newRating);
      dispatch(action);
      setRating(newRating);
      setIsSaved(false);
    } else {
      const action = await _deleteRating(book);
      dispatch(action);
      setRating(newRating);
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
              <CloseRoundedIcon style={{ fontSize: iconSize, color: '#140245' }} />
            }
            background="#c8baf3"
            onClick={() => {
              if (rated) handleRatingChange(null);
              setRated(!rated);
            }}
            size={iconSize+10}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedAltIcon
                style={{ fontSize: iconSize, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={iconSize+10}
            onClick={() => handleRatingChange(1)}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedIcon
                style={{ fontSize: iconSize, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={iconSize+10}
            onClick={() => handleRatingChange(0)}
          />
          <ChildButton
            icon={
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: iconSize, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={iconSize+10}
            onClick={() => handleRatingChange(-1)}
          />
        </FloatingMenu>
      </div>
      {!rated && (
        <div className="bookmark-wrapper">
          <FloatingMenu
            slideSpeed={500}
            direction={Directions.Right}
            spacing={8}
            isOpen={isSaved}
          >
            <MainButton
              iconResting={
                <BookmarkBorderRoundedIcon
                  style={{ fontSize: iconSize, color: '#140245' }}
                />
              }
              iconActive={
                <BookmarkRoundedIcon
                  style={{
                    fontSize: iconSize,
                    color: '#140245',
                    transform: 'rotateX(180deg)',
                  }}
                />
              }
              background="#c8baf3"
              onClick={handleSaveChange}
              size={iconSize+10}
            />
          </FloatingMenu>
        </div>
      )}
    </div>
  );
};

export default withRouter(SmallStatusBar);
