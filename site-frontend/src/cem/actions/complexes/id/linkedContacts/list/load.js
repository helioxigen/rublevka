import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexes/actions';

const loadLinkedContactsStarted = complexId => ({
  type: types.LOAD_LINKED_CONTACTS,
  complexId,
});

const loadLinkedContactsSucceeded = (complexId, { items }) => ({
  type: types.LOAD_LINKED_CONTACTS_SUCCESS,
  complexId,
  items,
});

const loadLinkedContactsFailed = (complexId, errors) => ({
  type: types.LOAD_LINKED_CONTACTS_FAIL,
  complexId,
  errors,
});

const loadLinkedContacts = (complexId, contactIds = []) => (dispatch) => {
  dispatch(loadLinkedContactsStarted(complexId));

  if (contactIds.length) {
    return API.get('/v1/contacts', { filter: { id: contactIds.join(',') } }).then(
      ({ body }) => {
        dispatch(loadLinkedContactsSucceeded(complexId, body));
        return body;
      },
      ({ body }) => {
        dispatch(loadLinkedContactsFailed(complexId, body));
        return body;
      },
    );
  }
};

export default loadLinkedContacts;
