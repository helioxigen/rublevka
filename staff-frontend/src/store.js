import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: true,
});

// eslint-disable-next-line no-underscore-dangle
const windowReduxDevtoolsExt = window.__REDUX_DEVTOOLS_EXTENSION__;

const devtool = windowReduxDevtoolsExt ? windowReduxDevtoolsExt() : f => f;

export const store = createStore(
  rootReducer,
  compose(
    autoRehydrate(),
    applyMiddleware(thunk, logger),
    devtool,
  ),
);

export default { store };
