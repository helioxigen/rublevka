import * as types from './constants';

export const resetFilter = resource => ({
  type: types.RESET_FILTER,
  resource,
});

export const updateFilter = (resource, values) => (dispatch) => {
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
