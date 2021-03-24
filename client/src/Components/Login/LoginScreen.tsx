import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch } from '../..';
import './Login.css';
import { setLogin } from '../../Store/actions/auth';

const Login: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(setLogin({ email, password }));
  };
  return (
    <form onSubmit={onClickSubmitLogin} className="login-form">
      <div className="form-inner">
        <h2 className="title">Login</h2>
        {/*ERROR*/}
        <div className="form-group">
          <label className="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label className="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <input type="submit" value="LOGIN" />
      </div>
    </form>
  );
};

export default Login;
