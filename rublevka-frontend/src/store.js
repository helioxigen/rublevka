import { combineReducers } from 'redux';

import { browserHistory } from 'react-router';

import { createLogger } from 'redux-logger';
import { createTracker } from 'redux-segment';

import {
  routerReducer as routing,
  routerMiddleware as createRouter,
} from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

// reducers
import filters from 'core/reducers/filters';
import favorites from 'core/reducers/favorites';
import pagination from 'core/reducers/pagination';
import order from 'core/reducers/order';

import countryProperties from 'core/countryProperties/reducers';
import settlements from 'core/settlements/reducers';
import users from 'core/users/reducers';
import places from 'core/places/reducers';
import selections from 'core/selections/reducers';
import stats from 'core/stats/reducers';
import subLocalities from 'core/subLocalities/reducers';

import currentDuty from './currentDuty/reducer';
import displayOptions from './displayOptions/reducer';

import normalizers from './normalizers';

// enhancers
const form = formReducer.normalize(normalizers);

export { autoRehydrate } from 'redux-persist';

export const reducer = combineReducers({
  form, // deprecated

  displayOptions,
  routing,

  countryProperties,

  places,
  settlements,
  selections,
  subLocalities,

  currentDuty,
  users,

  filters,
  favorites,
  order,
  pagination,
  stats,
});

export const tracker = createTracker();

export const logger = createLogger({
  collapsed: true,
  duration: true,
  predicate: () => process.env.NODE_ENV !== 'production',
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

export const router = createRouter(browserHistory);
