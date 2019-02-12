import { API } from 'core/config/sources';
import * as types from 'cem/constants/contacts';

const loadLeadsSucceeded = (lookupValue, lookupField, { items }) => ({
  type: types.LOAD_LEADS_SUCCESS,
  lookupValue,
  items,
});

const loadLeadsFailed = (lookupValue, lookupField, { errors }) => ({
  type: types.LOAD_LEADS_FAIL,
  lookupValue,
  errors,
});

export default function loadLeadsByContactId(lookupValue, lookupField) {
  return dispatch => {
    const query = {
      filter: { [lookupField]: lookupValue },
      pagination: { limit: 256 },
    };

    API.get('/v1/client_leads', query)
      .then(({ body }) =>
        dispatch(loadLeadsSucceeded(lookupValue, lookupField, body)),
      )
      .catch(({ body }) =>
        dispatch(loadLeadsFailed(lookupValue, lookupField, body)),
      );
  };
}
