import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../..';
import './Register.css';
import {
  setRegister,
  setLogout,
  setGoogleLogin,
} from '../../Store/actions/auth';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { RootState } from '../../index';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { setError as reduxSetError } from '../../Store/actions/errors';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const { register, handleSubmit, errors, reset, setError } = useForm({
    defaultValues,
  });

  const submitRegister = async (data: typeof defaultValues) => {
    const action = setRegister(data);
    const register = await dispatch(action);
    if (!register.error) {
      reset();
      history.push('/form');
    } else if (register.error === 'This user already exists') {
      setError('password', {
        type: 'manual',
        message: 'This e-mail already exists',
      });
    } else {
      setError('password', {
        type: 'manual',
        message: 'Something went wrong, please try again.',
      });
    }
  };
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );

  useEffect(() => {
    if (signedIn) dispatch(setLogout());
  }, []);

  const handleGoogleLoginSuccess = async (googleData: any) => {
    const action = setGoogleLogin(googleData);
    const accessType = await dispatch(action);
    if (accessType === 'login') history.push('/');
    else if (accessType === 'register') history.push('/form');
  };

  const handleGoogleLoginFailure = () => {
    const action = reduxSetError(
      'Google authentication failed, please try again'
    );
    dispatch(action);
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit(submitRegister)} className="register-form">
        <div className="form-inner">
          <h2 className="title">Register</h2>
          <div className="form-group">
            <div className="icon">
              <PersonOutlineIcon
                style={{ color: '#fffef9' }}
              ></PersonOutlineIcon>
            </div>
            <input
              className="input"
              type="text"
              name="firstName"
              placeholder="FIRST NAME"
              id="firstName"
              ref={register({
                required: 'Please enter your first name.',
              })}
            />
          </div>
          {errors.firstName && (
            <span role="alert">{errors.firstName.message}</span>
          )}
          <div className="form-group">
            <div className="icon">
              <PersonIcon style={{ color: '#fffef9' }}></PersonIcon>
            </div>
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="LAST NAME"
              id="lastName"
              ref={register({
                required: 'Please enter your last name.',
              })}
            />
          </div>
          {errors.lastName && (
            <span role="alert">{errors.lastName.message}</span>
          )}
          <div className="form-group">
            <div className="icon">
              <EmailIcon style={{ color: '#fffef9' }}></EmailIcon>
            </div>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="EMAIL"
              id="email"
              ref={register({
                required: 'Please enter an email address',
                pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid e-mail address.',
                },
              })}
            />
          </div>
          {errors.email && <span role="alert">{errors.email.message}</span>}
          <div className="form-group">
            <div className="icon">
              <LockIcon style={{ color: '#fffef9' }}></LockIcon>
            </div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
              ref={register({
                required: 'Please enter a password.',
                minLength: {
                  value: 5,
                  message: 'Minimum password length is 5',
                },
              })}
            />
          </div>
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
          <input className="submitButton" type="submit" value="SIGN UP" />
          <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID || ''}
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <button
                className="google-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign up with Google
                <FcGoogle style={{ marginLeft: 8 }} />
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
