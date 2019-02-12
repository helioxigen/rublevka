import { API } from 'core/config/sources';

import * as types from 'cem/constants/companies/actions';

const loadLinkedContactsStarted = companyId => ({
  type: types.LOAD_LINKED_CONTACTS,
  companyId,
});

const loadLinkedContactsSucceeded = (companyId, { items }) => ({
  type: types.LOAD_LINKED_CONTACTS_SUCCESS,
  companyId,
  items,
});

const loadLinkedContactsFailed = (companyId, errors) => ({
  type: types.LOAD_LINKED_CONTACTS_FAIL,
  companyId,
  errors,
});

export default (companyId, queryParams = { filter: {} }) => dispatch => {
  dispatch(loadLinkedContactsStarted(companyId));

  const query = {
    ...queryParams,
    filter: {
      ...queryParams.filter,
      'companyDetails.companyId': companyId,
    },
  };

  return API.get('/v1/contacts', query).then(
    ({ body }) => {
      dispatch(loadLinkedContactsSucceeded(companyId, body));
      return body;
    },
    ({ body }) => {
      dispatch(loadLinkedContactsFailed(companyId, body));
      return body;
    },
  );
};
