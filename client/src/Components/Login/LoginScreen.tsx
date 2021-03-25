import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Login.css';
import { setLogin } from '../../Store/actions/auth';
import LockIcon from '@material-ui/icons/Lock';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLogin({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={onClickSubmitLogin} className="login-form">
      <div className="form-inner">
        <h2 className="title">Login</h2>
        {/*ERROR*/}
        <div className="form-group">
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
          <LockIcon style={{ color: '#fffef9' }}></LockIcon>
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
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
