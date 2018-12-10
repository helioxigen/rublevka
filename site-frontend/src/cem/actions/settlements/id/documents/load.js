import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

const loadDocumentsStarted = id => ({
  type: types.LOAD_DOCUMENTS,
  id,
});

const loadDocumentsSucceeded = (id, { items }) => ({
  type: types.LOAD_DOCUMENTS_SUCCESS,
  id,
  items,
});

const loadDocumentsFailed = (id, errors) => ({
  type: types.LOAD_DOCUMENTS_FAIL,
  id,
  errors,
});

export default function loadDocuments(id) {
  return (dispatch) => {
    dispatch(loadDocumentsStarted(id));

    return API.get(`/v1/places/settlements/${id}/documents`).then(
      ({ body }) => dispatch(loadDocumentsSucceeded(id, body)),
      ({ body }) => dispatch(loadDocumentsFailed(id, body)),
    );
  };
}
