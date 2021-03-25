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

    const condition = validate();

    return condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
        (<Redirect  to="/login"  />);
};

export default connect()(PrivateRoute);
