//PAMELA
import React from 'react';
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
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
    if (callback)
      setTimeout(() => {
        callback();
      }, 500);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{message}</DialogTitle>
    </Dialog>
  );
};

export default ErrorMessage;
