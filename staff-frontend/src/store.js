import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: true,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? // eslint-disable-next-line
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);
export default store;
