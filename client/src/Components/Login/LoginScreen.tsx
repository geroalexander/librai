import * as React from 'react';
import './Login.css';

const Login: React.FC = () => {
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
