import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_newsletters/constants/actions';
import { apiPath, defaultQueryParamsByGroup } from 'cem/_newsletters/constants/defaults';
import { updatePagination } from 'core/actions/pagination';

const resource = 'newsletters';
const group = 'all';

const loadnewsletters = queryParams => (dispatch) => {
  dispatch(loadListStarted(types.LOAD_NEWSLETTERS, group));

  return loadList(apiPath, group, { defaultQueryParamsByGroup }, { ...queryParams }).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resource}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_NEWSLETTERS_SUCCEEDED, group, items));

      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_NEWSLETTERS_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadnewsletters;
