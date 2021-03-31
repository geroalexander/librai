import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../index';

const AuthRoute: React.FC<{component: any; path: string; exact: boolean;}>
= (props) => {
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );
  const validate = () => {

    if (signedIn) return true;
    else return false;
  };

  const condition = validate();

  return !condition ? (
    <Redirect to="/" />
  ) : (
    <Redirect to={{ pathname: `${props.path}` }} />
  );
};
export default AuthRoute;
