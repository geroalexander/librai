import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

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
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          {/* <Route path="/profile" exact component={Profile}></Route> */}
          <Route path="/saved" exact component={Saved}></Route>
          {/* <Route path="/details/:id" exact component={BookDetails}></Route> */}
          <Route path="/register" exact component={Register}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/form" exact component={Dashboard}></Route>
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
        <BottomTabNavigation />
      </Router>
    </div>
  );
}

export default App;
