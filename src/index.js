import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider, useSelector} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

function AuthIsLoaded({children}) {
  const auth = useSelector(state => state.auth)
  if (auth && auth.authStatus === 0) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return children
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthIsLoaded>
        <App/>
      </AuthIsLoaded>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
