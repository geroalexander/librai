import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Register.css';
import { setRegister } from '../../Store/actions/auth';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const dispatch: AppDispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setRegister({ firstName, lastName, email, password }));
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={onClickSubmitLogin} className="login-form">
      <div className="form-inner">
        <h2 className="title">Register</h2>
        {/*ERROR*/}
        <div className="form-group">
          <label className="firstName">First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="firstName"
            id="firstName"
          />
        </div>
        <div className="form-group">
          <label className="lastName">Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="lastName"
          />
        </div>
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

export default Register;
