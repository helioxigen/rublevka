import { API } from 'core/config/sources';
import * as types from 'cem/constants/contacts';

import { pop } from 'cem/actions/toastr';
import { transform, uploadPhoto, uploadFile } from './helpers';

// Load ID
const loadContactStarted = id => ({
  type: types.LOAD_ID,
  id,
});

export const loadContactSucceeded = (id, data) => ({
  type: types.LOAD_ID_SUCCESS,
  id,
  data,
});

const loadContactFailed = (id, errors) => ({
  type: types.LOAD_ID_FAIL,
  id,
  errors,
});

function loadContact(id) {
  return dispatch => {
    dispatch(loadContactStarted(id));

    return API.get(`/v1/contacts/${id}`).then(
      ({ body }) => dispatch(loadContactSucceeded(id, body)),
      ({ body }) => dispatch(loadContactFailed(id, body)),
    );
  };
}
// Load ID End

// Create ID
const createIdStarted = () => ({
  type: types.CREATE_ID,
});

const createIdSucceeded = (id, photo) => dispatch => {
  uploadPhoto(id, photo).then(() =>
    dispatch({ type: types.CREATE_ID_SUCCESS }),
  );
};

const createIdFailed = errors => ({
  type: types.CREATE_ID_FAIL,
  ...errors,
});

function createId({ photo, ...contact }) {
  return dispatch => {
    dispatch(createIdStarted());

    return API.post('/v1/contacts', transform(contact)).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body: { id } }) => {
          dispatch(createIdSucceeded(id, photo));
          return id;
        }),
      ({ body }) => {
        dispatch(createIdFailed(body));
        return Promise.reject(body);
      },
    );
  };
}
// Create ID End

// Update ID
const updateIdSucceeded = (contact, photo) => dispatch => {
  uploadPhoto(contact.id, photo).then(() => {
    dispatch(pop('success', 'Изменения сохранены'));
    return dispatch(loadContact(contact.id));
  });
};

function updateId({ photo, ...contact }) {
  return dispatch =>
    API.put(`/v1/contacts/${contact.id}`, transform(contact)).then(
      () => dispatch(updateIdSucceeded(contact, photo)),
      ({ body }) => {
        dispatch(pop('error', 'Возникли ошибки'));
        return body;
      },
    );
}
// Update ID end

// Load Documents
const loadDocumentsStarted = () => ({
  type: types.LOAD_DOCUMENTS,
});

const loadDocumentsSucceeded = ({ items }) => ({
  type: types.LOAD_DOCUMENTS_SUCCESS,
  items,
});

const loadDocumentsFailed = ({ errors }) => ({
  type: types.LOAD_DOCUMENTS_FAIL,
  errors,
});

function loadDocuments(contactId) {
  return dispatch => {
    dispatch(loadDocumentsStarted());

    return API.get(`/v1/contacts/${contactId}/documents`).then(
      ({ body }) => dispatch(loadDocumentsSucceeded(body)),
      ({ body }) => dispatch(loadDocumentsFailed(body)),
    );
  };
}
// Load Documents End

// Update Document
const updateDocumentStarted = () => ({
  type: types.UPDATE_DOCUMENT,
});

const updateDocumentFailed = errors => ({
  type: types.UPDATE_DOCUMENT_FAIL,
  ...errors,
});

function updateDocument(contactId, documentId, document) {
  return dispatch => {
    dispatch(updateDocumentStarted());

    return API.put(
      `/v1/contacts/${contactId}/documents/${documentId}`,
      document,
    ).then(
      () => dispatch(loadDocuments(contactId)),
      ({ body }) => {
        dispatch(updateDocumentFailed(body));
        return body;
      },
    );
  };
}
// Update Document End

// Delete Document
const deleteDocumentStarted = () => ({
  type: types.DELETE_DOCUMENT,
});

const deleteDocumentFailed = () => ({
  type: types.DELETE_DOCUMENT_FAIL,
});

function deleteDocument(contactId, id) {
  return dispatch => {
    dispatch(deleteDocumentStarted());

    API.del(`/v1/contacts/${contactId}/documents/${id}`).then(
      () => dispatch(loadDocuments(contactId)),
      ({ body }) => {
        dispatch(deleteDocumentFailed());
        return body;
      },
    );
  };
}
// Delete Document End

