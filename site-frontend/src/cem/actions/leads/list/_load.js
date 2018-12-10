import { API } from 'core/config/sources';

import { mapListFilter } from 'cem/helpers/leads';

import { updatePagination } from 'core/actions/pagination';

import * as types from 'cem/constants/leads/actions';

const loadLeadsStarted = (kind, appendResult) => ({
  type: types._LOAD_LEADS,
  kind,
  appendResult,
});

const loadLeadsSucceeded = (kind, { items, pagination }, appendResult) => (dispatch) => {
  dispatch(updatePagination(`leads.${kind}`, pagination));

  return dispatch({
    type: types._LOAD_LEADS_SUCCESS,
    kind,
    items,
    appendResult,
  });
};

const loadLeadsFailed = (kind, { errors }) => ({
  type: types._LOAD_LEADS_FAIL,
  kind,
  errors,
});

const loadLeads = (kind, queryParams = {}, appendResult = false) => (dispatch) => {
  dispatch(loadLeadsStarted(kind, queryParams, appendResult));

  const { filter, filterNot } = mapListFilter(queryParams.filter, kind);
  const orderBy = { createdAt: 'desc' };

  return API.get('/v1/client_leads', { ...queryParams, filter, filterNot, orderBy }).then(
    ({ body }) => dispatch(loadLeadsSucceeded(kind, body, appendResult)),
    ({ body }) => dispatch(loadLeadsFailed(kind, body)),
  );
};

export default loadLeads;
