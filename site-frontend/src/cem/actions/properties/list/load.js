import { API } from 'core/config/sources';

import { mapFilter } from '../helpers';

import { updatePagination } from 'core/actions/pagination';

import * as types from 'cem/constants/properties/actions';
import * as options from 'cem/constants/properties/options';

const loadPropertiesByCategoryStarted = (category, group, queryParams) => ({
  type: types.LOAD_PROPERTIES,
  category,
  group,
  queryParams,
});

const loadPropertiesByCategorySucceeded = (category, group, data) => (dispatch) => {
  dispatch(updatePagination(`properties.${category}.${group}`, data.pagination));

  return dispatch({
    type: types.LOAD_PROPERTIES_SUCCESS,
    category,
    group,
    ...data,
  });
};

const loadPropertiesByCategoryFailed = (category, group, errors) => ({
  type: types.LOAD_PROPERTIES_FAIL,
  category,
  group,
  errors,
});

export const loadPropertiesByCategory = (
  category = 'city',
  queryParams = { filter: {} },
  group = 'default',
) => (dispatch) => {
  dispatch(loadPropertiesByCategoryStarted(category, group, queryParams));

  const filter = mapFilter(queryParams.filter);

  return API.get(`/v1/properties/${category}`, { ...queryParams, filter }).then(
    ({ body }) => dispatch(loadPropertiesByCategorySucceeded(category, group, body)),
    ({ body }) => dispatch(loadPropertiesByCategoryFailed(category, group, body)),
  );
};

export const loadProperties = queryParams => (dispatch) => {
  options.categories.forEach(({ id: categoryId }) =>
    dispatch(loadPropertiesByCategory(categoryId, queryParams)),
  );
};
