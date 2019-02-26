import { API } from 'core/config/sources';

import loadDocuments from './load';

import * as types from 'cem/constants/complexBuildings/actions';

const updateDocumentsStarted = (complexBuildingId, id) => ({
  type: types.UPDATE_DOCUMENT,
  complexBuildingId,
  id,
});

const updateDocumentsFailed = (complexBuildingId, errors) => ({
  type: types.UPDATE_DOCUMENT_FAIL,
  complexBuildingId,
  errors,
});

const updateDocument = (complexBuildingId, id, documentData) => dispatch => {
  dispatch(updateDocumentsStarted(complexBuildingId, id));

  return API.put(
    `/v1/complex_buildings/${complexBuildingId}/documents/${id}`,
    documentData,
  ).then(
    () => dispatch(loadDocuments(complexBuildingId)),
    ({ body }) => {
      dispatch(updateDocumentsFailed(complexBuildingId, body));
      return body;
    },
  );
};

export default updateDocument;
