import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../..';
import './Login.css';
import { setLogin } from '../../Store/actions/auth';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import {
  Link,
  RouteComponentProps,
  withRouter,
  useHistory,
} from 'react-router-dom';
import { RootState } from '../../index';
import { useForm, NestedValue } from 'react-hook-form';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );
  const { register, handleSubmit, errors, reset } = useForm();
  // e: React.FormEvent<HTMLFormElement>,

  const onClickSubmitLogin = async (data: NestedValue<{
    email: string;
    password: string;
  }>): void => {
    // e.preventDefault();
    const {email, password} = data;
    const action = setLogin({ email, password });

    let response = await dispatch(action);
    console.log(response);

    if (response.accesToken) {
      // setEmail('');
      // setPassword('');
      history.push('/');
    } else {
      // this can be changed to something fancy
      // alert('Invalid email and/or password. Please try again.')
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit(onClickSubmitLogin)} className="login-form">
        <div className="login-form-inner">
          <h2 className="title">Login</h2>
          {/*ERROR*/}
          <div className="form-group">
            <div className="icon">
              <EmailIcon style={{ color: '#fffef9' }}></EmailIcon>
            </div>
            <input
              className="input"
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
              type="text"
              name="email"
              placeholder="EMAIL"
              id="email"
              ref={register({
                required: 'Please enter a valid e-mail address.',
                // pattern: {
                //   value: /S+@S+.S+/,
                //   message: 'Please enter a valid e-mail address.',
                // },
              })}
            />
          </div>
          {errors.email && (
            <span role="alert">{errors.email.message}</span>
          )}
          <div className="form-group">
            <div className="icon">
              <LockIcon style={{ color: '#fffef9' }}></LockIcon>
            </div>
            <input
              className="input"
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
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
