import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './index';
import PrivateRoute from './Components/Routes/Private';
import {
  Dashboard,
  Profile,
  Saved,
  BookDetails,
  Login,
  Register,
  RegistrationForm,
  ErrorPage,
} from './Routes';
import BottomTabNavigation from './Components/BottomTab/BottomTab';
import ErrorMessage from './Components/Error/ErrorMessage';
import Header from './Components/Header/Header';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from 'react-device-detect';
import { setError } from './Store/actions/errors';

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const signedIn = useSelector(
    (state: RootState) => state.authReducer.signedIn
  );

  const fillForm = useSelector(
    (state: RootState) => state.authReducer.fillForm
  );
  const error = useSelector((state: RootState) => state.errorReducer.error);

  useEffect(() => {
    if (error) {
      if (error === "Couldn't load dashboard, please try again") {
        console.log(error);
      } else {
        setOpen(true);
      }
    }
  }, [error]);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)',
  });

  useEffect(() => {
    if (isMobile || isDesktop) {
      const visited = localStorage.getItem('visitedLibrai');
      if (!visited) {
        localStorage.setItem('visitedLibrai', 'true');
        const action = setError(
          'This app is optimised to be a PWA, download it to your Home Screen to get the full experience:'
        );
        dispatch(action);
      }
    }
  }, [isDesktop, dispatch]);

  return (
    <div className="App">
      <ErrorMessage message={error} open={open} setOpen={setOpen} />
      <Router>
        {isDesktop && signedIn && !fillForm && (
          <Header setIsLoading={() => {}} />
        )}
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
          <Route path="/error" exact component={ErrorPage}></Route>
          <Route path="/" component={ErrorPage} />
        </Switch>
        {signedIn && !fillForm && isMobile && <BottomTabNavigation />}
      </Router>
    </div>
  );
}

export default App;
