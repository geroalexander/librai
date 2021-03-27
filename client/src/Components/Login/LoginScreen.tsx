import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Login.css';
import { setLogin } from '../../Store/actions/auth';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const defaultValues = { email: '', password: '' };

  const { register, handleSubmit, errors, reset, setError } = useForm({
    defaultValues,
  });

  const submitLogin = async (data: typeof defaultValues) => {
    const { email, password } = data;
    const action = setLogin({ email, password });

    await dispatch(action);

    const token = localStorage.getItem('accessToken');
    if (token) {
      reset();
      history.push('/');
    } else {
      setError('password', {
        type: 'manual',
        message: 'Invalid email and/or password. Please try again.',
      });
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit(submitLogin)} className="login-form">
        <div className="login-form-inner">
          <h2 className="title">Login</h2>
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
          <input className="submitButton" type="submit" value="LOGIN" />
          <Link to="/register" className="to-register">
            Need an account? Register here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
