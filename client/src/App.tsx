import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";

import { Dashboard, Profile, Saved, BookDetails } from './Routes';

function App() {
  return (
      <div className="App">
        <Router>
          <h1>Welcome to Librai team!</h1>

          <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/saved" exact component={Saved}></Route>
            <Route path="/details/:id" exact component={BookDetails}></Route>
            <Route path="/register" exact component={Dashboard}></Route>
            <Route path="/login" exact component={Dashboard}></Route>
            <Route path="/form" exact component={Dashboard}></Route>
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
