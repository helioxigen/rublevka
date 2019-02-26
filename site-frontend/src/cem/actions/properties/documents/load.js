import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

const loadDocumentsStarted = propertyId => ({
  type: types.LOAD_DOCUMENTS,
  propertyId,
});

const loadDocumentsSucceeded = (propertyId, documents) => ({
  type: types.LOAD_DOCUMENTS_SUCCESS,
  propertyId,
  ...documents,
});

const loadDocumentsFailed = (propertyId, errors) => ({
  type: types.LOAD_DOCUMENTS_FAIL,
  propertyId,
  errors,
});

export default function(propertyId, category = 'city') {
  return dispatch => {
    dispatch(loadDocumentsStarted(propertyId));

    return API.get(`/v1/properties/${category}/${propertyId}/documents`).then(
      ({ body }) => dispatch(loadDocumentsSucceeded(propertyId, body)),
      ({ body }) => dispatch(loadDocumentsFailed(propertyId, body)),
    );
  };
}
