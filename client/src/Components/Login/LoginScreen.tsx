import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
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

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = await setLogin({ email, password });
    dispatch(action);
    setEmail('');
    setPassword('');
    history.push('/');
  };

  return (
    <form onSubmit={onClickSubmitLogin} className="login-form">
      <div className="form-inner">
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
        <Link to="/register" className="to-login">
          Need an account? Register here!
        </Link>
      </div>
    </form>
  );
};

export default withRouter(Login);
