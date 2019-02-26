import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

import * as types from 'cem/constants/properties/actions';

import loadDocuments from './load';

const updateDocumentStarted = (id, propertyId) => ({
  type: types.UPDATE_DOCUMENT,
  id,
  propertyId,
});

const updateDocumentFailed = (id, propertyId, errors) => ({
  type: types.UPDATE_DOCUMENT_FAIL,
  id,
  propertyId,
  errors,
});

export default function(propertyId, id, data, category = 'city') {
  return dispatch => {
    dispatch(updateDocumentStarted);

    return API.put(
      `/v1/properties/${category}/${propertyId}/documents/${id}`,
      data,
    ).then(
      () => {
        dispatch(pop('success', 'Документы обновлены'));
        return dispatch(loadDocuments(propertyId));
      },
      ({ body }) => {
        dispatch(updateDocumentFailed(body));
        return body;
      },
    );
  };
}
