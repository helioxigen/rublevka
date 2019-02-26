import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_users/constants/actions';
import {
  getDefaultsByGroup,
  resourceName,
  apiPath,
} from 'cem/_users/constants/defaults';
import { updatePagination } from 'core/actions/pagination';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mergeParams } from 'core/fetcher2/helpers';
import { mapParams } from 'cem/_users/helpers';
import transformInputValues from 'cem/_users/helpers/transformInputValues';

const loadUsers = (queryParams, group, options = {}) => dispatch => {
  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = mapParams(
    recursiveCleanUp(mergeParams(defaultQueryParams, queryParams)),
  );

  dispatch(loadListStarted(types.LOAD_LIST, group, options.append, params));

  return loadList(apiPath, group, params).then(
    ({ items, pagination }) => {
      const transformedItems = items.map(transformInputValues);

      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(
        loadListSucceeded(
          types.LOAD_LIST_SUCCEEDED,
          group,
          transformedItems,
          options.append,
        ),
      );

      return Promise.resolve(transformedItems);
    },
    errors => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadUsers;
