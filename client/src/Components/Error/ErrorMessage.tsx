import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch } from 'react-redux';
import { removeError } from '../../Store/actions/errors';
import { withStyles } from '@material-ui/core/styles';

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
    </StyledDialog>
  );
};

export default ErrorMessage;
