import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from '../../jq-redux-api/actions';

import * as types from '../constants/actions';
import {
  getDefaultsByGroup,
  getApiPathByGroup,
  resourceName,
} from '../constants/defaults';
import { updatePagination } from '../../pagination/actions';

import { recursiveCleanUp, mergeParams } from '../../jq-redux-api/helpers';
import { mapParams } from '../helpers';

const loadProperties = (queryParams, group, options = {}) => (dispatch) => {
  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = recursiveCleanUp(
    mapParams(mergeParams(defaultQueryParams, queryParams)),
  );

  const apiPath = getApiPathByGroup(group, options);

  dispatch(loadListStarted(types.LOAD_LIST, group, options.append, params));

  return loadList(apiPath, group, params).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(
        loadListSucceeded(
          types.LOAD_LIST_SUCCEEDED,
          group,
          items,
          options.append,
        ),
      );
      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadProperties;
