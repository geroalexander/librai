import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Register.css';
import { setRegister } from '../../Store/actions/auth';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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
          <div className="icon">
            <PersonOutlineIcon style={{ color: '#fffef9' }}></PersonOutlineIcon>
          </div>
          <input
            className="input"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="firstName"
            placeholder="FIRST NAME"
            id="firstName"
          />
        </div>
        <div className="form-group">
          <div className="icon">
            <PersonIcon style={{ color: '#fffef9' }}></PersonIcon>
          </div>
          <input
            className="input"
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            placeholder="LAST NAME"
            id="lastName"
          />
        </div>
        <div className="form-group">
          <div className="icon">
            <EmailIcon style={{ color: '#fffef9' }}></EmailIcon>
          </div>
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
          <div className="icon">
            <LockIcon style={{ color: '#fffef9' }}></LockIcon>
          </div>
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="PASSWORD"
            id="password"
          />
        </div>
        <input className="submitButton" type="submit" value="SIGN UP" />
        <a href="" className="to-login">
          Already have an account? Click here!
        </a>
      </div>
    </form>
  );
};

export default Register;
