import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../..';
import './Register.css';
import { setRegister } from '../../Store/actions/auth';
import { Link, withRouter, useHistory } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { useForm } from 'react-hook-form';

const Register: React.FC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const { register, handleSubmit, errors, reset, setError } = useForm({
    defaultValues,
  });

  const submitRegister = async (data: typeof defaultValues) => {
    const action = setRegister(data);
    const register = await dispatch(action);
    if (!register.error) {
      reset();
      history.push('/form');
    } else if (register.error === 'This user already exists') {
      setError('password', {
        type: 'manual',
        message: 'This e-mail already exists',
      });
    } else {
      setError('password', {
        type: 'manual',
        message: 'Something went wrong, please try again.',
      });
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit(submitRegister)} className="register-form">
        <div className="form-inner">
          <h2 className="title">Register</h2>
          {/*ERROR*/}
          <div className="form-group">
            <div className="icon">
              <PersonOutlineIcon
                style={{ color: '#fffef9' }}
              ></PersonOutlineIcon>
            </div>
            <input
              className="input"
              type="text"
              name="firstName"
              placeholder="FIRST NAME"
              id="firstName"
              ref={register({
                // required: 'Please enter your first name.',
              })}
            />
          </div>
          {errors.firstName && (
            <span role="alert">{errors.firstName.message}</span>
          )}
          <div className="form-group">
            <div className="icon">
              <PersonIcon style={{ color: '#fffef9' }}></PersonIcon>
            </div>
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="LAST NAME"
              id="lastName"
              ref={register({
                // required: 'Please enter your last name.',
              })}
            />
          </div>
          {errors.lastName && (
            <span role="alert">{errors.lastName.message}</span>
          )}
          <div className="form-group">
            <div className="icon">
              <EmailIcon style={{ color: '#fffef9' }}></EmailIcon>
            </div>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="EMAIL"
              id="email"
              ref={register({
                // required: 'Please enter an email address',
                // pattern: {
                //   value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                //   message: 'Please enter a valid e-mail address.',
                // },
              })}
            />
          </div>
          {errors.email && <span role="alert">{errors.email.message}</span>}
          <div className="form-group">
            <div className="icon">
              <LockIcon style={{ color: '#fffef9' }}></LockIcon>
            </div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
              ref={register({
                // required: 'Please enter a password.',
                // minLength: {
                //   value: 5,
                //   message: 'Minimum password length is 5',
                // },
              })}
            />
          </div>
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
          <input className="submitButton" type="submit" value="SIGN UP" />
          <Link to="/login" className="to-login">
            Already have an account? Click here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Register);
