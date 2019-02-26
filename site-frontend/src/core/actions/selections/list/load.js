import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher/actions';

import * as types from 'core/constants/selections/actions';
import { defaultQueryParamsByGroup } from 'core/constants/selections/defaults';
import { updatePagination } from 'core/actions/pagination';

const resource = 'selections';
const group = 'all';

const loadSelections = queryParams => dispatch => {
  dispatch(loadListStarted(types.LOAD_SELECTIONS, group));

  return loadList(
    resource,
    group,
    { defaultQueryParamsByGroup },
    { ...queryParams },
  ).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resource}.${group}`, pagination));
      dispatch(
        loadListSucceeded(types.LOAD_SELECTIONS_SUCCEEDED, group, items),
      );

      return Promise.resolve(items);
    },
    errors => {
      dispatch(loadListFailed(types.LOAD_SELECTIONS_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadSelections;
