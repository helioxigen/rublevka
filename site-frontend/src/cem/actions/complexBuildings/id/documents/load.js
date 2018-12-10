import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexBuildings/actions';

const loadDocumentsStarted = complexBuildingId => ({
  type: types.LOAD_DOCUMENTS,
  complexBuildingId,
});

const loadDocumentsSucceeded = (complexBuildingId, { items }) => ({
  type: types.LOAD_DOCUMENTS_SUCCESS,
  complexBuildingId,
  items,
});

const loadDocumentsFailed = (complexBuildingId, errors) => ({
  type: types.LOAD_DOCUMENTS_FAIL,
  complexBuildingId,
  errors,
});

const loadDocuments = complexBuildingId => (dispatch) => {
  dispatch(loadDocumentsStarted(complexBuildingId));

  return API.get(`/v1/complex_buildings/${complexBuildingId}/documents`).then(
    ({ body }) => dispatch(loadDocumentsSucceeded(complexBuildingId, body)),
    ({ body }) => dispatch(loadDocumentsFailed(complexBuildingId, body)),
  );
};

export default loadDocuments;
