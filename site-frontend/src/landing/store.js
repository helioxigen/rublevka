import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// middlewares
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createTracker } from 'redux-segment';

// reducers
import filters from 'core/reducers/filters';
import pagination from 'core/reducers/pagination';
import order from 'core/reducers/order';

import countryProperties from 'core/countryProperties/reducers';
import settlements from 'core/settlements/reducers';
// import retargeting from 'site/retargeting/reducer';
// import stats from 'core/stats/reducers';

export const reducer = combineReducers({
  // retargeting,

  countryProperties,
  settlements,

  filters,
  order,
  pagination,
  // stats,
});

const tracker = createTracker();

const logger = createLogger({
  collapsed: true,
  duration: true,
  colors: {
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
    title: ({ type }) => {
      if (type.indexOf('started') > -1) return 'orange';
      if (type.indexOf('failed') > -1) return '#F20404';
      if (type.indexOf('succeeded') > -1) return '#4CAF50';
      if (type.indexOf('update') > -1) return '#03A9F4';

      return 'inherit';
    },
  },
});

const store = compose(
  applyMiddleware(thunk, logger, tracker),
  typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' &&
    process.env.APP_ENV === 'development'
    ? window.devToolsExtension()
    : fn => fn,
)(createStore)(reducer);

export default store;
