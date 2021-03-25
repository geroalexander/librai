import React, { useState, useEffect } from 'react';
import './BookStatusBar.css';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import { Book } from '../../../Interfaces/bookObject';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

interface BookStatusBarProps extends RouteComponentProps {
  book: Book;
}

const BookStatusBar: React.FC<BookStatusBarProps> = ({ book }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [rated, setRated] = useState(false);

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
            iconResting={
              <CheckRoundedIcon style={{ fontSize: 35, color: '#140245' }} />
            }
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
            onClick={() => console.log('First button clicked')}
          />
          <ChildButton
            icon={
              <SentimentSatisfiedIcon
                style={{ fontSize: 35, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={60}
          />
          <ChildButton
            icon={
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 35, color: '#140245' }}
              />
            }
            background="linear-gradient(45deg, #5018ea 1%, #dfd5fc 100%)"
            size={60}
          />
        </FloatingMenu>
      </div>
      {!rated && (
        <>
          <div className="compat-score">
            <p className="title">{book.compatabilityScore}</p>
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
