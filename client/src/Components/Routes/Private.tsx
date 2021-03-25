import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../index';
import { connect } from 'react-redux';

const  PrivateRoute: React.FC<{component: any;path: string; exact: boolean;}> = (props) => {
    const signedIn = useSelector(
      (state: RootState) => state.authReducer.signedIn
    );
    const validate = () => {
      const token = localStorage.getItem('accessToken');
      if (signedIn && token) return true;
      else return false;
    }
    // const condition = validate();
    const condition = validate();

    return condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
        (<Redirect  to="/login"  />);
};

export default connect()(PrivateRoute);
/*
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);

*/


/*
import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../index';
import { connect } from 'react-redux';

const  PrivateRoute: React.FC<{component: any;path: string; exact: boolean;}> = (props) => {
    const signedIn = useSelector(
      (state: RootState) => state.authReducer.signedIn
    );
    const validate = () => {
      const token = localStorage.getItem('accessToken');
      console.log('🚀 -----------------------------------------------');
      console.log('🚀 : file: Private.tsx : line 13 : token', token);
      console.log('🚀 -----------------------------------------------');
      console.log('🚀 -----------------------------------------------------');
      console.log('🚀 : file: Private.tsx : line 18 : signedIn', signedIn);
      console.log('🚀 -----------------------------------------------------');

      if (signedIn && token) return true;
      else return false;
    }
    // const condition = validate();
    const condition = validate();

    return condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
        (<Redirect  to="/login"  />);
};



*/ 