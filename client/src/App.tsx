import React from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Store/reducers/index';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = applyMiddleware(ReduxThunk, logger);
const store = createStore(reducers, middleware);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Welcome to Librai team!</h1>
      </div>
    </Provider>
  );
}

export default App;
