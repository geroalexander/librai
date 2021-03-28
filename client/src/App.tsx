import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './index';
import PrivateRoute from './Components/Routes/Private';
import AuthRoute from './Components/Routes/Auth';
import {
  Dashboard,
  Profile,
  Saved,
  BookDetails,
  Login,
  Register,
  RegistrationForm,
} from './Routes';
import BottomTabNavigation from './Components/BottomTab/BottomTab';
import Header from './Components/Header/Header';
import { useMediaQuery } from 'react-responsive';
import {
  isDesktop,
  isTablet,
  isMobile
} from "react-device-detect";

function App() {
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );

  const fillForm = useSelector(
    (state: RootState) => state.authReducer.fillForm
  );


  return (
    <div className="App">
      <Router>
        {!isMobile && !isTablet && signedIn && !fillForm && <Header setIsLoading={()=>{}}/> }
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>
          <PrivateRoute
            path="/profile"
            exact
            component={Profile}
          ></PrivateRoute>
          <PrivateRoute path="/saved" exact component={Saved}></PrivateRoute>
          <PrivateRoute
            path="/details/:id"
            exact
            component={BookDetails}
          ></PrivateRoute>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/form" exact component={RegistrationForm}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
        {signedIn && !fillForm && isMobile && <BottomTabNavigation />}
      </Router>
    </div>
  );
}

export default App;
