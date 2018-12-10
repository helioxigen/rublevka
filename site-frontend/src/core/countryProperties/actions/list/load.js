import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'core/countryProperties/constants/actions';
import {
  getDefaultsByGroup,
  getApiPathByGroup,
  resourceName,
} from 'core/countryProperties/constants/defaults';
import { updatePagination } from 'core/actions/pagination';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mapParams } from 'core/countryProperties/helpers';
import { mergeParams } from 'core/fetcher2/helpers';

const loadProperties = (queryParams, group, options = {}) => (dispatch) => {
  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = mapParams(recursiveCleanUp(mergeParams(defaultQueryParams, queryParams)));

  const apiPath = getApiPathByGroup(group, options);

  dispatch(loadListStarted(types.LOAD_LIST, group, options.append, params));

  return loadList(apiPath, group, params).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_LIST_SUCCEEDED, group, items, options.append));

      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadProperties;
