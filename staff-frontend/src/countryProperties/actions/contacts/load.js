import { get } from '../../../jq-redux-api/api';

import {
  LOAD_LINKED_CONTACTS,
  LOAD_LINKED_CONTACTS_SUCCESS,
  LOAD_LINKED_CONTACTS_FAIL,
} from '../../constants/actions';

const loadContactsStarted = propertyId => ({
  type: LOAD_LINKED_CONTACTS,
  propertyId,
});

const loadContactsSucceeded = (propertyId, data) => ({
  type: LOAD_LINKED_CONTACTS_SUCCESS,
  ...data,
  propertyId,
});

const loadContactsFailed = (propertyId, errors) => ({
  type: LOAD_LINKED_CONTACTS_FAIL,
  errors,
  propertyId,
});

export default function (propertyId, category = 'country') {
  return (dispatch) => {
    dispatch(loadContactsStarted(propertyId));

    return get(`/v1/properties/${category}/${propertyId}/linked_contacts`)
      .then((data) => {
        dispatch(loadContactsSucceeded(propertyId, data));
      })
      .catch((data) => {
        dispatch(loadContactsFailed(propertyId, data));
      });
  };
}
