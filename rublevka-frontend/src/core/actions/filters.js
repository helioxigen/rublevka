import { browserHistory } from 'react-router';
import * as types from 'core/constants/filters';
import sendAnalytics from './analytics';
import { pushQuery } from '../../helpers';

export const resetFilter = resource => ({
  type: types.CLEAR_FILTER,
  resource,
});

export const updateFilter = (resource, values, pushPath = '') => (
  dispatch,
  getState,
) => {
  dispatch(
    sendAnalytics(types.UPDATE_FILTER, {
      resource,
      values,
    }),
  );

  dispatch({
    type: types.UPDATE_FILTER,
    resource,
    values,
  });

  const {
    filters,
    routing: {
      locationBeforeTransitions: { pathname, query },
    },
  } = getState();

  const resourceFilter = filters[resource];

  if (resourceFilter) {
    const filter = encodeURIComponent(JSON.stringify(resourceFilter));

    pushQuery(pushPath || pathname, query, { filter });
  }
};

export const removeFilter = (resource, key, value) => ({
  type: types.REMOVE_FILTER,
  resource,
  key,
  value,
});

export const setFilter = (resource, values) => dispatch => {
  dispatch(
    sendAnalytics(types.UPDATE_FILTER, {
      resource,
      values,
    }),
  );

  dispatch({
    type: types.UPDATE_FILTER,
    resource,
    values,
  });
};

export default { resetFilter, updateFilter, removeFilter, setFilter };
