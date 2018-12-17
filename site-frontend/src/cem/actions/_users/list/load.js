import { loadList, loadListStarted, loadListFailed, loadListSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/constants/_users/actions';
import { defaultQueryParamsByGroup } from 'cem/constants/_users/defaults';
import { updatePagination } from 'core/actions/pagination';

const mapFilters = (filter = {}) => ({
  ...filter,
  lastName: filter.lastName ? `${filter.lastName}*` : undefined,
});

const resource = 'users';

const loadUsers = (queryParams, group) => (dispatch) => {
  dispatch(loadListStarted(types.LOAD_USERS, group));

  return loadList(
    resource,
    group,
    { defaultQueryParamsByGroup },
    { ...queryParams, filter: mapFilters(queryParams.filter) },
  ).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resource}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_USERS_SUCCEEDED, group, items));

      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_USERS_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadUsers;
