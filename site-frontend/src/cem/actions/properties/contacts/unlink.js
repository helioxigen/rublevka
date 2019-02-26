import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

import loadLinkedContacts from './load';

const unlinkContactStarted = (propertyId, id) => ({
  type: types.UNLINK_CONTACT,
  propertyId,
  id,
});

const unlinkContactFailed = (propertyId, id, errors) => ({
  type: types.UNLINK_CONTACT_FAIL,
  errors,
  propertyId,
  id,
});

export default function(propertyId, id, category = 'city') {
  return dispatch => {
    dispatch(unlinkContactStarted(propertyId, id));

    API.del(
      `/v1/properties/${category}/${propertyId}/linked_contacts/${id}`,
    ).then(
      () => dispatch(loadLinkedContacts(propertyId)),
      ({ body }) => {
        dispatch(unlinkContactFailed(propertyId, id, body));
        return body;
      },
    );
  };
}
