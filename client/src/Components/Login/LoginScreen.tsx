import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Login.css';
import { setLogin } from '../../Store/actions/auth';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('pams@hollywood.com');
  const [password, setPassword] = useState('password');

  const onClickSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // const action = setLogin()
    e.preventDefault();
    // console.log('e', e.target);
    dispatch(setLogin({ email, password }));

    // dispatch(action);
  };
  return (
    <form onSubmit={onClickSubmitLogin} className="login-form">
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
