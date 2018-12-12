import { loadList, loadListStarted, loadListFailed, loadListSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/_contacts/constants/actions';
import { makeDefaultQueryParamsByGroup, resourceName } from 'cem/_contacts/constants/defaults';
import { updatePagination } from 'core/actions/pagination';

import { mapParams } from 'cem/_contacts/helpers';

export const loadContacts = (queryParams, group, options) => (dispatch) => {
  dispatch(loadListStarted(types.LOAD_LIST, group));
  const defaultQueryParamsByGroup = makeDefaultQueryParamsByGroup(group, options);

  const postfix = group === 'archive' ? '/archive' : '';

  return loadList(resourceName, group, { postfix, defaultQueryParamsByGroup }, mapParams(queryParams))
    .then(
      ({ items, pagination }) => {
        dispatch(updatePagination(`${resourceName}.${group}`, pagination));
        dispatch(loadListSucceeded(types.LOAD_LIST_SUCCEEDED, group, items));

        return Promise.resolve(items);
      }, (errors) => {
        dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

        return Promise.reject(errors);
      },
    );
};

export default loadContacts;
