import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'core/complexBuildings/constants/actions';
import {
  getDefaultsByGroup,
  resourceName,
  apiPath,
} from 'core/complexBuildings/constants/defaults';
import { updatePagination } from 'core/actions/pagination';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mapParams } from 'core/complexBuildings/helpers';
import { mergeParams } from 'core/fetcher2/helpers';

const loadComplexBuildings = (queryParams, group, options) => (dispatch) => {
  dispatch(loadListStarted(types.LOAD_LIST, group));

  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = mapParams(recursiveCleanUp(mergeParams(defaultQueryParams, queryParams)));

  return loadList(apiPath, group, params).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_LIST_SUCCEEDED, group, items));

      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadComplexBuildings;
