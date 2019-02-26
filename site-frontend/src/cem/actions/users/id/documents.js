import { API } from 'core/config/sources';
import { uploadFile } from './helpers';
import * as types from 'cem/constants/users/actions';

// load
const loadDocumentsStarted = id => ({
  type: types.LOAD_DOCUMENTS,
  id,
});

const loadDocumentsSucceeded = (id, { items }) => ({
  type: types.LOAD_DOCUMENTS_SUCCESS,
  id,
  items,
});

const loadDocumentsFailed = (id, { errors }) => ({
  type: types.LOAD_DOCUMENTS_FAIL,
  id,
  errors,
});

export function loadDocuments(id) {
  return dispatch => {
    dispatch(loadDocumentsStarted(id));

    return API.get(`/v1/users/staff/${id}/documents`).then(
      ({ body }) => dispatch(loadDocumentsSucceeded(id, body)),
      ({ body }) => dispatch(loadDocumentsFailed(id, body)),
    );
  };
}

// update
const updateDocumentFailed = errors => ({
  type: types.UPDATE_DOCUMENT_FAIL,
  errors,
});

export function updateDocument(id, documentId, document) {
  return dispatch =>
    API.put(`/v1/users/staff/${id}/documents/${documentId}`, document).then(
      () => dispatch(loadDocuments(id)),
      ({ body }) => {
        dispatch(updateDocumentFailed(body));
        return body;
      },
    );
}

// create
const createDocumentFailed = errors => ({
  type: types.CREATE_DOCUMENT_FAIL,
  errors,
});

export function createDocument(resourceId, { file, ...document }) {
  return dispatch =>
    uploadFile(resourceId, file).then(
      location =>
        API.get(location).then(({ body: { id } }) =>
          dispatch(updateDocument(resourceId, id, document)),
        ),
      ({ errors }) => {
        dispatch(createDocumentFailed(errors));
        return { errors };
      },
    );
}

// delete
const deleteDocumentStarted = () => ({
  type: types.DELETE_DOCUMENT,
});

const deleteDocumentFailed = () => ({
  type: types.DELETE_DOCUMENT_FAIL,
});

export function deleteDocument(id, documentId) {
  return dispatch => {
    dispatch(deleteDocumentStarted());

    API.del(`/v1/users/staff/${id}/documents/${documentId}`).then(
      () => dispatch(loadDocuments(id)),
      ({ body }) => {
        dispatch(deleteDocumentFailed());
        return body;
      },
    );
  };
}
