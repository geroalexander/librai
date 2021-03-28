import React, {useEffect, useState} from 'react';
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
import { setLogout } from '../../Store/actions/auth';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );

  useEffect(() => {
    if (signedIn) dispatch(setLogout());
  }, [])

  const onClickSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = setLogin({ email, password });
    await dispatch(action);
    setEmail('');
    setPassword('');
    history.push('/');
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={onClickSubmitLogin} className="login-form">
        <div className="login-form-inner">
          <h2 className="title">Login</h2>
          {/*ERROR*/}
          <div className="form-group">
            <div className="icon">
              <EmailIcon style={{ color: '#fffef9' }}></EmailIcon>
            </div>
            <input
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              value={password}
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
            />
          </div>
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
