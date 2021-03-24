import { Key } from 'node:readline';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Login.css';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const onSubmitLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <form className="login-form">
      <div className="form-inner">
        <h2 className="title">Login</h2>
        {/*ERROR*/}
        <div className="form-group">
          <label className="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className="form-group">
          <label className="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <input type="submit" value="LOGIN" />
      </div>
    </form>
  );
};

export default Login;
