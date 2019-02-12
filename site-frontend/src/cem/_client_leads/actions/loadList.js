import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_client_leads/constants/actions';
import {
  getDefaultsByGroup,
  resourceName,
  apiPath,
} from 'cem/_client_leads/constants/defaults';

import { updatePagination } from 'core/actions/pagination';
import loadContacts from 'cem/_contacts/actions/loadList';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import isInState from 'core/helpers/isInState';
import { mergeParams } from 'core/fetcher2/helpers';
import { mapParams } from 'cem/_client_leads/helpers';
import transformInputValues from 'cem/_client_leads/helpers/transformInputValues';
import uniq from 'lodash/uniq';

const groupForLinkedResources = 'forClientLeads';

export default (queryParams, group, options = {}) => (dispatch, getState) => {
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

      const contactIds = uniq(
        transformedItems
          .map(clientLead => clientLead.contactId)
          .filter(id => !!id),
      ).filter(id => !isInState(getState(), '_contacts', id));

      if (contactIds.length) {
        dispatch(
          loadContacts({ filter: { id: contactIds } }, groupForLinkedResources),
        );
      }

      return Promise.resolve(transformedItems);
    },
    errors => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};
