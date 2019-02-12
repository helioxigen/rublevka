import { combineReducers } from 'redux';

import { browserHistory } from 'react-router';

import { createLogger } from 'redux-logger';
import { createTracker } from 'redux-segment';

// enhancers
export { autoRehydrate } from 'redux-persist';

// reducers
import filters from 'core/reducers/filters';
import pagination from 'core/reducers/pagination';
import order from 'core/reducers/order';

import countryProperties from 'core/countryProperties/reducers';
import cityProperties from 'core/cityProperties/reducers';
import settlements from 'core/settlements/reducers';
import currentDuty from 'site/currentDuty/reducer';
import complexes from 'core/complexes/reducers';
import complexBuildings from 'core/complexBuildings/reducers';
import users from 'core/users/reducers';
import places from 'core/places/reducers';
import displayOptions from 'site/displayOptions/reducer';
import selections from 'core/selections/reducers';
import stats from 'core/stats/reducers';
import subLocalities from 'core/subLocalities/reducers';

import {
  routerReducer as routing,
  routerMiddleware as createRouter,
} from 'react-router-redux';

// fuck redux-form
import { reducer as formReducer } from 'redux-form';
import normalizers from 'site/normalizers';
const form = formReducer.normalize(normalizers);

export const reducer = combineReducers({
  form, // deprecated

  displayOptions,
  routing,

  countryProperties,
  cityProperties,

  places,
  settlements,
  complexes,
  complexBuildings,
  selections,
  subLocalities,

  currentDuty,
  users,

  filters,
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
