import React, { useState } from 'react';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import './FAB.css';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../Interfaces/bookObject';

interface FABProps extends RouteComponentProps {
  book: Book;
}

const FAB: React.FC<FABProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentURL = 'https://librai.netlify.app/';

  return (
    <div className="fab">
      <FloatingMenu
        slideSpeed={500}
        direction={Directions.Up}
        spacing={15}
        isOpen={isOpen}
      >
        <MainButton
          iconResting={<ShareIcon style={{ fontSize: 35, color: '#140245' }} />}
          iconActive={<CloseIcon style={{ fontSize: 40, color: '#140245' }} />}
          background="#dfd5fc"
          onClick={() => setIsOpen(!isOpen)}
          size={70}
        />
        <ChildButton
          icon={
            <FacebookShareButton
              url={currentURL}
              quote={`Download Librai! \nCheck out this book: ${book.title} by ${book.authors[0]} \n`}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon style={{ fontSize: 38, color: '#140245' }} />
            </FacebookShareButton>
          }
          background="#dfd5fc"
          size={60}
          onClick={() => console.log('First button clicked')}
        />
        <ChildButton
          icon={
            <WhatsappShareButton
              url={currentURL}
              title={`Download Librai! \nCheck out this book: ${book.title} by ${book.authors[0]} \n`}
              className="button"
            >
              <WhatsAppIcon style={{ fontSize: 38, color: '#140245' }} />
            </WhatsappShareButton>
          }
          background="#dfd5fc"
          size={60}
          onClick={() => console.log('First button clicked')}
        />
        <ChildButton
          icon={
            <TwitterShareButton
              url={currentURL}
              title={`Download Librai! \nCheck out this book: ${book.title} by ${book.authors[0]} \n`}
              className="button"
            >
              <TwitterIcon style={{ fontSize: 35, color: '#140245' }} />
            </TwitterShareButton>
          }
          background="#dfd5fc"
          size={60}
          onClick={() => console.log('First button clicked')}
        />
      </FloatingMenu>
    </div>
  );
};

export default withRouter(FAB);
