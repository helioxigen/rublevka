import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions/list/load';

import * as types from 'cem/_client_leads/constants/actions';
import {
  getDefaultsByGroup,
  resourceName,
  apiPathByGroup,
} from 'cem/_client_leads/constants/defaults';
import { updatePagination } from 'core/actions/pagination';

// helpers
import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mapParams } from 'cem/_client_leads/helpers';
import { mergeParams } from 'core/fetcher2/helpers';

const loadLeads = (queryParams, group, options = {}) => (dispatch) => {
  dispatch(loadListStarted(types.LOAD_LIST, group));

  const apiPath = apiPathByGroup[group] || apiPathByGroup.default;
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

export default loadLeads;
