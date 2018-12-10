import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

import loadDocuments from './load';

const unlinkDocumentStarted = (propertyId, id) => ({
  type: types.UNLINK_DOCUMENT,
  propertyId,
  id,
});

const unlinkDocumentFailed = (propertyId, id, errors) => ({
  type: types.UNLINK_DOCUMENT_FAIL,
  errors,
  propertyId,
  id,
});

export default function (propertyId, id, category = 'city') {
  return (dispatch) => {
    dispatch(unlinkDocumentStarted());

    return API.del(`/v1/properties/${category}/${propertyId}/documents/${id}`).then(
      () => dispatch(loadDocuments(propertyId)),
      ({ body }) => {
        dispatch(unlinkDocumentFailed(propertyId, id, body));
        return body;
      },
    );
  };
}
