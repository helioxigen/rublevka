import { loadList, loadListStarted, loadListFailed, loadListSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/constants/settings/exportPackages/actions';
import {
  defaultQueryParamsByGroup,
  resourceName,
} from 'cem/constants/settings/exportPackages/defaults';
import { updatePagination } from 'core/actions/pagination';

const loadPackages = (queryParams, group) => (dispatch) => {
  dispatch(loadListStarted(types.LOAD_PACKAGES, group));

  return loadList(
    resourceName,
    group,
    { defaultQueryParamsByGroup },
    { ...queryParams, orderBy: { id: 'asc' } },
  ).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_PACKAGES_SUCCEEDED, group, items));

      return items;
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_PACKAGES_FAILED, group, errors));

      return errors;
    },
  );
};

export default loadPackages;
