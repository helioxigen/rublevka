import * as types from 'core/constants/filters';
import sendAnalytics from './analytics';

export const resetFilter = resource => ({
  type: types.CLEAR_FILTER,
  resource,
});

export const updateFilter = (resource, values) => dispatch => {
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
