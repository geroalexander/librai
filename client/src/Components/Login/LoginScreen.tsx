import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Login.css';
import { setLogin } from '../../Store/actions/auth';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { useHistory } from 'react-router-dom';

const Login: React.FC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLogin({ email, password }))
      .then(() => {
        setEmail('');
        setPassword('');
        history.push('/');
      })
      .catch((err) => console.log('catch', err));
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
      </div>
    </form>
  );
};

export default Login;
