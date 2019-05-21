import { RESET_SORTING, UPDATE_SORTING, REMOVE_SORTING } from './constants';

export const resetSorting = resource => ({
  type: RESET_SORTING,
  resource,
});

export const updateSorting = (resource, values) => (dispatch) => {
  dispatch({
    type: UPDATE_SORTING,
    resource,
    values,
  });
};

export const removeSorting = (resource, key, value) => ({
  type: REMOVE_SORTING,
  resource,
  key,
  value,
});
