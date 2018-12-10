import { API } from 'core/config/sources';
import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/properties/actions';

import loadLinkedContacts from './load';

const linkContactStarted = propertyId => ({
  type: types.LINK_CONTACT,
  propertyId,
});

const linkContactFailed = (propertyId, errors) => ({
  type: types.LINK_CONTACT_FAIL,
  errors,
  propertyId,
});

export default function (propertyId, contact, category = 'city') {
  return (dispatch) => {
    dispatch(linkContactStarted(propertyId));

    return API.post(`/v1/properties/${category}/${propertyId}/linked_contacts`, contact).then(
      () => {
        dispatch(pop('success', 'Контакт привязан'));
        return dispatch(loadLinkedContacts(propertyId));
      },
      ({ body }) => {
        dispatch(linkContactFailed(body));
        return body;
      },
    );
  };
}
