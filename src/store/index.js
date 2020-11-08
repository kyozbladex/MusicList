import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import combinedReducers from '../reducers';
import DevTools from '../components/shared/DevTools';
//import AuthenticationReducer from '../reducers/authentication';
//import ProgressReducer from '../reducers/progress';

/* const combinedReducers = combineReducers({
  progress: ProgressReducer,
  authentication: AuthenticationReducer,
}); */

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
  DevTools.instrument(),
);

export default function configureStore(initialState) {
  const store = createStore(combinedReducers, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    /* module.hot.accept('../reducers/progress', () =>
      store.replaceReducer(ProgressReducer), */
      module.hot.accept('../reducers', () =>
      store.replaceReducer(combinedReducers),
    );
  }

  return store;
}