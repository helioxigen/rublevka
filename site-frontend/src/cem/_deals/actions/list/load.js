import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions/list/load';

import * as types from 'cem/_deals/constants/actions';
import {
  getDefaultsByGroup,
  resourceName,
  apiPathByGroup,
} from 'cem/_deals/constants/defaults';
import { updatePagination } from 'core/actions/pagination';
import loadContacts from 'cem/_contacts/actions/list/load';

// helpers
import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mapParams } from 'cem/_deals/helpers';
import { mergeParams } from 'core/fetcher2/helpers';

const groupForLinkedResources = 'forDeals';

const loadDeals = (queryParams, group, options = {}) => (
  dispatch,
  getState,
) => {
  dispatch(loadListStarted(types.LOAD_LIST, group));

  const apiPath = apiPathByGroup[group] || apiPathByGroup.default;
  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = mapParams(
    recursiveCleanUp(mergeParams(defaultQueryParams, queryParams)),
  );

  return loadList(apiPath, group, params).then(
    ({ items, pagination }) => {
      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(loadListSucceeded(types.LOAD_LIST_SUCCEEDED, group, items));

      // and then load linked contacts
      const linkedContactsIds = items
        .filter(deal => !getState()._contacts[deal.contactDetails.id])
        .map(deal => deal.contactDetails.id)
        .filter(id => !!id); // is existed

      if (linkedContactsIds.length) {
        dispatch(
          loadContacts(
            { filter: { id: linkedContactsIds } },
            groupForLinkedResources,
          ),
        );
      }

      return Promise.resolve(items);
    },
    errors => {
      dispatch(loadListFailed(types.LOAD_LIST_FAILED, group, errors));

      return Promise.reject(errors);
    },
  );
};

export default loadDeals;
