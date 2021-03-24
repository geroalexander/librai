import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

<<<<<<< HEAD
import { Dashboard, Profile, Saved, BookDetails, Login } from './Routes';
=======
import { Dashboard, Profile, Saved, BookDetails } from './Routes';
import BottomTabNavigation from './Components/BottomTab/BottomTab';
>>>>>>> ea3684f4fa93199d6ee9b18074fe333c2f4bc025

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          {/* <Route path="/profile" exact component={Profile}></Route> */}
          <Route path="/saved" exact component={Saved}></Route>
          {/* <Route path="/details/:id" exact component={BookDetails}></Route> */}
          <Route path="/register" exact component={Dashboard}></Route>
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
