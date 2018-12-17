import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions/list/load';

import * as types from 'cem/_tasks/constants/actions';
import { getDefaultsByGroup, resourceName, apiPathByGroup } from 'cem/_tasks/constants/defaults';
import { updatePagination } from 'core/actions/pagination';
import loadUsers from 'cem/actions/_users/list/load';
// import loadClientLeads from 'cem/_client_leads/actions/list/load';
// import loadContacts from 'cem/_contacts/actions/list/load';
// import loadDeals from 'cem/_tasks/actions/list/load';

// helpers
import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mapParams } from 'cem/_tasks/helpers';
import { mergeParams } from 'core/fetcher2/helpers';

const groupForLinkedResources = 'forTasks';

import uniq from 'lodash/uniq';

const loadTasks = (queryParams, group, options) => (dispatch, getState) => {
  dispatch(loadListStarted(types.LOAD_LIST, group));

  const apiPath = apiPathByGroup[group] || apiPathByGroup.default;
  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = mapParams(recursiveCleanUp(mergeParams(defaultQueryParams, queryParams)));

  return loadList(apiPath, group, params).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_LIST_SUCCEEDED, group, items));

      // and then load linked resources
      const linkedUsersIds = uniq(
        items
          .filter(task => !getState()._users[task.responsibleUser.id])
          .map(task => task.responsibleUser.id)
          .filter(id => !!id),
      );
      // const linkedClientLeadsIds = items.filter(task => !getState()._client_leads[task.details.clientLeadId]).map(task => task.details.clientLeadId).filter(id => !!id);
      // const linkedContactsIds = items.filter(task => !getState()._contacts[task.details.contactId]).map(task => task.details.contactId).filter(id => !!id);
      // const linkedDealsIds = items.filter(task => !getState()._deals[task.details.dealId]).map(task => task.details.dealId).filter(id => !!id);

      if (linkedUsersIds.length) {
        dispatch(loadUsers({ id: linkedUsersIds }, groupForLinkedResources));
      } // TODO: fix loadUsers
      // if (linkedClientLeadsIds.length) dispatch(loadClientLeads({ filter: { id: linkedClientLeadsIds } }, groupForLinkedResources));
      // if (linkedContactsIds.length) dispatch(loadContacts({ filter: { id: linkedContactsIds } }, groupForLinkedResources));
      // if (linkedDealsIds.length) dispatch(loadDeals({ filter: { id: linkedDealsIds } }, groupForLinkedResources));

      return Promise.resolve(items);
    },
    (errors) => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadTasks;
