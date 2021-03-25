import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../index';

const AuthRoute: React.FC<{component: any; path: string; exact: boolean;}>
= (props) => {
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );
  const validate = () => {
    // const token = localStorage.getItem('accessToken');
    // console.log('🚀 -----------------------------------------------');
    // console.log('🚀 : file: Private.tsx : line 13 : token', token);
    // console.log('🚀 -----------------------------------------------');
    console.log('🚀 -----------------------------------------------------');
    console.log('🚀 : file: Private.tsx : line 18 : signedIn', signedIn);
    console.log('🚀 -----------------------------------------------------');
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
