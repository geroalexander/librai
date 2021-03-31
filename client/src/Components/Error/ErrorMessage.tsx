import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch } from 'react-redux';
import { removeError } from '../../Store/actions/errors';
import { withStyles } from '@material-ui/core/styles';
import { IoShareOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';

import './ErrorMessage.css';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ErrorMessageProps {
  message: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  callback?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  open,
  setOpen,
  callback,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(removeError());
    if (callback)
      setTimeout(() => {
        callback();
      }, 500);
  };

  const StyledDialog = withStyles((theme) => ({
    paper: {
      borderRadius: 100,
      backgroundColor: '#dfd5fc',
    },
  }))(Dialog);

  const StyledDialogTitle = withStyles((theme) => ({
    root: {
      textAlign: 'center',
      '& h2': {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#140245',
      },
    },
  }))(DialogTitle);

  const StyledDialogContentText = withStyles((theme) => ({
    root: {
      textAlign: 'center',
      fontFamily: 'Montserrat',
      fontSize: 14,
      color: '#140245',
    },
  }))(DialogContentText);

  const downloadPwaMessage =
    'This app is optimised to be a PWA, download it to your Home Screen to get the full experience:';

  return (
    <StyledDialog
      className="error-dialog"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        {message}
      </StyledDialogTitle>
      {message === downloadPwaMessage && (
        <DialogContent>
          <StyledDialogContentText id="alert-dialog-slide-description">
            For IOS: tap the <IoShareOutline /> icon on Safari
          </StyledDialogContentText>
          <StyledDialogContentText id="alert-dialog-slide-description">
            For Android: tap the <BsThreeDotsVertical /> icon on Chrome
          </StyledDialogContentText>
          <StyledDialogContentText id="alert-dialog-slide-description">
            and choose 'Add To Home Screen'
          </StyledDialogContentText>
        </DialogContent>
      )}
    </StyledDialog>
  );
};

export default ErrorMessage;
