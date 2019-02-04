import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? // eslint-disable-next-line
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);
export default store;
