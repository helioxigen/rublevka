import {
  loadLinkedList,
  loadLinkedListStarted,
  loadLinkedListFailed,
  loadLinkedListSucceeded,
} from 'core/fetcher/actions';

import { updatePagination } from 'core/actions/pagination';

import * as types from 'cem/constants/settings/exportPackages/actions';
import { resourceName } from 'cem/constants/settings/exportPackages/defaults';

const listName = 'errorLogs';

export default (id, queryParams = {}) => (dispatch) => {
  dispatch(loadLinkedListStarted(types.LOAD_PACKAGE_ERROR_LOGS, resourceName, id, listName));

  return loadLinkedList(resourceName, id, listName, queryParams).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${id}.${listName}`, pagination));
      dispatch(
        loadLinkedListSucceeded(
          types.LOAD_PACKAGE_ERROR_LOGS_SUCCEEDED,
          resourceName,
          id,
          listName,
          items,
        ),
      );

      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(
        loadLinkedListFailed(
          types.LOAD_PACKAGE_ERROR_LOGS_FAILED,
          resourceName,
          id,
          listName,
          errors,
        ),
      );

      return Promise.reject(errors);
    },
  );
};
