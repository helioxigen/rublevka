// our god
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// middlewares
import thunk from 'redux-thunk';
import { createTracker } from 'redux-segment';

// utils
import { autoRehydrate } from 'redux-persist';

// 3rd-party reducers
// import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'redux-simple-router';

import localReducers from 'cem/reducers';
import fetcherReducer from 'core/reducers/fetcher';
import filtersReducer from 'core/reducers/filters';
import paginationReducer from 'core/reducers/pagination';
import orderReducer from 'core/reducers/order';
import selectionsReducer from 'core/reducers/selections';
import properties from 'cem/_contacts/reducers/properties';

// works fine
import _tasks from 'cem/_tasks/reducers';
import _clientLeads from 'cem/_client_leads/reducers';
import _deals from 'cem/_deals/reducers';
import _contacts from 'cem/_contacts/reducers/contacts';
import _users from 'cem/_users/reducer';
import _dictionaries from 'cem/_dictionaries/reducer';

import _complexes from 'core/complexes/reducers'; // TODO: move to /reducer.js
import _settlements from 'core/settlements/reducers'; // TODO: move to /reducer.js
import _complexBuildings from 'core/complexBuildings/reducers'; // TODO: move to /reducer.js
import _cityProperties from 'core/cityProperties/reducers'; // TODO: move to /reducer.js
import _reports from 'cem/_reports/reducer';
import newsletters from 'cem/_newsletters/reducer';

// normalization
import normalizators from 'cem/normalization';

const reducers = {
  ...localReducers,
  fetcher: fetcherReducer,
  filters: filtersReducer,
  pagination: paginationReducer,
  order: orderReducer,
  form: formReducer.normalize(normalizators),
  routing: routeReducer,
  selections: selectionsReducer,
  propertiesForContacts: properties,

  _tasks,
  _clientLeads,
  _contacts,
  _deals,
  _complexes,
  _settlements,
  _complexBuildings,
  _cityProperties,
  _users,
  _dictionaries,
  newsletters,
  _reports,
};

// const logger = createLogger({
//   logErrors: false,
//   collapsed: true,
//   duration: false,
//   colors: {
//     prevState: () => '#9E9E9E',
//     action: () => '#03A9F4',
//     nextState: () => '#4CAF50',
//     error: () => '#F20404',
//     title: ({ type }) => {
//       if (type.indexOf('DEPRECATED') > -1) return 'grey';
//
//       if (type.indexOf('started') > -1) return 'orange';
//       if (type.indexOf('failed') > -1) return '#F20404';
//       if (type.indexOf('succeeded') > -1) return '#4CAF50';
//       if (type.indexOf('update') > -1) return '#03A9F4';
//
//       return 'inherit';
//     },
//   },
// });

const tracker = createTracker();
const reducer = combineReducers(reducers);
const middlewares = [thunk, tracker];

const store = compose(
  autoRehydrate(),
  applyMiddleware(...middlewares),
  typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' &&
    process.env.APP_ENV === 'development'
    ? window.devToolsExtension()
    : fn => fn,
)(createStore)(reducer);

export const { getState, dispatch } = store;
export default store;
