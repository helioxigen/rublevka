import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_tasks/constants/actions';
import {
  getDefaultsByGroup,
  apiPath,
  resourceName,
} from 'cem/_tasks/constants/defaults';

import { updatePagination } from 'core/actions/pagination';
import loadUsers from 'cem/_users/actions/loadList';
import loadClientLeads from 'cem/_client_leads/actions/loadList';
import loadContacts from 'cem/_contacts/actions/loadList';
import loadDeals from 'cem/_deals/actions/loadList';

import uniq from 'lodash/uniq';
import { mergeParams } from 'core/fetcher2/helpers';
import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import isInState from 'core/helpers/isInState';
import { mapParams, getDetails } from 'cem/_tasks/helpers';
import transformInputValues from 'cem/_tasks/helpers/transformInputValues';

const groupForLinkedResources = 'forTasks';

const loadTasks = (queryParams, group, options = {}) => (
  dispatch,
  getState,
) => {
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

      // and then load linked resources
      const linkedUsersIds = uniq(
        transformedItems
          .map(task => task.responsibleUser.id)
          .filter(id => !!id),
      ).filter(id => !isInState(getState(), '_users', id));
      const linkedClientLeadsIds = uniq(
        transformedItems
          .map(task => getDetails(task).clientLeadId)
          .filter(id => !!id),
      ).filter(id => !isInState(getState(), '_clientLeads', id));
      const linkedContactsIds = uniq(
        transformedItems
          .map(task => getDetails(task).contactId)
          .filter(id => !!id),
      ).filter(id => !isInState(getState(), '_contacts', id));
      const linkedDealsIds = uniq(
        transformedItems
          .map(task => getDetails(task).dealId)
          .filter(id => !!id),
      ).filter(id => !isInState(getState(), '_deals', id));

      if (linkedUsersIds.length) {
        dispatch(loadUsers({ id: linkedUsersIds }, groupForLinkedResources));
      } // TODO: fix loadUsers
      if (linkedClientLeadsIds.length) {
        dispatch(
          loadClientLeads(
            { filter: { id: linkedClientLeadsIds } },
            groupForLinkedResources,
          ),
        );
      }
      if (linkedContactsIds.length) {
        dispatch(
          loadContacts(
            { filter: { id: linkedContactsIds } },
            groupForLinkedResources,
          ),
        );
      }
      if (linkedDealsIds.length) {
        dispatch(
          loadDeals(
            { filter: { id: linkedDealsIds } },
            groupForLinkedResources,
          ),
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

export default loadTasks;
