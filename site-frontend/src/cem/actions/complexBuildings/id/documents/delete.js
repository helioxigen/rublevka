import { API } from 'core/config/sources';

import loadDocumetns from './load';

import * as types from 'cem/constants/complexBuildings/actions';

const deleteDocumentsStarted = (complexBuildingId, id) => ({
  type: types.DELETE_DOCUMENT,
  complexBuildingId,
  id,
});

const deleteDocumentsFailed = (complexBuildingId, errors) => ({
  type: types.DELETE_DOCUMENT_FAIL,
  complexBuildingId,
  errors,
});

const deleteDocument = (complexBuildingId, id) => dispatch => {
  dispatch(deleteDocumentsStarted(complexBuildingId, id));

  return API.del(
    `/v1/complex_buildings/${complexBuildingId}/documents/${id}`,
  ).then(
    () => dispatch(loadDocumetns(complexBuildingId)),
    ({ body }) => {
      dispatch(deleteDocumentsFailed(complexBuildingId, body));
      return body;
    },
  );
};

export default deleteDocument;
