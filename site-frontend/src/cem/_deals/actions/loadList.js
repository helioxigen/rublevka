import {
  loadList,
  loadListStarted,
  loadListFailed,
  loadListSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_deals/constants/actions';
import {
  getDefaultsByGroup,
  resourceName,
  apiPath,
} from 'cem/_deals/constants/defaults';
import { updatePagination } from 'core/actions/pagination';
import loadContacts from 'cem/_contacts/actions/loadList';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import isInState from 'core/helpers/isInState';
import { mergeParams } from 'core/fetcher2/helpers';
import { mapParams } from 'cem/_deals/helpers';
// import transformInputValues from 'cem/_deals/helpers/transformInputValues';
import uniq from 'lodash/uniq';

const groupForLinkedResources = 'forDeals';

const loadDeals = (queryParams, group, options = {}) => (
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
      // const transformedItems = items.map(transformInputValues);
      const transformedItems = items;

      dispatch(updatePagination(`${resourceName}.${group}`, pagination));
      dispatch(
        loadListSucceeded(
          types.LOAD_LIST_SUCCEEDED,
          group,
          transformedItems,
          options.append,
        ),
      );

      const linkedContactsIds = uniq(
        transformedItems.map(deal => deal.contactDetails.id).filter(id => !!id),
      ).filter(id => isInState(getState(), '_contacts', id));

      if (linkedContactsIds.length) {
        dispatch(
          loadContacts(
            { filter: { id: linkedContactsIds } },
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

export default loadDeals;
