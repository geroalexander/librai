//ANDRAS
import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface SavedScreenProps extends RouteComponentProps {};

const SavedScreen:  React.FC<SavedScreenProps> = (props) => {

  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
  const userWithBooks = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  ); 

  return (
    <div>
      <h1>Hello. Saved Screen</h1>
    </div>
);
}

export default withRouter(SavedScreen);
