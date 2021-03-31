import React, { useState, useEffect } from 'react';
import './BookStatusBar.css';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { useDispatch } from 'react-redux';
import { Book } from '../../../Interfaces/bookObject';
import {
  _updateRating,
  _deleteRating,
  _addSavedBook,
  _deleteSavedBook,
} from '../../../Store/actions/users';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';

interface BookStatusBarProps extends RouteComponentProps {
  book: Book;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
    typography: {
      padding: theme.spacing(2),
    },
    "@keyframes enter": {
      "0%": {
        transform: "scale(0)",
        opacity: 0
      },
      "100%": {
        transform: "scale(0)",
        opacity: 0
      }
    }
    })
);

const BookStatusBar: React.FC<BookStatusBarProps> = ({ book }) => {
  const classes = useStyles();
  const [isSaved, setIsSaved] = useState(false);
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
    <div className="book-status ">
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
              if (rated) handleRatingChange(null);
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
          <div className="compat-score">
            {isMobile ? (
              <div>
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                  style={{ background: 'transparent', boxShadow: 'none' }}
                >
                  {handleCompatScore()}
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography className={classes.typography}>
                    Your personalized compatability score!
                  </Typography>
                </Popover>
              </div>
            ) : (
              <>
                <Typography
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  {handleCompatScore()}
                </Typography>
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  Your personalized compatability score!
                </Popover>
              </>
            )}
          </div>
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
                onClick={handleSaveChange}
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
