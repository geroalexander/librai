import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../..';
import './Register.css';
import {
  setRegister,
  setLogout,
  setGoogleLogin,
} from '../../Store/actions/auth';
import {
  Link,
  RouteComponentProps,
  withRouter,
  useHistory,
} from 'react-router-dom';
import { RootState } from '../../index';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Register: React.FC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );

  useEffect(() => {
    if (signedIn) dispatch(setLogout());
  }, []);

  const onClickSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setRegister({ firstName, lastName, email, password }))
      .then(() => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        history.push('/form');
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogin = async (googleData: any) => {
    const action = setGoogleLogin(googleData);
    const accessType = await dispatch(action);
    if (accessType === 'login') history.push('/');
    else if (accessType === 'register') history.push('/form');
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={onClickSubmitLogin} className="register-form">
        <div className="form-inner">
          <h2 className="title">Register</h2>
          {/*ERROR*/}
          <div className="form-group">
            <div className="icon">
              <PersonOutlineIcon
                style={{ color: '#fffef9' }}
              ></PersonOutlineIcon>
            </div>
            <input
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="firstName"
              placeholder="FIRST NAME"
              id="firstName"
            />
          </div>
          <div className="form-group">
            <div className="icon">
              <PersonIcon style={{ color: '#fffef9' }}></PersonIcon>
            </div>
            <input
              className="input"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="lastName"
              placeholder="LAST NAME"
              id="lastName"
            />
          </div>
          <div className="form-group">
            <div className="icon">
              <EmailIcon style={{ color: '#fffef9' }}></EmailIcon>
            </div>
            <input
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="EMAIL"
              id="email"
            />
          </div>
          <div className="form-group">
            <div className="icon">
              <LockIcon style={{ color: '#fffef9' }}></LockIcon>
            </div>
            <input
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
            />
          </div>
          <input className="submitButton" type="submit" value="SIGN UP" />
          <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID || ''}
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <button
                className="google-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign up with Google
                <FcGoogle style={{ marginLeft: 10 }} />
              </button>
            )}
          />
          <Link to="/login" className="to-login">
            Already have an account? Click here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Register);