// Create Document
const createDocumentStarted = () => ({
  type: types.CREATE_DOCUMENT,
});

const createDocumentFailed = errors => ({
  type: types.CREATE_DOCUMENT_FAIL,
  ...errors,
});

function createDocument(contactId, { file, ...document }) {
  return dispatch => {
    dispatch(createDocumentStarted());

    return uploadFile(contactId, file).then(
      location =>
        API.get(location).then(({ body: { id } }) =>
          dispatch(updateDocument(contactId, id, document)),
        ),
      ({ errors }) => {
        dispatch(createDocumentFailed(errors));
        return { errors };
      },
    );
  };
}
// Create Document End

// Load Linked Contacts
const loadLinkedContactsStarted = () => ({ type: types.LOAD_LINKED_CONTACTS });

const loadLinkedContactsSucceeded = ({ items }) => ({
  type: types.LOAD_LINKED_CONTACTS_SUCCESS,
  items,
});

const loadLinkedContactsFailed = ({ errors }) => ({
  type: types.LOAD_LINKED_CONTACTS_FAIL,
  errors,
});

function loadLinkedContacts(contactId) {
  return dispatch => {
    dispatch(loadLinkedContactsStarted());

    return API.get(`/v1/contacts/${contactId}/linked_contacts`).then(
      ({ body }) => dispatch(loadLinkedContactsSucceeded(body)),
      ({ body }) => dispatch(loadLinkedContactsFailed(body)),
    );
  };
}
// Load Linked Contacts End

// Add Linked Contact
const addLinkedContactStarted = () => ({ type: types.ADD_LINKED_CONTACT });
const addLinkedContactFailed = ({ errors }) => ({
  type: types.ADD_LINKED_CONTACT_FAIL,
  ...errors,
});

function addLinkedContact(contactId, linkedContact) {
  return dispatch => {
    dispatch(addLinkedContactStarted());

    return API.post(
      `/v1/contacts/${contactId}/linked_contacts`,
      linkedContact,
    ).then(
      () => dispatch(loadLinkedContacts(contactId)),
      ({ body }) => {
        dispatch(addLinkedContactFailed(body));
        return body;
      },
    );
  };
}
// Add Linked Contact End

// Update Linked Contact
const updateLinkedContactStarted = () => ({
  type: types.UPDATE_LINKED_CONTACT,
});
const updateLinkedContactFailed = ({ errors }) => ({
  type: types.UPDATE_LINKED_CONTACT_FAIL,
  ...errors,
});

function updateLinkedContact(contactId, linkedContact) {
  return dispatch => {
    dispatch(updateLinkedContactStarted());

    return API.put(
      `/v1/contacts/${contactId}/linked_contacts/${
        linkedContact.linkedContactId
      }`,
      linkedContact,
    ).then(
      () => dispatch(loadLinkedContacts(contactId)),
      ({ body }) => {
        dispatch(updateLinkedContactFailed(body));
        return body;
      },
    );
  };
}
// Update Linked Contact End

// Delete Linked Contact
const deleteLinkedContactStarted = () => ({
  type: types.DELETE_LINKED_CONTACT,
});
const deleteLinkedContactFailed = ({ errors }) => ({
  type: types.DELETE_LINKED_CONTACT_FAIL,
  ...errors,
});

function deleteLinkedContact(contactId, linkedContactId) {
  return dispatch => {
    dispatch(deleteLinkedContactStarted());

    return API.del(
      `/v1/contacts/${contactId}/linked_contacts/${linkedContactId}`,
    ).then(
      () => dispatch(loadLinkedContacts(contactId)),
      ({ body }) => {
        dispatch(deleteLinkedContactFailed(body));
        return body;
      },
    );
  };
}
// Delete Linked Contact End

export {
  loadContact,
  createId,
  updateId,
  uploadFile,
  loadDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  loadLinkedContacts,
  addLinkedContact,
  updateLinkedContact,
  deleteLinkedContact,
};
