import { API } from 'core/config/sources';
import * as types from 'cem/constants/contacts';

const loadDealsSucceeded = (contactId, { items }) => ({
  type: types.LOAD_DEALS_SUCCESS,
  contactId,
  items,
});

const loadDealsFailed = (contactId, { errors }) => ({
  type: types.LOAD_DEALS_FAIL,
  contactId,
  errors,
});

export default function loadDealsByContactId(contactId) {
  return dispatch => {
    const query = {
      filter: { 'contactDetails.id': contactId },
      pagination: { limit: 256 },
    };

    API.get('/v1/deals', query)
      .then(({ body }) => dispatch(loadDealsSucceeded(contactId, body)))
      .catch(({ body }) => dispatch(loadDealsFailed(contactId, body)));
  };
}
