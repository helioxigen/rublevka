import { API } from 'core/config/sources';

import { mapListFilter } from 'cem/helpers/deals';

import { updatePagination } from 'core/actions/pagination';
import { loadContacts } from 'cem/_contacts/old_actions/list';

import * as types from 'cem/constants/deals/actions';

import uniq from 'lodash/uniq';

const loadDealsStarted = (kind, appendResult) => ({
  type: types.LOAD_DEALS,
  kind,
  appendResult,
});

const loadDealsSucceeded = (kind, { items, pagination }, appendResult) => (
  dispatch,
  getState,
) => {
  const contactIds = uniq(
    items
      .map(({ contactDetails = {} }) =>
        contactDetails.id && !getState().contacts[contactDetails.id]
          ? contactDetails.id
          : undefined,
      )
      .filter(id => id),
  );

  if (contactIds.length) {
    dispatch(loadContacts({ filter: { id: contactIds } }));
  }

  dispatch(updatePagination(`deals.${kind}`, pagination));

  return dispatch({
    type: types.LOAD_DEALS_SUCCESS,
    kind,
    items,
    appendResult,
  });
};

const loadDealsFailed = (kind, { errors }) => ({
  type: types.LOAD_DEALS_FAIL,
  kind,
  errors,
});

const loadDeals = (
  kind,
  queryParams = {},
  appendResult = false,
) => dispatch => {
  dispatch(loadDealsStarted(kind, queryParams, appendResult));

  const { filter, filterNot } = mapListFilter(queryParams.filter, kind);
  const orderBy = { 'details.multiCurrencyAgentFee.usd': 'desc' };

  return API.get('/v1/deals', {
    ...queryParams,
    filter,
    filterNot,
    orderBy,
  }).then(
    ({ body }) => dispatch(loadDealsSucceeded(kind, body, appendResult)),
    ({ body }) => dispatch(loadDealsFailed(kind, body)),
  );
};

export default loadDeals;
