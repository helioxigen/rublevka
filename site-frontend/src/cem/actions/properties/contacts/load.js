import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

const loadContactsStarted = propertyId => ({
  type: types.LOAD_LINKED_CONTACTS,
  propertyId,
});

const loadContactsSucceeded = (propertyId, data) => ({
  type: types.LOAD_LINKED_CONTACTS_SUCCESS,
  ...data,
  propertyId,
});

const loadContactsFailed = (propertyId, errors) => ({
  type: types.LOAD_LINKED_CONTACTS_FAIL,
  errors,
  propertyId,
});

export default function(propertyId, category = 'city') {
  return dispatch => {
    dispatch(loadContactsStarted(propertyId));

    return API.get(
      `/v1/properties/${category}/${propertyId}/linked_contacts`,
    ).then(
      ({ body }) => dispatch(loadContactsSucceeded(propertyId, body)),
      ({ body }) => dispatch(loadContactsFailed(propertyId, body)),
    );
  };
}
