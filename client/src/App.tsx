import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
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
} from './Routes';
import BottomTabNavigation from './Components/BottomTab/BottomTab';

function App() {
  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/profile" exact component={Profile}></Route>
          <Route path="/saved" exact component={Saved}></Route>
          <Route path="/details/:id" exact component={BookDetails}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/form" exact component={Dashboard}></Route>
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
        {signedIn && <BottomTabNavigation />}
      </Router>
    </div>
  );
}

export default App;
