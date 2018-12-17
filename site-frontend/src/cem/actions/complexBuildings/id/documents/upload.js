import { API } from 'core/config/sources';

import loadDocuments from './load';
import { uploadFile } from './helpers';

import * as types from 'cem/constants/complexBuildings/actions';

const uploadDocumenStarted = complexBuildingId => ({
  type: types.UPLOAD_DOCUMENT,
  complexBuildingId,
});

const uploadDocument = (complexBuildingId, { file, ...data }) => (dispatch) => {
  dispatch(uploadDocumenStarted(complexBuildingId));

  return uploadFile(complexBuildingId, file).then(location =>
    API.put(location, data).then(() => dispatch(loadDocuments(complexBuildingId))),
  );
};

export default uploadDocument;
