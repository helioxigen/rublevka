import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/_properties/actions';
import { defaultQueryParamsByGroup } from 'cem/constants/_properties/defaults';
import { updatePagination } from 'core/actions/pagination';

const loadProperties = (queryParams, group, resource) => dispatch => {
  dispatch(loadListStarted(types.LOAD_PROPERTIES, group));

  return loadList(
    resource,
    group,
    { defaultQueryParamsByGroup },
    { ...queryParams },
  ).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resource}.${group}`, pagination));
      dispatch(
        loadListSucceeded(types.LOAD_PROPERTIES_SUCCEEDED, group, items),
      );

      return items;
    },
    errors => {
      dispatch(loadListFailed(types.LOAD_PROPERTIES_FAILED, group, errors));

      return errors;
    },
  );
};

const loadPropertiesByCategory = (queryParams, group, category) => dispatch =>
  dispatch(loadProperties(queryParams, group, `${category}Properties`));

export default loadPropertiesByCategory;
