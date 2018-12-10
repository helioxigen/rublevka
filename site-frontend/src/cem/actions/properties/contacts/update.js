import { API } from 'core/config/sources';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/properties/actions';

import loadLinkedContacts from './load';

const updateLinkedContactStarted = (propertyId, id) => ({
  type: types.EDIT_LINKED_CONTACT,
  propertyId,
  id,
});

const updateLinkedContactFailed = (propertyId, id, errors) => ({
  type: types.EDIT_LINKED_CONTACT_FAIL,
  errors,
  propertyId,
  id,
});

export default function (propertyId, id, contact, category = 'city') {
  return (dispatch) => {
    dispatch(updateLinkedContactStarted(propertyId, id));

    API.put(`/v1/properties/${category}/${propertyId}/linked_contacts/${id}`, contact).then(
      () => {
        dispatch(pop('success', 'Контакт обновлён'));
        return dispatch(loadLinkedContacts(propertyId));
      },
      ({ body }) => {
        dispatch(updateLinkedContactFailed(propertyId, id, body));
        return body;
      },
    );
  };
}
